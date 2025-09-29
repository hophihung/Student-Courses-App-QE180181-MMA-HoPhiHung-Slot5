import React, { useState, useMemo } from 'react';
import {
  View,
  SectionList,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import { Student, CourseSection, Course } from '../types';
import { CourseItem } from '../components/CourseItem';
import { SectionHeader } from '../components/SectionHeader';
import { SearchBar } from '../components/SearchBar';

interface StudentDetailScreenProps {
  route: {
    params: {
      student: Student;
    };
  };
  navigation: any;
}

export const StudentDetailScreen: React.FC<StudentDetailScreenProps> = ({ route, navigation }) => {
  const { student } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  // Set navigation title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: student.name,
    });
  }, [navigation, student.name]);

  // Group courses by category and filter by search
  const courseSections: CourseSection[] = useMemo(() => {
    // Filter courses based on search query
    const filteredCourses = student.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group by category
    const grouped = filteredCourses.reduce((acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = [];
      }
      acc[course.category].push(course);
      return acc;
    }, {} as Record<string, Course[]>);

    // Convert to section list format and sort
    return Object.entries(grouped)
      .map(([category, courses]) => ({
        title: category as any,
        data: courses.sort((a, b) => a.title.localeCompare(b.title)),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [student.courses, searchQuery]);

  // Render student header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: student.avatar }}
        style={styles.avatar}
        defaultSource={require('../../assets/icon.png')}
      />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.name}</Text>
        <Text style={styles.studentEmail}>{student.email}</Text>
        <Text style={styles.coursesCount}>
          {student.courses.length} course{student.courses.length !== 1 ? 's' : ''} enrolled
        </Text>
      </View>
    </View>
  );

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 'No courses match your search' : 'No courses enrolled'}
      </Text>
      {searchQuery && (
        <Text style={styles.emptySubtext}>
          Try searching with different keywords
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={courseSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseItem course={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} count={section.data.length} />
        )}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search courses..."
            />
          </View>
        }
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={courseSections.length === 0 ? styles.emptyListContainer : undefined}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  coursesCount: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  sectionSeparator: {
    height: 12,
  },
});