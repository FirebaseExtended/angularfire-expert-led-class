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
import { Resume, CommentUpdate, Comment } from '../models/resume.model';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { startWith } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private resumeService = inject(ResumeService);
  user: User = this.activatedRoute.snapshot.data['user'];
  routeId = this.activatedRoute.snapshot.paramMap.get('uid')!;
  resume$ = this.resumeService.resume$(this.routeId);
  comments$ = this.resumeService.comments$(this.routeId);

  onUpdate(update: Partial<Resume>) {
    update.id = this.routeId;
    this.resumeService.updateCurrent(update);
  }

  onArrayAdd(update: { key: 'skills', item: string, type: 'added' | 'removed' }) {
    const { key, item } = update;
    this.resumeService.updateListInResume({
      key,
      item,
      resumeId: this.routeId,
    });
  }

  addComment(comment: CommentUpdate) {
    this.resumeService.addComment(comment);
  }

  deleteComment(comment: Comment) {
    this.resumeService.deleteComment(comment);
  }
}
