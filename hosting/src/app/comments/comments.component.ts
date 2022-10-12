import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '@angular/fire/auth';
import { serverTimestamp } from '@angular/fire/firestore';
import { Comment, CommentUpdate } from '../models/resume.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments?: Comment[] = [];
  @Input() user!: User;
  @Output('on-comment') onComment = new EventEmitter<CommentUpdate>();

  ngOnInit() {
    this.comments = this.comments || [];
  }

  send(text: string) {
    this.onComment.next({
      uid: this.user.uid,
      photoURL: this.user.photoURL,
      displayName: this.user.displayName || 'Anonymous User',
      timestamp: serverTimestamp(),
      text,
    });
  }
}
