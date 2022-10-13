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

import { Component, inject, OnInit } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
  signOut,
  User,
  getRedirectResult,
  getAdditionalUserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ResumeUser } from '../models/resume.model';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private router = inject(Router);
  user$: Observable<Partial<User> | null> = of(null)
  auth = inject(Auth);
  private googleAuthProvider = new GoogleAuthProvider();
  resumeService = inject(ResumeService);

  ngOnInit() {
    // Detect redirect state
    getRedirectResult(this.auth).then(result => {
      if (!result) return;
      this.resumeService.createEmptyResume(result.user).then(() => {
        this.redirectToEditPage(result.user.uid);
      })
    });
  }

  loginGuest() {
    // Login anonymously
    signInAnonymously(this.auth);
  }

  login() {
    // Login with Google
    signInWithRedirect(this.auth, this.googleAuthProvider);
  }

  private redirectToEditPage(uid: string) {
    this.router.navigate([`edit/${uid}`]);
  }
}
