import { Student, Course, CourseCategory } from '../types';

// Mock data for students and courses
const courseCategories: CourseCategory[] = ['Programming', 'Design', 'Math', 'Science', 'Languages'];

const mockCourses: Course[] = [
  // Programming courses
  { id: '1', title: 'React Native Fundamentals', duration: '8 weeks', category: 'Programming' },
  { id: '2', title: 'JavaScript ES6+', duration: '6 weeks', category: 'Programming' },
  { id: '3', title: 'Node.js Backend Development', duration: '10 weeks', category: 'Programming' },
  { id: '4', title: 'Python for Beginners', duration: '12 weeks', category: 'Programming' },
  { id: '5', title: 'TypeScript Mastery', duration: '4 weeks', category: 'Programming' },
  
  // Design courses
  { id: '6', title: 'UI/UX Design Principles', duration: '8 weeks', category: 'Design' },
  { id: '7', title: 'Adobe Photoshop Basics', duration: '6 weeks', category: 'Design' },
  { id: '8', title: 'Figma for Designers', duration: '4 weeks', category: 'Design' },
  { id: '9', title: 'Graphic Design Theory', duration: '10 weeks', category: 'Design' },
  
  // Math courses
  { id: '10', title: 'Calculus I', duration: '16 weeks', category: 'Math' },
  { id: '11', title: 'Linear Algebra', duration: '14 weeks', category: 'Math' },
  { id: '12', title: 'Statistics and Probability', duration: '12 weeks', category: 'Math' },
  { id: '13', title: 'Discrete Mathematics', duration: '10 weeks', category: 'Math' },
  
  // Science courses
  { id: '14', title: 'Physics I', duration: '16 weeks', category: 'Science' },
  { id: '15', title: 'Chemistry Fundamentals', duration: '14 weeks', category: 'Science' },
  { id: '16', title: 'Biology Basics', duration: '12 weeks', category: 'Science' },
  
  // Languages courses
  { id: '17', title: 'Spanish for Beginners', duration: '20 weeks', category: 'Languages' },
  { id: '18', title: 'French Conversation', duration: '16 weeks', category: 'Languages' },
  { id: '19', title: 'German Grammar', duration: '18 weeks', category: 'Languages' },
];

// Function to generate random courses for a student
const getRandomCourses = (count: number = 5): Course[] => {
  const shuffled = [...mockCourses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate mock students
export const generateMockStudents = (startIndex: number = 0, count: number = 10): Student[] => {
  const students: Student[] = [];
  
  for (let i = startIndex; i < startIndex + count; i++) {
    const studentNumber = i + 1;
    students.push({
      id: `student-${studentNumber}`,
      name: `Student ${studentNumber}`,
      email: `student${studentNumber}@university.edu`,
      avatar: `https://i.pravatar.cc/150?img=${(studentNumber % 70) + 1}`,
      courses: getRandomCourses(Math.floor(Math.random() * 6) + 3), // 3-8 courses per student
    });
  }
  
  return students;
};

// Total number of mock students available
export const TOTAL_STUDENTS_COUNT = 100;

// Function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to simulate fetching students with pagination
export const fetchStudents = async (page: number = 0, pageSize: number = 10): Promise<Student[]> => {
  await delay(1000); // Simulate network delay
  
  const startIndex = page * pageSize;
  if (startIndex >= TOTAL_STUDENTS_COUNT) {
    return []; // No more students
  }
  
  const remainingStudents = TOTAL_STUDENTS_COUNT - startIndex;
  const studentsToReturn = Math.min(pageSize, remainingStudents);
  
  return generateMockStudents(startIndex, studentsToReturn);
};