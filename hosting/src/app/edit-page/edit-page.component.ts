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
  comments$ = this.resumeService.currentComments$;

  onUpdate(update: Partial<Resume>) {
    this.resumeService.updateCurrent(update);
  }

  addComment(comment: CommentUpdate) {
    this.resumeService.addComment(comment);
  }

  deleteComment(comment: Comment) {
    this.resumeService.deleteComment(comment);
  }
}
