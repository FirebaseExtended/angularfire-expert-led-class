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
import { map, filter, withLatestFrom, Observable, of } from 'rxjs'
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

  // Create a user observable
  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!),
  )

  // Create resume reference
  resumeRef<T = Resume | ResumeSnap>(resumeId: string) {

  }

  // Creaet a resume observable
  resume$(resumeId: string): Observable<Partial<Resume>> {
    return of({});
  }

  experienceRef<T = ExperienceSnap | Experience>(resumeId: string) {

  }

  experiences$(resumeId: string): Observable<ExperienceSnap[]> {
    return of({} as any);
  }

  commentsRef<T = CommentUpdate | Comment>(resumeId: string) {

  }

  comments$(resumeId: string): Observable<Comment[]> {
    return of([]);
  }

  async addComment(comment: CommentUpdate) {

  }

  async deleteComment(comment: Comment) {

  }

  // Create an update method for the current user's resume
  async updateCurrent(resume: Partial<Resume>) {

  }

  async updateArrayInResume(resumeId: string, update: ResumeListUpdate) {

  }

  async updateExperience(resumeId: string, experience: ExperienceUpdate) {

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

  async createEmptyResume(user: User) {
    const resumeData = this.setDefaults({
      experiences: [],
      overview: [],
      skills: [],
      user: { displayName: user.displayName, uid: user.uid, photoURL: user.photoURL || null },
    } as any);
    return addDoc(collection(this.firestore, 'resumes'), resumeData);
  }
}
