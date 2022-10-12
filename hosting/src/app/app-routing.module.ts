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
// should update docs for v9
import { redirectLoggedInTo, redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ResumeResolver, UserResolver } from './resume.resolver';
import { ViewPageComponent } from './view-page/view-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToEdit = () => redirectLoggedInTo(['edit']);

const routes: Routes = [
  { 
    path: '', 
    component: LoginPageComponent, 
    canActivate: [AuthGuard], 
    data: { authGuardPipe: redirectLoggedInToEdit }
  },
  { 
    path: 'login', 
    component: LoginPageComponent, 
    canActivate: [AuthGuard], 
    data: { authGuardPipe: redirectLoggedInToEdit }
  },
  { 
    path: 'edit/:uid', 
    component: EditPageComponent,     
    canActivate: [AuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      vm: ResumeResolver,
      user: UserResolver,
    }
  },
  { 
    path: 'view/:uid', 
    component: ViewPageComponent,
    resolve: {
      vm: ResumeResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
