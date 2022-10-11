import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Resume } from 'src/app/models/resume.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent {
  @Output('on-change') onChange = new EventEmitter<Partial<Resume>>();
  @Input() skills: string[] = []
  @Input('is-editable') isEditable = false;
  newSkill = '';
  
  onAdd() {
    this.skills = [...this.skills, this.newSkill];
    this.newSkill = '';
    this.onChange.emit({ skills: this.skills });
  }

  onRemove(skillToDelete: string) {
    this.skills = this.skills.filter(skill => skill !== skillToDelete);
    this.onChange.emit({ skills: this.skills });
  }
}
