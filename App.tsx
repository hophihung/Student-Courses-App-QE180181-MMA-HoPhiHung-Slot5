import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentsListScreen } from './src/screens/StudentsListScreen';
import { StudentDetailScreen } from './src/screens/StudentDetailScreen';
import { Student } from './src/types';

type RootStackParamList = {
  StudentsList: undefined;
  StudentDetail: { student: Student };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="StudentsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="StudentsList"
          component={StudentsListScreen}
          options={{
            title: 'Students',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={{
            title: 'Student Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
