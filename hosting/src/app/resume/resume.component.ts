import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Resume } from '../models/resume.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  @Input() user!: User;
  @Input() resume!: Partial<Resume>;
  @Input('is-editable') isEditable = false;
  @Output('resume-update') onResumeUpdate = new EventEmitter<Partial<Resume>>();
  @Output('list-added') onListAdded = new EventEmitter<{ key: 'skills', item: string, type: 'added' | 'removed' }>();

  onUpdate(update: Partial<Resume>) {
    this.onResumeUpdate.emit(update);
  }

  listAdded(update: { key: 'skills', item: string, type: 'added' | 'removed' }) {
    debugger;
    this.onListAdded.emit(update);
  }
}
