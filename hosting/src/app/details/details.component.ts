import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Details } from '../models/resume.model';

export type LocalDetails = {
  title: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Output('on-change') onChange = new EventEmitter<Details>();
  @Input() title: string = '';
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input('is-editable') isEditable: boolean = false;

  newDetails!: Details;

  ngOnInit() {
    this.newDetails = { 
      title: this.title || '', 
      startDate: this.startDate || new Date(), 
      endDate: this.endDate || new Date(), 
    };
  }

  onUpdate() {
    this.onChange.next(this.newDetails);
  }
}
