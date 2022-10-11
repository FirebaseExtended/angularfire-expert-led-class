import { Injectable, inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ViewModel } from './models/resume.model';
import { ResumeService } from './services/resume.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeResolver implements Resolve<ViewModel> {
  resumeService = inject(ResumeService);
  resolve(): Observable<ViewModel> {
    return this.resumeService.current$;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ResumeStreamResolver implements Resolve<Observable<ViewModel>> {
  resumeService = inject(ResumeService);
  resolve(): Observable<Observable<ViewModel>> {
    return of(this.resumeService.current$);
  }
}
