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
import { map, filter, withLatestFrom, Observable, of, combineLatest } from 'rxjs'
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
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  firestore = inject(Firestore)
  auth = inject(Auth)

  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!),
  )

  resumeRef<T = Resume | ResumeSnap>(resumeId: string) {
    const resumeCollectionRef = collection(this.firestore, 'resumes') as CollectionReference<T>;
    return doc(resumeCollectionRef, resumeId);
  }

  resume$(resumeId: string): Observable<Partial<Resume>> {
    const resumeRef = this.resumeRef<ResumeSnap>(resumeId);
    return combineLatest([
      docData(resumeRef, { idField: 'id' }),
      this.experiences$(resumeId),
    ], (resume, experiences) => {
      return {
        ...resume,
        experiences,
      }
    });
  }

  experienceRef<T = ExperienceSnap | Experience>(resumeId: string) {
    const resumeRef = this.resumeRef(resumeId);
    return collection(resumeRef, 'experiences') as CollectionReference<T>;
  }

  experiences$(resumeId: string): Observable<Experience[]> {
    const experienceRef = this.experienceRef<ExperienceSnap>(resumeId);
    return collectionData(experienceRef, { idField: 'id' }).pipe(
      map(experiences => this.setExperiencesDefaults(experiences))
    );
  }

  commentsRef<T = CommentUpdate | Comment>(resumeId: string) {
    const resumeRef = this.resumeRef(resumeId);
    return collection(resumeRef, 'comments') as CollectionReference<T>;
  }

  comments$(resumeId: string): Observable<Comment[]> {
    const commentsRef = this.commentsRef<Comment>(resumeId);
    return collectionData(commentsRef, { idField: 'id' }).pipe(
      map(comments => this.setCommentDefaults(comments))
    );
  }

  async addComment(comment: CommentUpdate) {
    const commentsRef = this.commentsRef<CommentUpdate>(comment.resumeId);
    return addDoc(commentsRef, comment);    
  }

  async deleteComment(comment: Comment) {
    const commentsRef = this.commentsRef<CommentUpdate>(comment.resumeId);
    const commentDoc = doc(commentsRef, comment.id);
    return deleteDoc(commentDoc);    
  }

  async updateArrayInResume(resumeId: string, update: ResumeListUpdate) {
    const { type, item, key } = update;
    const ref = this.resumeRef(resumeId);
    const updateObject = {
      [`${key}`]: type === 'added'? arrayUnion(item) : arrayRemove(item)
    };
    return setDoc(ref, updateObject, { merge: true });
  }

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

  private setDefaults(resume: Resume): Resume {
    resume.overview = resume.overview || { relevantWork: [] };
    return resume;
  }

  async createEmptyResume(user: User) {
    const resumeData = this.setDefaults({
      overview: [],
      skills: [],
      user: { displayName: user.displayName, uid: user.uid, photoURL: user.photoURL || null },
    } as any);
    return addDoc(collection(this.firestore, 'resumes'), resumeData);
  }
}
