import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Details, Experience, Resume } from 'src/app/models/resume.model';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  @Input() experience: Experience[] = [];
  @Output('on-change') onChange = new EventEmitter<Partial<Resume>>();
  @Input('is-editable') isEditable = false;

  delete(index: number) {
    this.experience = this.experience.filter((e, i) => index !== i);
    this.onChange.next({ experience: this.experience });
  }

  add() {
    this.experience = [
      ...this.experience, 
      { title: '', startDate: new Date(), endDate: new Date(), relevantWork: [] }
    ];
    this.onChange.next({ experience: this.experience });
  }

  updateWork(update: { relevantWork: string[] }, index: number) {
    this.experience[index] = {
      ...this.experience.at(index),
      ...update,
    } as Experience;
    this.onChange.next({ experience: this.experience });
  }

  updateDetails(details: Details, index: number) {
    this.experience[index] = {
      ...this.experience.at(index),
      ...details,
    } as Experience;
    this.onChange.next({ experience: this.experience });
  }
}
