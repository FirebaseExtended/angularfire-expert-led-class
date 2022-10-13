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
import { Overview, OverviewUpdate } from 'src/app/models/resume.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent {
  // Emit change event to parent
  @Output('on-change') onChange = new EventEmitter<OverviewUpdate>();
  // Get overview array and editable state
  @Input() overview!: string[];
  @Input('is-editable') isEditable = false;

  // Emit overview update event
  updateWork(update: OverviewUpdate) {
    this.onChange.next(update);
  }
}
