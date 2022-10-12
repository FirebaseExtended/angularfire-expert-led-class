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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillUpdate } from 'src/app/models/resume.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent {
  @Output('skill-change') onSkillChange = new EventEmitter<SkillUpdate>();
  @Input() skills?: string[];
  @Input('is-editable') isEditable = false;
  newSkill = '';

  ngOnInit() {
    this.skills = this.skills || [];
  }
  
  onAdd() {
    this.onSkillChange.emit({ 
      key: 'skills', 
      item: this.newSkill, 
      type: 'added' 
    });
    this.newSkill = '';
  }

  onRemove(skillToDelete: string) {
    this.onSkillChange.emit({ 
      key: 'skills', 
      item: skillToDelete, 
      type: 'removed' 
    });
  }
}
