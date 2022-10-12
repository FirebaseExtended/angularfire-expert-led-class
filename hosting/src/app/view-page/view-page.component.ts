import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeViewModel } from '../models/resume.model';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  vm: ResumeViewModel = this.activatedRoute.snapshot.data['vm'];
}
