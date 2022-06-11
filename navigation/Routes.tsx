import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyClassesScreen from '../screens/MyClassesScreen';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements/dist/image/Image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import AssignmentDetailScreen from '../screens/AssignmentDetailScreen';
import AssignmentScreen from '../screens/AssignmentScreen';
import ExamDetailScreen from '../screens/ExamDetailScreen';
import ExamScreen from '../screens/ExamScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchScreen from '../screens/SearchScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AddAssignmentScreen from '../screens/AddAssignment';
import AddExamScreen from '../screens/AddExam';
import AddClassScreen from '../screens/AddClass';
import AddAssignmentQuestions from '../screens/AddAssignmentQuestions';
import AddExamQuestions from '../screens/AddExamQuestions';
import HomeScreen from '../screens/HomeScreen';


const HomeStack = createNativeStackNavigator();
const mainHeader = { headerShown: false }
export default function Routes({ navigation, route }: any) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: true,
            }}>
            <HomeStack.Screen
                name="HomeScreen"
                options={mainHeader}
                component={HomeScreen}
            />
            <HomeStack.Screen
                name="Classes"
                options={mainHeader}
                component={MyClassesScreen}
            />
            <HomeStack.Screen
                name="ClassDetails"
                options={mainHeader}
                component={ClassDetailScreen}
            />
            <HomeStack.Screen
                name="AddClass"
                options={mainHeader}
                component={AddClassScreen}
            />
            <HomeStack.Screen
                name="AssignmentDetails"
                options={mainHeader}
                component={AssignmentDetailScreen}
            />
            <HomeStack.Screen
                name="Assignment"
                options={mainHeader}
                component={AssignmentScreen}
            />
            <HomeStack.Screen
                name="AddAssignment"
                options={mainHeader}
                component={AddAssignmentScreen}
            />
            <HomeStack.Screen
                name="AddAssignmentQuestions"
                options={mainHeader}
                component={AddAssignmentQuestions}
            />
            <HomeStack.Screen
                name="ExamDetails"
                options={mainHeader}
                component={ExamDetailScreen}
            />
            <HomeStack.Screen
                name="Exam"
                options={mainHeader}
                component={ExamScreen}
            />
            <HomeStack.Screen
                name="AddExam"
                options={mainHeader}
                component={AddExamScreen}
            />
            <HomeStack.Screen
                name="AddExamQuestions"
                options={mainHeader}
                component={AddExamQuestions}
            />
            <HomeStack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={mainHeader}
            />
            <HomeStack.Screen
                name="ScheduleScreen"
                component={ScheduleScreen}
                options={mainHeader}
            />
            <HomeStack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={mainHeader}
            />
        </HomeStack.Navigator>
    );
}
