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
