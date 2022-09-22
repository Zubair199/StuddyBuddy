import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatScreenG from '../screens/ChatScreenG';
import MessagesScreen from '../screens/MessagesScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
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
import MyClassesScreen from '../screens/MyClassesScreen';
import StudentAssignmentScreen from '../screens/StudentAssignmentScreen';
import AssignmentStartScreen from '../screens/AssignmentStartScreen';
import ExamStartScreen from '../screens/ExamStartScreen';
import NetworkScreen from '../screens/NetworkScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ClassPayScreen from '../screens/ClassPayScreen';
import PlatformPayScreen from '../screens/PlatformPayScreen';
import ClassVideoScreen from '../screens/ClassVideoScreen';
import Dashboard from '../screens/Dashboard';
import { app, info } from '../constants/themeColors';

const BottomTab = createBottomTabNavigator();

const RootStack = createNativeStackNavigator();

const MenuNavigation = () => {
  const navigation = useNavigation();


  const getCurrentScreenName = (state: any): any => {
    let screenName = '';
    if (state.routes[0].state && state.routes[0].state.routes) {
      return getCurrentScreenName(state.routes[0].state);
    } else {
      screenName = state.routes[state.index].name;
    }
    // setActiveRouteName(screenName);
    return screenName;
  };


  return (
    <HomeStackScreen />
  );
};

const HomeStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// const SearchStack = createNativeStackNavigator();
// const ScheduleStack = createNativeStackNavigator();
// const NotificationStack = createNativeStackNavigator();

const topTab = createMaterialTopTabNavigator();

const mainHeader = ({ navigation }: any): any => {
  return {
    headerStyle: {
      backgroundColor: app.lightBlue,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerShown: true,
    headerTitleStyle: {
      color: '#ffffff',
      fontSize: 22,
    },
    headerLeft: () => {
      return (
        <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={22} color="#fff" />
        </TouchableOpacity>
      )
    }
  };
};

const HomeStackScreen = ({ navigation, route }: any) => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Dashboard"
        options={mainHeader}
        component={Dashboard}
      />

      <HomeStack.Screen
        name="NetworkScreen"
        options={mainHeader}
        component={NetworkScreen}
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
        name="ClassPayScreen"
        // options={mainHeader}
        component={ClassPayScreen}
      />
      <HomeStack.Screen
        name="PlatformPayScreen"
        // options={mainHeader}
        component={PlatformPayScreen}
      />
      <HomeStack.Screen
        name="ClassVideoScreen"
        // options={mainHeader}
        component={ClassVideoScreen}
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
        name="AssignmentStartScreen"
        options={mainHeader}
        component={AssignmentStartScreen}
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
        name="ExamStartScreen"
        options={mainHeader}
        component={ExamStartScreen}
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
        name="StudentAssignmentScreen"
        options={mainHeader}
        component={StudentAssignmentScreen}
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
      <HomeStack.Screen
        name="Payments"
        options={mainHeader}
        component={PaymentsScreen}
      />
      <HomeStack.Screen
        name="Messages"
        options={mainHeader}
        component={MessagesScreen}
      />
      <HomeStack.Screen
        name="ChatScreen"
        options={{headerShown:false}}
        component={ChatScreen}
      />
      <HomeStack.Screen
        name="ChatScreenG"
        options={{headerShown:false}}
        component={ChatScreenG}
      />
      <HomeStack.Screen
        name="Settings"
        options={mainHeader}
        component={SettingsScreen}
      />
      <HomeStack.Screen
        name="Profile"
        options={mainHeader}
        component={ProfileScreen}
      />
      <HomeStack.Screen
        name="EditProfile"
        options={mainHeader}
        component={EditProfileScreen}
      />
    </HomeStack.Navigator>
  );
};
const PaymentStackScreen = () => (
  <PaymentStack.Navigator screenOptions={{}}>
    <PaymentStack.Screen
      name="Payments"
      options={mainHeader}
      component={PaymentsScreen}
    />
  </PaymentStack.Navigator>
);
const MessagesStackScreen = () => {
  const mainHeader = { headerShown: false };
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen
        name="Messages"
        options={mainHeader}
        component={MessagesScreen}
      />
    </MessagesStack.Navigator>
  );
};
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{}}>
    <SettingsStack.Screen
      name="Settings"
      options={mainHeader}
      component={SettingsScreen}
    />
  </SettingsStack.Navigator>
);
const ProfileStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{}}>
    <SettingsStack.Screen
      name="Profile"
      options={mainHeader}
      component={ProfileScreen}
    />
  </SettingsStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  tabIcon: {
    width: 35,
    height: 35,
    tintColor: '#ffffff',
  },
  topBarDivision: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
    right: 15,
  },
  backArrow: { marginTop: 0, tintColor: '#ffffff', height: 35, width: 35 },
  backArrowContainer: {
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 45 : 70,
    width: 50,
  },
});

export default MenuNavigation;
