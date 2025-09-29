export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  category: CourseCategory;
}

export type CourseCategory = 'Programming' | 'Design' | 'Math' | 'Science' | 'Languages';

export interface CourseSection {
  title: CourseCategory;
  data: Course[];
}