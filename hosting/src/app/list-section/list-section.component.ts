import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css']
})
export class ListSectionComponent {
  @Output('on-change') onChange = new EventEmitter<any>();
  @Input() list: string[] = []
  @Input() label!: string;
  @Input() key!: string;
  @Input() placeholder: string = '';
  @Input('is-editable') isEditable = false;

  newItem = '';
  
  onAdd() {
    this.list = [...this.list, this.newItem];
    this.newItem = '';
    this.onChange.emit({ [`${this.key}`]: this.list });
  }

  onRemove(skillToDelete: string) {
    this.list = this.list.filter(skill => skill !== skillToDelete);
    this.onChange.emit({ [`${this.key}`]: this.list });
  }
}
