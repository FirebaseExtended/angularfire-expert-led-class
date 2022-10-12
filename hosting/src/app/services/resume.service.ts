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
import { map, switchMap, firstValueFrom, filter } from 'rxjs'
import { Resume, ResumeSnap, Comment, CommentUpdate } from '../models/resume.model'
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
  firestore: Firestore = inject(Firestore)
  auth: Auth = inject(Auth)

  // Create a user observable
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!),
  )

  // Create reference observable
  ref$ = this.user$.pipe(
    map((user) => {
      const ref = doc(this.firestore, 'resumes', user.uid) as DocumentReference<
        ResumeSnap
      >
      return { ref, user }
    }),
  )

  commentRef$ = this.ref$.pipe(
    map((userRef) => {
      const { user } = userRef
      const ref = collection(userRef.ref, 'comments') as CollectionReference<Comment> | 
        CollectionReference<CommentUpdate>
      return { user, ref }
    }),
  )

  // Create an observable of the current user's resume
  current$ = this.ref$.pipe(
    switchMap(({ user, ref }) => {
      const resume$ = docData(ref, { idField: 'id' })
      return resume$.pipe(
        map((resumeSnap) => {
          const resume = this.setDefaults(resumeSnap || {})
          return { resume, user }
        }),
      )
    }),
  )

  currentComments$ = this.commentRef$.pipe(
    switchMap(({ ref, user }) => {
      const comments$ = collectionData(ref as CollectionReference<Comment>, { idField: 'id' })
      return comments$.pipe(map((comments) => {
        comments = comments!.map(comment => {
          return {
            ...comment,
            timeDisplay: new Intl.DateTimeFormat('en', { dateStyle: 'short', timeStyle: 'short' })
              .format(comment.timestamp?.toDate()),
          };
        });
        return { comments, user }
      }))
    }),
  )

  async addComment(comment: CommentUpdate) {
    const { ref } = await firstValueFrom(this.commentRef$)
    return addDoc(ref as CollectionReference<CommentUpdate>, comment)
  }

  async deleteComment(comment: Comment) {
    const { ref } = await firstValueFrom(this.commentRef$)
    const commentDoc = doc<Comment | CommentUpdate>(ref, comment.id);
    return deleteDoc(commentDoc);
  }

  // Create an update method for the current user's resume
  async updateCurrent(resume: Partial<Resume>) {
    const { ref } = await firstValueFrom(this.ref$)
    return setDoc(ref, resume, { merge: true })
  }

  private setDefaults(resume: ResumeSnap): Resume {
    // resume.experience = resume.experience || []
    const experience = resume.experience.map((experience) => {
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
    }
  }
}
