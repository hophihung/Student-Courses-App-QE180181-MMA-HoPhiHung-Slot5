import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Student } from '../types';

interface StudentItemProps {
  student: Student;
  onPress: (student: Student) => void;
}

const { width } = Dimensions.get('window');

export const StudentItem: React.FC<StudentItemProps> = ({ student, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(student)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: student.avatar }}
        style={styles.avatar}
        defaultSource={require('../../assets/icon.png')}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.email}>{student.email}</Text>
        <Text style={styles.coursesCount}>
          {student.courses.length} course{student.courses.length !== 1 ? 's' : ''} enrolled
        </Text>
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  coursesCount: {
    fontSize: 12,
    color: '#999',
  },
  chevron: {
    padding: 8,
  },
  chevronText: {
    fontSize: 24,
    color: '#ccc',
  },
});