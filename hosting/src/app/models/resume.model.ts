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

// Define action for arbitrary list update
export type ListUpdate<T, K = any> = { key: T, item: K, type: 'added' | 'removed' }

// Define action for skills list update
export type SkillUpdate = ListUpdate<'skills', string>;

// Define action for overview list update
export type OverviewUpdate = ListUpdate<'overview', string>;

// Define action for updating either skill or overview
export type ResumeListUpdate = SkillUpdate | OverviewUpdate;

// Deine action for updating experience
export type ExperienceUpdate = { 
  key: 'experience', 
  item: Experience, 
  type: 'added' | 'removed' | 'modified'
}

// Define user type within a resume
export type ResumeUser = {
  photoURL: string | null;
  displayName: string | null;
  uid: string | null;
}

// Define overview type that includes a string array of relevant work
export type Overview = {
  relevantWork: string[];
}

// Define interface for experience
export interface Experience {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

// Define experiencesnap type
export type ExperienceSnap = {
  id: string;
  title: string;
  startDate: Timestamp;
  endDate: Timestamp;
  relevantWork: string[];
}

// Define basic resume type with resume fields and user
type BaseResume = {
  id: string;
  overview: string[];
  skills: string[];
  user: ResumeUser;
}

// Define resume interface
export interface Resume extends BaseResume {
  experiences: Experience[];
}

// Define resume snap interface that uses experience snap
export interface ResumeSnap extends BaseResume {
  experience: ExperienceSnap[];
}

// Define type for resume doc reference
export type ResumeRef = DocumentReference<Resume>;

// Define type for basic comment
type BaseComment = {
  uid: string;
  photoURL: string | null;
  displayName: string | null;
  text: string;
  resumeId: string;
}

// Define comment interface
export interface Comment extends BaseComment {
  id: string;
  timestamp?: Timestamp;
  timeDisplay?: string;
}
// Define comment update interface
export interface CommentUpdate extends BaseComment {
  timestamp: FieldValue;
}

// Define resume class
export class ResumeObject implements Resume {
  experiences: Experience[] = [];
  id!: string;
  overview!: string[];
  skills: string[] = [];
  user!: ResumeUser;
}
