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

import { Component, Input } from '@angular/core';
import type { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  template: `
    <img *ngIf="user.photoURL else default" [src]="user.photoURL" [alt]="user.displayName">
    <ng-template #default>
      <div class="default"></div>
    </ng-template>
    <app-heading-lg>{{ user.displayName }}</app-heading-lg>
  `,
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() user!: User;
}
