import { Component, inject } from '@angular/core';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  resumeService: ResumeService = inject(ResumeService);
  user$ = this.resumeService.user$;
}
