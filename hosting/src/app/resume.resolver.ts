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
import { User } from '@angular/fire/auth';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Resume } from './models/resume.model';
import { ResumeService } from './services/resume.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeResolver implements Resolve<Partial<Resume>> {
  resumeService = inject(ResumeService);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partial<Resume>> {
    return this.resumeService.resume$(route.paramMap.get('uid')!).pipe(tap(console.log));
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  resumeService = inject(ResumeService);
  resolve(): Observable<User> {
    return this.resumeService.user$;
  }
}
