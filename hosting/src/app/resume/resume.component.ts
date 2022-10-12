import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Experience, ExperienceUpdate, Resume, ResumeListUpdate, ResumeUser, SkillUpdate } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  @Input() user!: ResumeUser;
  @Input() resume!: Partial<Resume>;
  @Input('is-editable') isEditable = false;
  @Output('experience-update') onExperienceUpdate = new EventEmitter<ExperienceUpdate>();
  @Output('list-added') onListAdded = new EventEmitter<ResumeListUpdate>();

  onUpdate(update: ExperienceUpdate) {
    this.onExperienceUpdate.emit(update);
  }

  onListUpdate(update: ResumeListUpdate) {
    this.onListAdded.emit(update);
  }

  listAdded(update: SkillUpdate) {
    this.onListAdded.emit(update);
  }
}
