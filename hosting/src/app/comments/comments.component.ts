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
  @Output('on-delete') onDelete = new EventEmitter<Comment>();
  newMessage = '';
  
  ngOnInit() {
    this.comments = this.comments || [];
  }

  send() {
    this.onComment.next({
      uid: this.user.uid,
      photoURL: this.user.photoURL,
      displayName: this.user.displayName || 'Anonymous User',
      timestamp: serverTimestamp(),
      text: this.newMessage,
    });
    this.newMessage = '';
  }

  delete(comment: Comment) {
    this.onDelete.next(comment);
  }
}
