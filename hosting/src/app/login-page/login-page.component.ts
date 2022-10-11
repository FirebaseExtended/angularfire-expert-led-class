import { Component, inject, OnInit } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  user$ = user(this.auth);
  private provider = new GoogleAuthProvider();
  constructor() {}

  ngOnInit(): void {}

  private updateUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const appUser: Partial<User> = {
      uid: user.uid!,
      displayName: user.displayName!,
      email: user.email!,
      photoURL: user.photoURL!
    };
    return setDoc(userRef, appUser, { merge: true });
  }

  login() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.updateUserData(result.user);
      });
  }
  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
