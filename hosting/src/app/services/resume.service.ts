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
import { map, switchMap, firstValueFrom, filter, withLatestFrom, combineLatestAll, combineLatest, Observable } from 'rxjs'
import { Resume, ResumeSnap, Comment, CommentUpdate, ViewModel } from '../models/resume.model'
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  firestore = inject(Firestore)
  auth = inject(Auth)

  // Create a user observable
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!),
  )

  // Create resume reference
  resumeRef<T = Resume | ResumeSnap>(resumeId: string) {
    const resumeCol = collection(this.firestore, 'resumes') as CollectionReference<T>;
    return doc<T>(resumeCol, resumeId);
  }

  // Creaet a resume observable
  resume$(resumeId: string) {
    const ref = this.resumeRef<ResumeSnap>(resumeId);
    const resume$ = docData(ref, { idField: 'id' })
    return resume$.pipe(
      map((resumeSnap) => this.setResumeDefaults(resumeSnap))
    );
  }

  // Create a ViewModel observable
  vm$(resumeId: string): Observable<ViewModel> {
    return combineLatest([ 
      this.user$,
      this.resume$(resumeId),
    ]).pipe(
      map(([user, resume]) => ({ user, resume }))
    );
  }

  commentsRef<T = CommentUpdate | Comment>(resumeId: string) {
    const resumeRef = this.resumeRef(resumeId);
    return collection(resumeRef, 'comments') as CollectionReference<T>;
  }

  comments$(resumeId: string) {
    const commentsRef = this.commentsRef<Comment>(resumeId);
    const comments$ = collectionData(commentsRef, { idField: 'id' });
    return comments$.pipe(
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

  // Create an update method for the current user's resume
  async updateCurrent(resume: Partial<Resume>) {
    const resumeRef = this.resumeRef(resume.id!);
    return setDoc(resumeRef, resume, { merge: true })
  }

  private setResumeDefaults(resume: Partial<ResumeSnap> = {}): Partial<Resume> {
    resume.experience = resume.experience || []
    const experience = resume.experience.map(experience => {
      return {
        title: experience?.title,
        relevantWork: experience?.relevantWork,
        startDate: experience?.startDate?.toDate(),
        endDate: experience?.endDate?.toDate(),
      }
    })
    return {
      ...resume,
      experience,
    };
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
}
