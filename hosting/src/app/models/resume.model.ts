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

import type { User } from "firebase/auth";
import { DocumentReference, Timestamp, FieldValue } from "firebase/firestore";

export type ListUpdate<T, K = any> = { key: T, item: K, type: 'added' | 'removed' }
export type SkillUpdate = ListUpdate<'skills', string>;
export type OverviewUpdate = ListUpdate<'overview', string>;
export type ResumeListUpdate = SkillUpdate | OverviewUpdate;
export type ExperienceUpdate = { 
  key: 'experience', 
  item: Experience, 
  type: 'added' | 'removed' | 'modified'
}

export type ResumeUser = {
  photoURL: string | null;
  displayName: string | null;
  uid: string | null;
}

export type Overview = {
  relevantWork: string[];
}

export type OneThing = {
  content: string;
  source: string;
}

export type NameTitle = {
  id: string;
  name: string;
  title: string;
}

export type Details = {
  title?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Experience extends Details {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

export type ExperienceSnap = {
  id: string;
  title: string;
  startDate: Timestamp;
  endDate: Timestamp;
  relevantWork: string[];
}

export type Education = {
  title: string;
  startDate: Date;
  endDate: Date;
  degree: string;
}

export type About = {
  content: string;
}

type BaseResume = {
  id: string;
  overview: string[];
  skills: string[];
  user: ResumeUser;
}

export interface Resume extends BaseResume {
  experiences: Experience[];
}

export interface ResumeSnap extends BaseResume {
  experience: ExperienceSnap[];
}

export type ResumeViewModel = {
  resume: Partial<Resume>;
  user: User;
}

export type ResumeRef = DocumentReference<Resume>;

export type ResumeRefModel = {
  ref: ResumeRef;
  user: User;
}

type BaseComment = {
  uid: string;
  photoURL: string | null;
  displayName: string | null;
  text: string;
  resumeId: string;
}

export interface Comment extends BaseComment {
  id: string;
  timestamp?: Timestamp;
  timeDisplay?: string;
}

export interface CommentUpdate extends BaseComment {
  timestamp: FieldValue;
}

export class ResumeObject implements Resume {
  experiences: Experience[] = [];
  id!: string;
  overview!: string[];
  skills: string[] = [];
  user!: ResumeUser;
}
