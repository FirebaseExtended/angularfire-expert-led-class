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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ResumeResolver, UserResolver } from './resume.resolver';
import { ViewPageComponent } from './view-page/view-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

// Add each page (login, edit, view) as separate paths
const routes: Routes = [
  // Show login page on default path
  {
    path: '',
    component: LoginPageComponent,
  },
  // Add redirect to login
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    // Allow edit page to take in resume uid as path param
    path: 'edit/:uid',
    component: EditPageComponent,
    // Protect edit page using AuthGuard, redirect user to Login page if unauthorized
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // Resolve the current user data
    resolve: {
      user: UserResolver,
    },
  },
  {
    // Allow view page to take in resume uid as path param
    path: 'view/:uid',
    component: ViewPageComponent,
    // Resolve the current resume data
    resolve: {
      resume: ResumeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
