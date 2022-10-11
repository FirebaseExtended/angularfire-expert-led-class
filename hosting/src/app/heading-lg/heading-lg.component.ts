import { Component } from '@angular/core';

@Component({
  selector: 'app-heading-lg',
  template: `
    <h1><ng-content></ng-content></h1>
  `,
  styleUrls: ['./heading-lg.component.css']
})
export class HeadingLgComponent { }
