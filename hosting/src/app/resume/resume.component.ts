import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume, ResumeListUpdate, ResumeUser, SkillUpdate } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  @Input() user!: ResumeUser;
  @Input() resume!: Partial<Resume>;
  @Input('is-editable') isEditable = false;
  @Output('resume-update') onResumeUpdate = new EventEmitter<Partial<Resume>>();
  @Output('list-added') onListAdded = new EventEmitter<ResumeListUpdate>();

  onUpdate(update: Partial<Resume>) {
    this.onResumeUpdate.emit(update);
  }

  onListUpdate(update: ResumeListUpdate) {
    this.onListAdded.emit(update);
  }

  listAdded(update: SkillUpdate) {
    this.onListAdded.emit(update);
  }
}
