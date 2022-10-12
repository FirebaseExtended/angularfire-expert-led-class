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

import { Component, inject, OnInit } from '@angular/core'
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
  signOut,
  User,
  getRedirectResult
} from '@angular/fire/auth'
import { doc, Firestore, setDoc } from '@angular/fire/firestore'
import { ResumeUser } from '../models/resume.model'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private auth: Auth = inject(Auth)
  private firestore: Firestore = inject(Firestore)
  user$ = authState(this.auth)
  private provider = new GoogleAuthProvider()
  constructor() {}

  async ngOnInit() {
    const result = await getRedirectResult(this.auth);
    this.updateUserData(result!.user);
  }

  private updateUserData(user: User) {
    const userRef = doc(this.firestore, `resumes/${user.uid}`)
    const appUser: ResumeUser = {
      uid: user.uid!,
      displayName: user.displayName!,
      photoURL: user.photoURL!,
    }
    return setDoc(userRef, appUser, { merge: true })
  }

  loginGuest() {
    signInAnonymously(this.auth);
  }

  login() {
    signInWithRedirect(this.auth, this.provider)
  }
  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('signed out')
      })
      .catch((error) => {
        console.log('sign out error: ' + error)
      })
  }
}
