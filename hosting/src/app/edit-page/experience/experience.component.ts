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
import { Details, Experience, Resume } from 'src/app/models/resume.model';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  @Input() experience?: Experience[];
  @Output('on-change') onChange = new EventEmitter<Partial<Resume>>();
  @Input('is-editable') isEditable = false;

  ngOnInit() {
    this.experience = this.experience || [{
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      relevantWork: []
    }];
  }

  delete(index: number) {
    this.experience = this.experience!.filter((e, i) => index !== i);
    this.onChange.next({ experience: this.experience });
  }

  add() {
    this.experience = [
      ...this.experience!, 
      { title: '', startDate: new Date(), endDate: new Date(), relevantWork: [] }
    ];
    this.onChange.next({ experience: this.experience });
  }

  updateWork(update: { relevantWork: string[] }, index: number) {
    this.experience![index] = {
      ...this.experience!.at(index),
      ...update,
    } as Experience;
    this.onChange.next({ experience: this.experience });
  }

  updateDetails(details: Details, index: number) {
    this.experience![index] = {
      ...this.experience!.at(index),
      ...details,
    } as Experience;
    this.onChange.next({ experience: this.experience });
  }
}
