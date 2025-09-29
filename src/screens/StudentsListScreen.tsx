import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Student } from '../types';
import { StudentItem } from '../components/StudentItem';
import { fetchStudents, TOTAL_STUDENTS_COUNT } from '../data/mockData';
import { StorageService } from '../services/StorageService';

interface StudentsListScreenProps {
  navigation: any;
}

export const StudentsListScreen: React.FC<StudentsListScreenProps> = ({ navigation }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Load initial data
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      // First try to load from storage
      const storedStudents = await StorageService.loadStudents();
      
      if (storedStudents.length > 0) {
        setStudents(storedStudents);
        setPage(Math.floor(storedStudents.length / 10));
        setHasMoreData(storedStudents.length < TOTAL_STUDENTS_COUNT);
      } else {
        // If no stored data, fetch from "API"
        const newStudents = await fetchStudents(0, 10);
        setStudents(newStudents);
        setPage(1);
        setHasMoreData(newStudents.length === 10);
        
        // Save to storage
        await StorageService.saveStudents(newStudents);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load students');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more students for infinite scrolling
  const loadMoreStudents = useCallback(async () => {
    if (loadingMore || !hasMoreData) return;

    setLoadingMore(true);
    try {
      const newStudents = await fetchStudents(page, 10);
      
      if (newStudents.length === 0) {
        setHasMoreData(false);
      } else {
        const updatedStudents = [...students, ...newStudents];
        setStudents(updatedStudents);
        setPage(page + 1);
        
        // Save updated list to storage
        await StorageService.saveStudents(updatedStudents);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load more students');
    } finally {
      setLoadingMore(false);
    }
  }, [students, page, loadingMore, hasMoreData]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Clear storage and reload from beginning
      await StorageService.clearStudents();
      const newStudents = await fetchStudents(0, 10);
      setStudents(newStudents);
      setPage(1);
      setHasMoreData(newStudents.length === 10);
      
      // Save to storage
      await StorageService.saveStudents(newStudents);
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh students');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Handle student press
  const handleStudentPress = (student: Student) => {
    navigation.navigate('StudentDetail', { student });
  };

  // Load data when screen focuses
  useFocusEffect(
    useCallback(() => {
      if (students.length === 0) {
        loadInitialData();
      }
    }, [loadInitialData])
  );

  // Render footer for infinite scrolling
  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading more students...</Text>
        </View>
      );
    }
    
    if (!hasMoreData && students.length > 0) {
      return (
        <View style={styles.footerMessage}>
          <Text style={styles.noMoreText}>No more students available</Text>
        </View>
      );
    }
    
    return null;
  };

  // Render empty state
  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading students...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No students found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem student={item} onPress={handleStudentPress} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreStudents}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={students.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  footerMessage: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  noMoreText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});