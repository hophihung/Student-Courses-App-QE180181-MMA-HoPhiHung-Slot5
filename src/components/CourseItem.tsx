import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Course } from '../types';

interface CourseItemProps {
  course: Course;
}

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Programming':
        return '#4CAF50';
      case 'Design':
        return '#FF9800';
      case 'Math':
        return '#2196F3';
      case 'Science':
        return '#9C27B0';
      case 'Languages':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.duration}>{course.duration}</Text>
      </View>
      <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(course.category) }]}>
        <Text style={styles.categoryText}>{course.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});