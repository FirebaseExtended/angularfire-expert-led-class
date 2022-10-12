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
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent {
  @Output('on-change') onChange = new EventEmitter<Partial<Resume>>();
  @Input() skills?: string[];
  @Input('is-editable') isEditable = false;
  newSkill = '';

  ngOnInit() {
    this.skills = this.skills || [];
  }
  
  onAdd() {
    this.skills = [...this.skills!, this.newSkill];
    this.newSkill = '';
    this.onChange.emit({ skills: this.skills });
  }

  onRemove(skillToDelete: string) {
    this.skills = this.skills!.filter(skill => skill !== skillToDelete);
    this.onChange.emit({ skills: this.skills });
  }
}
