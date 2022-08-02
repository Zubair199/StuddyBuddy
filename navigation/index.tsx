import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../utils/AuthContext';
import {
  ColorSchemeName,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackParamList} from '../types';
import MenuNavigator from '../navigation/MenuNavigation';
import NotFoundScreen from '../screens/NotFoundScreen';
import AccountCreateScreen from '../screens/AccountCreateScreen';
import AccountVerificationScreen from '../screens/AccountVerificationScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GuestArtsScreen from '../screens/GuestArtsScreen';
import {useNavigation} from '@react-navigation/native';
import AddClassScreen from '../screens/AddClass';

export const useUserAuth = () => React.useContext(AuthContext);

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const topTab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  type authPropsType = {
    children: React.ReactNode;
  };
  const [userToken, setUserToken] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [guestView, setGuestView] = React.useState(false);

  const navigation = useNavigation();

  // Implementation of authorizing users based on token-->
  const AuthContextProvider = ({children}: authPropsType) => {
    return (
      <AuthContext.Provider
        value={{
          userToken,
          setUserToken,
          userName,
          setUserName,
          userEmail,
          setUserEmail,
          userType,
          setUserType,
          guestView,
          setGuestView,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };
  const headerFixed = ({navigation}: any): any => {
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backArrowContainer}
          onPress={navigation.goBack}>
          <Image
            style={styles.backArrow}
            source={require('../assets/images/icons/roundBack.png')}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#3878ee',
      },
      headerShown: true,
      // title: "",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#ffffff',
        fontSize: 22,
      },
    };
  };
  const header = (): any => {
    return {
      headerStyle: {
        backgroundColor: 'rgba(52, 52, 52,0.7)',
      },
      headerTransparent: true,
      headerShown: true,
      title: 'You Are Browsing As A Guest',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: '#C1CAE1',
        fontSize: 20,
      },
    };
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AuthContextProvider>
          <Stack.Navigator>
            {userToken == '' ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="AccountCreate"
                  component={AccountCreateScreen}
                  options={headerFixed}
                />
                <Stack.Screen
                  name="AccountVerify"
                  component={AccountVerificationScreen}
                  options={headerFixed}
                />
                <Stack.Screen
                  name="ProfileSetup"
                  component={ProfileSetupScreen}
                  options={headerFixed}
                />
                <Stack.Screen
                  name="Guest"
                  component={GuestArtsScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: '#3878ee',
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        style={styles.backArrowContainer}
                        onPress={() => navigation.navigate('Login')}>
                        <Image
                          style={[styles.backArrow, {tintColor: '#ffbb74'}]}
                          source={require('../assets/images/icons/roundBack.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerShown: true,
                    title: 'Guest Mode',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      color: '#ffbb74',
                      fontSize: 22,
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Root"
                  options={{headerShown: false}}
                  component={MenuNavigator}
                />
                <Stack.Screen
                  name="NotFound"
                  component={NotFoundScreen}
                  options={{title: 'Oops!'}}
                />
              </>
            )}
          </Stack.Navigator>
        </AuthContextProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backArrow: {tintColor: '#C1CAE1', height: 35, width: 30},
  backArrowContainer: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
});
