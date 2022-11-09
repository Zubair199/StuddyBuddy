import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../utils/AuthContext';
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
import { RootStackParamList } from '../types';
import MenuNavigator from '../navigation/MenuNavigation';
import NotFoundScreen from '../screens/NotFoundScreen';
import AccountCreateScreen from '../screens/AccountCreateScreen';
import AccountVerificationScreen from '../screens/AccountVerificationScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GuestArtsScreen from '../screens/GuestArtsScreen';
import { useNavigation } from '@react-navigation/native';
import AddClassScreen from '../screens/AddClass';
import AuthMenuNavigation from './AuthNavigation';

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

  // Implementation of authorizing users based on token-->
  const AuthContextProvider = ({ children }: authPropsType) => {
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
                  name="AuthMenu"
                  options={{ headerShown: false }}
                  component={AuthMenuNavigation}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Root"
                  options={{ headerShown: false }}
                  component={MenuNavigator}
                />
                <Stack.Screen
                  name="NotFound"
                  component={NotFoundScreen}
                  options={{ title: 'Oops!' }}
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
  backArrow: { tintColor: '#C1CAE1', height: 35, width: 30 },
  backArrowContainer: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
});
