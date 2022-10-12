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
