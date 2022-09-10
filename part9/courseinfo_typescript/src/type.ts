export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartShared extends CoursePartBase {
  description: string;
}

export interface CoursepartNormal extends CoursePartShared{
  type: 'normal';
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartShared {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartShared {
  type: "special";
  requirements: string[];
}

export type CoursePart = CoursepartNormal | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart

export interface CoursePartsProps {
  courseParts: CoursePart[]
}
