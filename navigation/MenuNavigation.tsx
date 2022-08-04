import * as React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatScreenG from '../screens/ChatScreenG';
import MessagesScreen from '../screens/MessagesScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements/dist/image/Image';
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
    // <BottomTab.Navigator
    //   initialRouteName="Home"
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: '#3878ee',
    //     },
    //     tabBarStyle: {
    //       backgroundColor: '#3878ee',
    //       height: Platform.OS === 'ios' ? 83 : 85,
    //       position: 'absolute',
    //       bottom: 15,
    //       left: 20,
    //       right: 20,
    //       elevation: 0,
    //       borderRadius: 15,
    //     },
    //     tabBarShowLabel: false,
    //     tabBarLabelStyle: { fontSize: 15 },
    //     headerShown: false,
    //   }}>
    //   <BottomTab.Screen
    //     name="classes"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <View
    //           style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
    //           <Image
    //             style={[
    //               styles.tabIcon,
    //               {
    //                 tintColor: focused ? '#ffbb74' : '#ffffff',
    //               },
    //             ]}
    //             source={require('../assets/images/icons/briefcase.png')}
    //           />
    //           <Text
    //             style={{ color: focused ? '#ffbb74' : '#ffffff', fontSize: 12 }}>
    //             Classes
    //           </Text>
    //         </View>
    //       ),
    //     }}
    //     component={HomeStackScreen}
    //   />
    //   <BottomTab.Screen
    //     name="Message"
    //     options={{
    //       tabBarIcon: ({ focused }) => (
    //         <View
    //           style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
    //           <Image
    //             style={[
    //               styles.tabIcon,
    //               {
    //                 tintColor: focused ? '#ffbb74' : '#ffffff',
    //               },
    //             ]}
    //             source={require('../assets/images/icons/comment.png')}
    //           />
    //           <Text
    //             style={{ color: focused ? '#ffbb74' : '#ffffff', fontSize: 12 }}>
    //             Message
    //           </Text>
    //         </View>
    //       ),
    //     }}
    //     component={MessagesStackScreen}
    //   />
    //   <BottomTab.Screen
    //     name="Payment"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <View
    //           style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
    //           <Image
    //             style={[
    //               styles.tabIcon,
    //               {
    //                 tintColor: focused ? '#ffbb74' : '#ffffff',
    //               },
    //             ]}
    //             source={require('../assets/images//icons/credit-card.png')}
    //           />
    //           <Text
    //             style={{ color: focused ? '#ffbb74' : '#ffffff', fontSize: 12 }}>
    //             Payment
    //           </Text>
    //         </View>
    //       ),
    //     }}
    //     component={PaymentStackScreen}
    //   />
    //   <BottomTab.Screen
    //     name="Profile"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <View
    //           style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
    //           <Image
    //             style={[
    //               styles.tabIcon,
    //               {
    //                 tintColor: focused ? '#ffbb74' : '#ffffff',
    //               },
    //             ]}
    //             source={require('../assets/images/profile.png')}
    //           />
    //           <Text
    //             style={{ color: focused ? '#ffbb74' : '#ffffff', fontSize: 12 }}>
    //             Profile
    //           </Text>
    //         </View>
    //       ),
    //     }}
    //     component={ProfileStackScreen}
    //   />
    //   <BottomTab.Screen
    //     name="Settings"
    //     options={{
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => (
    //         <View
    //           style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
    //           <Image
    //             style={[
    //               styles.tabIcon,
    //               {
    //                 tintColor: focused ? '#ffbb74' : '#ffffff',
    //               },
    //             ]}
    //             source={require('../assets/images/setting.png')}
    //           />
    //           <Text
    //             style={{ color: focused ? '#ffbb74' : '#ffffff', fontSize: 12 }}>
    //             Settings
    //           </Text>
    //         </View>
    //       ),
    //     }}
    //     component={SettingsStackScreen}
    //   />
    // </BottomTab.Navigator>
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

// const mainHeader = ({ navigation }: any): any => {
//   return {
//     headerStyle: {
//       backgroundColor: '#3878ee',
//     },
//     headerShown: true,
//     // title: "",
//     //headerTitleAlign: 'center',
//     headerTitleStyle: {
//       color: '#ffffff',
//       fontSize: 22,
//     },
//     headerTitle: (props: any) => {
//       return (
//         <View style={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           width: "100%",
//           marginLeft: -10
//         }}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'HomeScreen' }],
//               });
//             }}
//           >
//             <Icon name='home' size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'ScheduleScreen' }],
//               });
//             }}
//           >
//             <Icon name='calendar' size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'NotificationScreen' }],
//               });
//             }}
//           >
//             <Icon name='bells' size={30} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'SearchScreen' }],
//               });
//             }}
//           >
//             <Icon name='search1' size={30} color="white" />
//           </TouchableOpacity>
//         </View>
//       )
//     }
//   };
// };

const HomeStackScreen = ({navigation, route}: any) => {
  const mainHeader = {headerShown: false};
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        options={mainHeader}
        component={HomeScreen}
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
        options={mainHeader}
        component={ClassPayScreen}
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
        options={mainHeader}
        component={ChatScreen}
      />
      <HomeStack.Screen
        name="ChatScreenG"
        options={mainHeader}
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
      <HomeStack.Screen name="EditProfile" component={EditProfileScreen} />
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
  const mainHeader = {headerShown: false};
  return (
    <MessagesStack.Navigator screenOptions={{headerShown: false}}>
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
  backArrow: {marginTop: 0, tintColor: '#ffffff', height: 35, width: 35},
  backArrowContainer: {
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 45 : 70,
    width: 50,
  },
});

export default MenuNavigation;
