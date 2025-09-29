import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CourseCategory } from '../types';

interface SectionHeaderProps {
  title: CourseCategory;
  count: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count }) => {
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
    <View style={[styles.container, { borderLeftColor: getCategoryColor(title) }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count} course{count !== 1 ? 's' : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderLeftWidth: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
});