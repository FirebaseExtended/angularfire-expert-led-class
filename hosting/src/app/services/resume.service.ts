/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { inject, Injectable } from '@angular/core'
import { Auth, authState } from '@angular/fire/auth'
import { map, filter, withLatestFrom } from 'rxjs'
import { Resume, ResumeSnap, Comment, CommentUpdate, ResumeListUpdate, Experience, ExperienceSnap, ExperienceUpdate, ResumeObject, ResumeUser } from '../models/resume.model'
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  firestore = inject(Firestore)
  auth = inject(Auth)

  // Create a user observable from current auth state
  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!),
  )

  // Create resume reference
  resumeRef<T = Resume | ResumeSnap>(resumeId: string) {
    const resumeCol = collection(this.firestore, 'resumes') as CollectionReference<T>;
    return doc<T>(resumeCol, resumeId);
  }

  // Creaet a resume observable from Firestore
  resume$(resumeId: string) {
    const ref = this.resumeRef<ResumeSnap>(resumeId);
    const resume$ = docData(ref, { idField: 'id' })
    return resume$.pipe(
      withLatestFrom(this.experiences$(resumeId)),
      map(([resume, experiencesSnap]) => {
        return {
          ...resume,
          experiences: this.setExperiencesDefaults(experiencesSnap),
        };
      })
    );
  }

  // Create an experiences collection reference
  experienceRef<T = ExperienceSnap | Experience>(resumeId: string) {
    const ref = this.resumeRef<Resume>(resumeId);
    return collection(ref, 'experiences') as CollectionReference<T>;
  }

  // Create an observable collection of experiences based on resume id
  experiences$(resumeId: string) {
    const ref = this.experienceRef<ExperienceSnap>(resumeId);
    return collectionData(ref, { idField: 'id' });
  }

  // Create an comments collection reference
  commentsRef<T = CommentUpdate | Comment>(resumeId: string) {
    const resumeRef = this.resumeRef(resumeId);
    return collection(resumeRef, 'comments') as CollectionReference<T>;
  }

  // Create an observable collection of comments based on resume id
  comments$(resumeId: string) {
    const commentsRef = this.commentsRef<Comment>(resumeId);
    // Order comments by timestamp
    const commentsOrderedQuery = query(
      commentsRef,
      orderBy('timestamp'),
    );
    const comments$ = collectionData(commentsOrderedQuery, { idField: 'id' });
    return comments$.pipe(
      map(comments => this.setCommentDefaults(comments))
    );
  }

  // Add comment doc to comments collection of resume
  async addComment(comment: CommentUpdate) {
    const commentsRef = this.commentsRef<CommentUpdate>(comment.resumeId);
    return addDoc(commentsRef, comment);
  }

  // Delete comment doc from comments collection of resume
  async deleteComment(comment: Comment) {
    const commentsRef = this.commentsRef<CommentUpdate>(comment.resumeId);
    const commentDoc = doc(commentsRef, comment.id);
    return deleteDoc(commentDoc);
  }

  // Create an update method for the current user's resume
  async updateCurrent(resume: Partial<Resume>) {
    const resumeRef = this.resumeRef(resume.id!);
    return setDoc(resumeRef, resume, { merge: true })
  }

  // Update arbitrary array in resume doc
  async updateArrayInResume(resumeId: string, update: ResumeListUpdate) {
    const { key, item, type } = update;
    const updateObject = {
      [`${key}`]: type === 'added' ? arrayUnion(item) : arrayRemove(item)
    };
    const resumeRef = this.resumeRef(resumeId);
    return setDoc(resumeRef, updateObject, { merge: true });
  }

  // Update arbitrary experience in resume doc
  async updateExperience(resumeId: string, experience: ExperienceUpdate) {
    const ref = this.experienceRef<Experience>(resumeId);
    switch(experience.type) {
      case 'added': {
        addDoc(ref, experience.item);
        break;
      }
      case 'modified': {
        const docRef = doc(ref, experience.item.id);
        setDoc(docRef, experience.item, { merge: true });
        break;
      }
      case 'removed': {
        const docRef = doc(ref, experience.item.id);
        deleteDoc(docRef);
        break;
      }
    }
  }

  // Translate ExperienceSnap to Experience with neccessary default values
  private setExperiencesDefaults(experiences: ExperienceSnap[] = []): Experience[] {
    return experiences.map(experience => {
      return {
        id: experience.id,
        title: experience?.title,
        relevantWork: experience?.relevantWork,
        startDate: experience?.startDate?.toDate(),
        endDate: experience?.endDate?.toDate(),
      }
    });
  }

  // Populate each comment in array with neccessary default values
  private setCommentDefaults(comments: Comment[] = []): Comment[] {
    return comments.map(comment => {
      return {
        ...comment,
        timeDisplay: new Intl.DateTimeFormat(
          'en', 
          { dateStyle: 'short', timeStyle: 'short' }
        ).format(comment.timestamp?.toDate()),
      };
    });
  }

  // Populate resume in array with neccessary default values
  private setDefaults(resume: Resume): Resume {
    resume.overview = resume.overview || { relevantWork: [] };
    resume.experiences = resume.experiences || [{ relevantWork: [] }];
    const experiences: Experience[] = resume.experiences?.map(experience => {
      return {
        title: experience.title,
        startDate: experience.startDate,
        endDate: experience.endDate,
      };
    });
    return {
      ...resume,
      experiences,
    }
  }
  
  // Create empty template resume in Firestore
  async createEmptyResume(resumeId: String) {
    const resumeData = JSON.parse(JSON.stringify(this.setDefaults(new ResumeObject() as Resume)));
    resumeData.id = resumeId;
    setDoc(doc(this.firestore, "resumes", resumeData.id), resumeData, {merge: true});
  }
}
