import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
}
