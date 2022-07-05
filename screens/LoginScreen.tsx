import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Text,
  View,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { isValidEmail, logError } from '../utils/HelperFunctions';
import { AuthContext } from '../utils/AuthContext';
import api from '../constants/api';
import Spinner from 'react-native-loading-spinner-overlay';
import CONSTANTS from '../constants/common';
import genericStyle from '../assets/styles/styleSheet';
import { AUTH, AUTHENTICATIONS } from '../services/api.constants';
import { ThemeContext } from '../context/ThemeContext';
import { Checkbox } from 'native-base';
const useUserAuth = () => React.useContext(AuthContext);

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const { currentScreen, setCurrentScreen } = React.useContext(ThemeContext);

  const { setUserToken, setUserName, setUserEmail, setGuestView, userToken, setUserType } =
    useUserAuth()!;

  let notificationToken: any = '';

  const ref: any = React.useRef();

  React.useEffect(() => {
    setCurrentScreen("HomeScreen");

    (async () => {

      let _remeberMe = await AsyncStorage.getItem('rememberMe');
      let _password = await AsyncStorage.getItem('password');
      let _email = await AsyncStorage.getItem(
        'email'
      );
      console.log("========" + _remeberMe)
      if (_remeberMe !== null) {

        if ((_email !== null || _email !== "") && (_password !== null || _password !== "")) {
          setEmail(_email)
          setPassword(_password)
          let loginRequest: any = JSON.stringify({
            username: _email,
            password: _password,
            notificationToken: notificationToken,
            os: Platform.OS,
          });

          setIsLoading(true);
          try {
            let requestObj = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: loginRequest
            }
            fetch(AUTHENTICATIONS.API_URL + AUTH.SIGNIN, requestObj)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson)
                if (responseJson && responseJson.user !== null) {
                  if (responseJson.user.isActive) {
                    if (responseJson.user.emailVerified && responseJson.user.profileCreated) {
                      setUserName(responseJson.user.username);
                      setUserEmail(responseJson.user.email);
                      setUserToken(responseJson.user._id);
                      setUserType(responseJson.user.roles.name.toLowerCase())
                      setGuestView(false);
                      setIsLoading(false);
                    } else {
                      setIsLoading(false);
                      Alert.alert('Alert', 'Email not verified! Kindly check you email to verify your account.');
                    }
                  }
                  else {
                    setIsLoading(false);
                    Alert.alert('Alert', 'User is inactive.');
                  }
                }
                setIsLoading(false);
              })
              .catch((err: any) => {
                console.log(err)
                console.log(err.response)
                setIsLoading(false);
              })
          }

          catch (exception) {
            setIsLoading(false);
            console.log('exception ', exception)
          }
        }
      }
      else {
        setIsLoading(false);
      }
    })();

  }, [])
  const onPressLoginBtn = () => {
    if (email.trim().length == 0) {
      Alert.alert('Alert', 'Email and password cannot be empty.');
      return;
    } else if (password.trim().length == 0) {
      Alert.alert('Alert', 'Email and password cannot be empty.');
      return;
    } else if (!isValidEmail(email)) {
      Alert.alert('Alert', 'Enter valid email');
      return;
    }

    let loginRequest: any = JSON.stringify({
      username: email,
      password: password,
      notificationToken: notificationToken,
      os: Platform.OS,
    });

    setIsLoading(true);
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: loginRequest
      }
      fetch(AUTHENTICATIONS.API_URL + AUTH.SIGNIN, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson && responseJson.user !== null) {
            if (responseJson.user.isActive && responseJson.user.emailVerified) {
              if (responseJson.user.profileCreated) {
                setUserName(responseJson.user.username);
                setUserEmail(responseJson.user.email);
                setUserToken(responseJson.user._id);
                setUserType(responseJson.user.roles.name.toLowerCase())
                setGuestView(false);
                setIsLoading(false);
                setEmail("")
                setPassword("")
                if (rememberMe) {
                  (async () => {
                    await AsyncStorage.setItem('rememberMe', rememberMe);
                    await AsyncStorage.setItem('userId', responseJson.user._id);
                    await AsyncStorage.setItem('password', password);
                    await AsyncStorage.setItem(
                      'email',
                      responseJson.user.email,
                    );
                  })();
                }
              }
              else {
                setEmail("")
                setPassword("")
                setIsLoading(false);
                navigation.navigate('ProfileSetup', {
                  email: email,
                  password: password,
                  allSkills: [],
                  allGenres: [],
                  allLocations: [],
                  skills: [],
                  genres: [],
                  locations: [],
                });
              }
            }
            else {
              setIsLoading(false);
              Alert.alert('Alert', 'Email not verified! Kindly check you email to verify your account.')
              navigation.navigate('AccountVerify', {
                email: email,
                password: password,
              })
            }
          }
          else {
            setIsLoading(false);
            Alert.alert('Alert', responseJson.msg);
          }
        })
        .catch((err: any) => {
          console.log(err)
          console.log(err.response)
          setIsLoading(false);
        })
    }
    catch (exception) {
      setIsLoading(false);
      console.log('exception ', exception)
    }
    // api.userLogin(loginRequest).then((loginResponse: any) => {
    //   if (loginResponse) {
    //     if (loginResponse.success) {
    //       if (
    //         loginResponse.profile.emailVerified &&
    //         loginResponse.profile.profileCreated
    //       ) {
    //         if (
    //           !loginResponse.profile.isBanned &&
    //           !loginResponse.profile.isAdmin
    //         ) {
    //           setIsLoading(false);

    //           (async () => {
    //             await AsyncStorage.setItem('userId', loginResponse.profile._id);
    //             await AsyncStorage.setItem('password', password);
    //             await AsyncStorage.setItem(
    //               'email',
    //               loginResponse.profile.email,
    //             );
    //           })();
    //           setUserName(loginResponse.profile.fullName);
    //           setUserEmail(loginResponse.profile.email);
    //           setUserToken(loginResponse.profile._id);
    //           setGuestView(false);
    //         } else {
    //           Alert.alert('Alert', 'Sorry, You not allowed to access system!');
    //           setIsLoading(false);
    //         }
    //       } else {
    //         Alert.alert('Alert', 'Email not verified!');
    //         setIsLoading(false);
    //         navigation.navigate('AccountVerify', {
    //           email: email,
    //           password: password,
    //         });
    //       }
    //     } else {
    //       if (loginResponse.isVerifyPending) {
    //         setIsLoading(false);
    //         navigation.navigate('AccountVerify', {
    //           email: email,
    //           password: password,
    //         });
    //       } else if (loginResponse.isProfileSetupPending) {
    //         let allSkill: any = [];
    //         let allGenres: any = [];
    //         let allLocations: any = [];

    //         api
    //           .getSiteContents('skills,genre,location')
    //           .then(response => {
    //             if (response && response.success) {
    //               allSkill = response['meta'].result.filter(
    //                 (item: any) => item.contentType === 'skills',
    //               );
    //               allGenres = response['meta'].result.filter(
    //                 (item: any) => item.contentType === 'genre',
    //               );
    //               allLocations = response['meta'].result.filter(
    //                 (item: any) => item.contentType === 'location',
    //               );

    //               navigation.navigate('ProfileSetup', {
    //                 email: email,
    //                 password: password,
    //                 allSkills: allSkill,
    //                 allGenres: allGenres,
    //                 allLocations: allLocations,
    //                 skills: [],
    //                 genres: [],
    //                 locations: [],
    //               });
    //             } else {
    //               let description = 'error occurred while fetching skills';
    //               let error = response.message
    //                 ? Error(response.message)
    //                 : Error("Couldn't fetch skills");
    //               logError(description, error, 'ProfileScreen');
    //             }
    //           })
    //           .then(() => setIsLoading(false));
    //       } else {
    //         let messagetext = '';
    //         if (loginResponse.message) {
    //           messagetext = loginResponse.message;
    //         } else if (loginResponse.errors && loginResponse.errors.message) {
    //           messagetext = loginResponse.errors.message;
    //         }
    //         Alert.alert('Alert', messagetext);
    //         setIsLoading(false);
    //       }
    //     }
    //   } else {
    //     setIsLoading(false);
    //   }
    // });
  };

  const onPressForgotPwdBtn = () => {
    navigation.navigate('ResetPassword');
  };

  const onPressCreateAccountBtn = () => {
    navigation.navigate('AccountCreate');
  };

  const onPressBrowseGalleryBtn = () => {
    let loginRequest: any = JSON.stringify({
      email: CONSTANTS.VALUES.GUEST_ACCOUNT_EMAIL,
      isGuest: true,
      password: CONSTANTS.VALUES.GUEST_ACCOUNT_PASSWORD,
      notificationToken: notificationToken,
      os: Platform.OS,
    });

    setIsLoading(true);
    api.userLogin(loginRequest).then((loginResponse: any) => {
      if (loginResponse) {
        console.log('--------loginResponse: ', loginResponse);
        if (loginResponse.success) {
          if (loginResponse.profile.isGuest && !loginResponse.profile.isAdmin) {
            setIsLoading(false);

            (async () => {
              await AsyncStorage.setItem('userId', loginResponse.profile._id);
              await AsyncStorage.setItem('password', password);
              await AsyncStorage.setItem('email', loginResponse.profile.email);
            })();
            // setUserName(loginResponse.profile.fullName);
            // setUserEmail(loginResponse.profile.email);
            // setUserToken(loginResponse.profile._id);
            navigation.navigate('Guest');
            setGuestView(true);
          }
        } else {
          setIsLoading(false);
          Alert.alert('Error', 'Please try again some error occured!');
        }
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Please try again some error occured!');
      }
    });
  };

  /* ==================================== JSX Code Starts From Here ===================== */
  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        color="#ffbb74"
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/login_log.png')}
            style={{ width: 164.62, height: 165.69 }}
          />
        </View>

        <View style={{ padding: 15 }}>
          <View style={styles.inputTextContainer}>
            <TextInput
              testID="inputEmail"
              keyboardType="email-address"
              autoCapitalize="none"
              style={genericStyle.textBox}
              placeholder="Email"
              placeholderTextColor="#3878ee"
              onChangeText={text => setEmail(text)}
              editable={showSpinner ? false : true}
              maxLength={40}
            />
          </View>

          <View style={styles.passwordSection}>
            <TextInput
              testID="inputPassword"
              secureTextEntry={secure}
              ref={ref}
              visible-password={true}
              style={styles.passwordInputBox}
              placeholder="Password"
              placeholderTextColor="#3878ee"
              onChangeText={text => setPassword(text)}
              editable={showSpinner ? false : true}
              maxLength={40}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Checkbox accessibilityLabel="Remember Me" value={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <Text style={{ marginLeft: 15, color: "#3878ee" }}>Remeber Me</Text>
          </View>

        </View>

        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            paddingHorizontal: 30,
          }}>
          <View style={genericStyle.loginButton}>
            <TouchableOpacity
              onPress={() => onPressLoginBtn()}
              style={genericStyle.loginBtn}>
              <Text style={genericStyle.loginBtnText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createBtn}>
            <TouchableOpacity onPress={onPressCreateAccountBtn}>
              <Text style={styles.createBtnText}>
                Create an{' '}
                <Text style={[styles.createBtnText, { fontWeight: 'bold' }]}>
                  account
                </Text>
              </Text>
              <View style={genericStyle.underline} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              onPressBrowseGalleryBtn();
            }}
            style={[
              genericStyle.loginBtn,
              {
                marginTop: 40,
              },
            ]}>
            <Text style={[genericStyle.loginBtnText, { color: '#3878ee' }]}>
              Continue As Guest{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={showSpinner}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#ffbb74" />
        </View>
      </Modal>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#ffffff',
  },
  resetPasswordContainer: {
    marginTop: 15,
    height: 21.5,
    alignSelf: 'center',
  },

  scrollView: {
    paddingVertical: 15,
    paddingHorizontal: 45,
  },
  inputTextContainer: {
    marginTop: 45,
    height: 50,
  },
  header: {
    // flex: 1.5,
    // height: 202,
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    marginTop: 80,
    alignSelf: 'center',
  },

  actionBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  modalView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 50,
  },
  forgotPwdText: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 18,
    color: '#3878ee',
  },
  createBtn: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
    // backgroundColor: 'transparent',
  },
  createBtnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3878ee',
  },
  pwdAndIcon: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 50,
    marginRight: 15,
  },

  passwordSection: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomColor: '#3878ee',
    borderTopColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderWidth: 1.5,
    borderRadius: 1,
    height: 50,
    marginTop: 8,
    width: '100%',
  },
  passwordIcon: {
    padding: 10,
  },

  passwordInputBox: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft: 15,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    color: '#424242',
    fontFamily: 'System',
  },
});
