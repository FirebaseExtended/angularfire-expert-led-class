import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resume } from '../models/resume.model';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  resume: Partial<Resume> = this.activatedRoute.snapshot.data['resume'];
}
