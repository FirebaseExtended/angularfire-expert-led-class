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
import { ListUpdate } from '../models/resume.model';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css']
})
export class ListSectionComponent {
  @Output('on-change') onChange = new EventEmitter<ListUpdate<any>>();
  @Input() list!: string[];
  @Input() label!: string;
  @Input() key!: string;
  @Input() placeholder: string = '';
  @Input('is-editable') isEditable = false;

  newItem = '';
  
  onAdd() {
    this.onChange.emit({ key: this.key, item: this.newItem, type: 'added' });
    this.newItem = '';
  }

  onRemove(item: string) {
    this.onChange.emit({ key: this.key, item, type: 'removed' });
  }
}
