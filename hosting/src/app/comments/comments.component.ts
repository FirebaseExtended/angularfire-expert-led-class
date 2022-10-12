import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

type Comment = {
  uid: string;
  photoURL: string;
  name: string;
  text: string;
  time: Timestamp;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  send(message: string) {

  }

}
