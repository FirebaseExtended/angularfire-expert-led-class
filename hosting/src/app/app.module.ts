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
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ExperienceComponent } from './edit-page/experience/experience.component';
import { OverviewComponent } from './edit-page/overview/overview.component';
import { SkillComponent } from './edit-page/skill/skill.component';
import { HeaderComponent } from './header/header.component';
import { HeadingLgComponent } from './heading-lg/heading-lg.component';
import { ProfileComponent } from './profile/profile.component';
import { ListSectionComponent } from './list-section/list-section.component';
import { DetailsComponent } from './details/details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EditPageComponent,
    ExperienceComponent,
    OverviewComponent,
    SkillComponent,
    HeaderComponent,
    HeadingLgComponent,
    ProfileComponent,
    ListSectionComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      // connectFirestoreEmulator(firestore, 'localhost', 8080);
      // enableMultiTabIndexedDbPersistence(firestore);
      return firestore;
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
