import { inject, Injectable } from "@angular/core";
import { Auth, authState } from '@angular/fire/auth';
import { map, switchMap, firstValueFrom, filter } from "rxjs";
import { doc, docData, DocumentReference, Firestore, updateDoc } from "@angular/fire/firestore";
import { Experience, Resume, ResumeSnap } from "../models/resume.model";
import { setDoc } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class ResumeService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  // Create a user observable
  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!),
  );

  // Create reference observable
  ref$ = this.user$.pipe(
    map(user => {
      const ref = doc(this.firestore, 'resumes', user.uid) as DocumentReference<ResumeSnap>;
      return { ref, user };
    })
  );

  // Create an observable of the current user's resume
  current$ = this.ref$.pipe(
    switchMap(({user, ref }) => {
      const resume$ = docData(ref, { idField: 'id' })
      return resume$.pipe(map(resumeSnap => {
        const resume = this.setDefaults(resumeSnap || {});
        return { resume, user }
      }));
    })
  )

  // Create an update method for the current user's resume
  async updateCurrent(resume: Partial<Resume>) {
    const { ref } = await firstValueFrom(this.ref$);
    return setDoc(ref, resume, { merge: true });
  }

  private setDefaults(resume: ResumeSnap): Resume {
    resume.skills = resume.skills || [];
    resume.overview = resume.overview || { relevantWork: [] };
    resume.experience = resume.experience || [{ relevantWork: [] }, { relevantWork: [] }];
    const experience: Experience[] = resume.experience.map(experience => {
      return {
        title: experience?.title,
        relevantWork: experience?.relevantWork,
        startDate: experience?.startDate?.toDate(),
        endDate: experience?.endDate?.toDate(),
      };
    });
    return {
      ...resume,
      experience,
    }
  }
}
