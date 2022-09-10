import * as React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements/dist/image/Image';
import LoginScreen from '../screens/LoginScreen';
import AccountCreateScreen from '../screens/AccountCreateScreen';
import AccountVerificationScreen from '../screens/AccountVerificationScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import GuestArtsScreen from '../screens/GuestArtsScreen';

const AuthMenuNavigation = () => {
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
        <AuthStackScreen />
    );
};

const AuthStack = createNativeStackNavigator();
const headerFixed = ({ navigation }: any): any => {
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
const AuthStackScreen = ({ navigation, route }: any) => {
    const mainHeader = { headerShown: false };
    return (
        <AuthStack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: true,
            }}>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <AuthStack.Screen
                name="AccountCreate"
                component={AccountCreateScreen}
                options={headerFixed}
            />
            <AuthStack.Screen
                name="AccountVerify"
                component={AccountVerificationScreen}
                options={headerFixed}
            />
            <AuthStack.Screen
                name="ProfileSetup"
                component={ProfileSetupScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
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
                                style={[styles.backArrow, { tintColor: '#ffbb74' }]}
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

        </AuthStack.Navigator>
    );
};

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

export default AuthMenuNavigation;
