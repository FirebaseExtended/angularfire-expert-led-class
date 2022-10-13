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

import { Component, inject } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  resumeService: ResumeService = inject(ResumeService);
  private auth: Auth = inject(Auth);
  user$ = authState(this.auth)

  logout() {
    signOut(this.auth)
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
    window.location.reload();
  }
}
