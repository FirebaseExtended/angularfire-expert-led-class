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
