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

export type ListUpdate<T> = { key: T, item: string, type: 'added' | 'removed' }
export type SkillUpdate = ListUpdate<'skills'>;
export type ExperienceUpdate = ListUpdate<'experience'>;
export type OverviewUpdate = ListUpdate<'overview'>;
export type ResumeListUpdate = SkillUpdate | OverviewUpdate | ExperienceUpdate;

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

export type Experience = {
  title: string;
  startDate: Date;
  endDate: Date;
  relevantWork: string[];
}

type SnapExperience = {
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
  nameTitle: NameTitle;
  about: About;
  overview: Overview;
  education: Education[];
  oneThing: OneThing;
  skills: string[];
  user: ResumeUser;
}

export interface Resume extends BaseResume {
  experience: Experience[];
}

export interface ResumeSnap extends BaseResume {
  experience: SnapExperience[];
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
