import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Overview, Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  @Input() overview: Overview = { relevantWork: [] };
  @Input('is-editable') isEditable = false;
  @Output('on-change') onChange = new EventEmitter<Partial<Resume>>();


  updateWork(update: { relevantWork: string[] }) {
    this.onChange.next({ overview: update });
  }
}
