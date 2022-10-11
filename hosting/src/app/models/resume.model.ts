import type { User } from "firebase/auth";
import { DocumentReference, Timestamp } from "firebase/firestore";

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

type SnapDetails = {
  title: string;
  startDate: Timestamp;
  endDate: Timestamp;
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
}

export interface Resume extends BaseResume {
  experience: Experience[];
}

export interface ResumeSnap extends BaseResume {
  experience: SnapExperience[];
}

export type ViewModel = {
  resume: Resume;
  user: User;
}

export type ResumeRef = DocumentReference<Resume>;

export type ResumeRefModel = {
  ref: ResumeRef;
  user: User;
}
