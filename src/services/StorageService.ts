import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../types';

const STUDENTS_STORAGE_KEY = '@students_data';

export const StorageService = {
  // Save students to AsyncStorage
  async saveStudents(students: Student[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(students);
      await AsyncStorage.setItem(STUDENTS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving students to storage:', error);
    }
  },

  // Load students from AsyncStorage
  async loadStudents(): Promise<Student[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STUDENTS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading students from storage:', error);
      return [];
    }
  },

  // Clear students data
  async clearStudents(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STUDENTS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing students from storage:', error);
    }
  }
};