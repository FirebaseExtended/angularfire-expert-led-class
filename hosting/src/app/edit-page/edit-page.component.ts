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
import { Resume, CommentUpdate, Comment, ExperienceUpdate, ResumeListUpdate } from '../models/resume.model';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent {
  // Inject ResumeService and ActivatedRoute
  private activatedRoute = inject(ActivatedRoute);
  private resumeService = inject(ResumeService);
  // Get user and resume uid from ActivatedRoute
  user: User = this.activatedRoute.snapshot.data['user'];
  routeId = this.activatedRoute.snapshot.paramMap.get('uid')!;
  // Get resume and comments using ResumeService and resume uid
  resume$ = this.resumeService.resume$(this.routeId);
  comments$ = this.resumeService.comments$(this.routeId);

  // Updates the resume doc using ResumeService
  onUpdate(update: ExperienceUpdate) {
    let resumeUpdate: Partial<Resume> = {};
    resumeUpdate.id = this.routeId;
    resumeUpdate.user = {
      photoURL: this.user.photoURL,
      displayName: this.user.displayName,
      uid: this.user.uid,
    };
    this.resumeService.updateCurrent(resumeUpdate);
    this.resumeService.updateExperience(this.routeId, update);
  }

  // Update list in resume using ResumeService
  onArrayAdd(update: ResumeListUpdate) {
    this.resumeService.updateArrayInResume(this.routeId, update);
  }

  // Add to list in resume using ResumeService
  addComment(comment: CommentUpdate) {
    this.resumeService.addComment(comment);
  }

  // Delete list in resume using ResumeService
  deleteComment(comment: Comment) {
    this.resumeService.deleteComment(comment);
  }
}
