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
import { Experience, ExperienceUpdate } from 'src/app/models/resume.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  @Input() experiences?: Experience[];
  @Output('on-change') onChange = new EventEmitter<ExperienceUpdate>();
  @Input('is-editable') isEditable = false;

  ngOnInit() {
    this.experiences = this.experiences || [];
  }

  delete(experience: Experience) {
    this.onChange.next({
      type: 'removed',
      item: experience,
      key: 'experience',
    });
  }

  add() {
    const item = {
      title: '',
      startDate: new Date(),
      endDate: new Date(),
    };
    this.onChange.next({  
      key: 'experience',
      type: 'added',
      item,
    });
  }

  onUpdate(experience: Experience) {
    this.onChange.next({
      key: 'experience',
      type: 'modified',
      item: experience,
    });
  }

}
