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
    update.id = this.vm.resume.id;
    this.resumeService.updateCurrent(update);
  }

  addComment(comment: CommentUpdate) {
    comment.resumeId = this.vm.resume.id!;
    this.resumeService.addComment(comment);
  }

  deleteComment(comment: Comment) {
    comment.resumeId = this.vm.resume.id!;
    this.resumeService.deleteComment(comment);
  }
}
