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
import { ViewModel, Resume, CommentUpdate, Comment } from '../models/resume.model';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private resumeService = inject(ResumeService);
  vm: ViewModel = this.activatedRoute.snapshot.data['vm'];
  routeId = this.activatedRoute.snapshot.paramMap.get('uid')!;
  comments$ = this.resumeService.comments$(this.routeId);

  onUpdate(update: Partial<Resume>) {
    update.id = this.routeId;
    this.resumeService.updateCurrent(update);
  }

  addComment(comment: CommentUpdate) {
    this.resumeService.addComment(comment);
  }

  deleteComment(comment: Comment) {
    this.resumeService.deleteComment(comment);
  }
}
