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
import {ThemeProvider, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {isValidEmail, logError} from '../utils/HelperFunctions';
import {AuthContext} from '../utils/AuthContext';
import api from '../constants/api';
import Spinner from 'react-native-loading-spinner-overlay';
import CONSTANTS from '../constants/common';
import genericStyle from '../assets/styles/styleSheet';
import {AUTH, AUTHENTICATIONS, GENERAL} from '../services/api.constants';
import {ThemeContext} from '../context/ThemeContext';
import {Checkbox} from 'native-base';

const useUserAuth = () => React.useContext(AuthContext);
import Icon from 'react-native-vector-icons/AntDesign';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const {currentScreen, setCurrentScreen} = React.useContext(ThemeContext);

  const {
    setUserToken,
    setUserName,
    setUserEmail,
    setGuestView,
    userToken,
    setUserType,
  } = useUserAuth()!;

  let notificationToken: any = '';

  const ref: any = React.useRef();
  const [allSkills, setAllSkills] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  function clearStates() {
    setPassword('');
    setEmail('');
  }

  React.useEffect(() => {
    clearStates();
    setCurrentScreen('HomeScreen');
    try {
      fetch(AUTHENTICATIONS.API_URL + GENERAL.SITE_CONTENTS)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setAllSkills(responseJson.skills);
          setAllLocations(responseJson.locations);
          setAllSubjects(responseJson.subjects);
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert('Alert', 'Registration Failed. Try Again!');
          setShowSpinner(false);
        });
    } catch (exception) {
      console.log('exception ', exception);
      Alert.alert('Alert', 'Registration Failed. Try Again!');
      setShowSpinner(false);
    }
    (async () => {
      let _remeberMe = await AsyncStorage.getItem('rememberMe');
      let _password = await AsyncStorage.getItem('password');
      let _email = await AsyncStorage.getItem('email');
      console.log('========' + _remeberMe);
      if (_remeberMe !== null) {
        if (
          (_email !== null || _email !== '') &&
          (_password !== null || _password !== '')
        ) {
          setEmail(_email);
          setPassword(_password);
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
                'Content-Type': 'application/json',
              },
              body: loginRequest,
            };
            fetch(AUTHENTICATIONS.API_URL + AUTH.SIGNIN, requestObj)
              .then(response => response.json())
              .then(responseJson => {
                console.log(responseJson);
                if (responseJson && responseJson.user !== null) {
                  if (responseJson.user.isActive) {
                    if (
                      responseJson.user.emailVerified &&
                      responseJson.user.profileCreated
                    ) {
                      setUserName(responseJson.user.username);
                      setUserEmail(responseJson.user.email);
                      setUserToken(responseJson.user._id);
                      setUserType(responseJson.user.roles.name.toLowerCase());
                      setGuestView(false);
                      setIsLoading(false);
                    } else {
                      setIsLoading(false);
                      Alert.alert(
                        'Alert',
                        'Email not verified! Kindly check your email to verify your account.',
                      );
                    }
                  } else {
                    setIsLoading(false);
                    Alert.alert('Alert', 'User is inactive.');
                  }
                }
                setIsLoading(false);
              })
              .catch((err: any) => {
                console.log(err);
                console.log(err.response);
                setIsLoading(false);
              });
          } catch (exception) {
            setIsLoading(false);
            console.log('exception ', exception);
          }
        }
      } else {
        setIsLoading(false);
      }
    })();
  }, []);
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
          'Content-Type': 'application/json',
        },
        body: loginRequest,
      };
      fetch(AUTHENTICATIONS.API_URL + AUTH.SIGNIN, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson && responseJson.user !== null) {
            if (responseJson.user.isActive && responseJson.user.emailVerified) {
              if (responseJson.user.profileCreated) {
                if (responseJson.profile.status.toLowerCase() === 'pending') {
                  Alert.alert(
                    'Alert',
                    'Your account is under observation you will soon get confirmation email!',
                  );
                  clearStates();
                  setIsLoading(false);
                } else {
                  setUserName(responseJson.user.username);
                  setUserEmail(responseJson.user.email);
                  setUserToken(responseJson.user._id);
                  setUserType(responseJson.user.roles.name.toLowerCase());
                  setGuestView(false);
                  setIsLoading(false);
                  setEmail('');
                  setPassword('');
                  if (rememberMe) {
                    (async () => {
                      await AsyncStorage.setItem('rememberMe', 'yes');
                      await AsyncStorage.setItem(
                        'userId',
                        responseJson.user._id,
                      );
                      await AsyncStorage.setItem('password', password);
                      await AsyncStorage.setItem(
                        'email',
                        responseJson.user.email,
                      );
                    })();
                  }
                }
              } else {
                setEmail('');
                setPassword('');
                setIsLoading(false);
                navigation.navigate('ProfileSetup', {
                  email: email,
                  password: password,
                  allSkills: allSkills,
                  allSubjects: allSubjects,
                  allLocations: allLocations,
                  skills: [],
                  subjects: [],
                  locations: [],
                });
              }
            } else {
              setIsLoading(false);
              Alert.alert(
                'Alert',
                'Email not verified! Kindly check your email to verify your account.',
              );
              navigation.navigate('AccountVerify', {
                email: email,
                password: password,
              });
            }
          } else {
            setIsLoading(false);
            Alert.alert('Alert', responseJson.msg);
          }
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          setIsLoading(false);
        });
    } catch (exception) {
      setIsLoading(false);
      console.log('exception ', exception);
    }
  };

  const onPressForgotPwdBtn = () => {
    navigation.navigate('ResetPassword');
  };

  const onPressCreateAccountBtn = () => {
    navigation.navigate('AccountCreate');
  };

  const onPressBrowseGalleryBtn = () => {
    navigation.navigate('Guest');
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
      <View style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/login_log.png')}
            style={{width: 164.62, height: 165.69}}
          />
        </View>

        <View style={{padding: 15}}>
          <View style={styles.inputTextContainer}>
            {/* <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              style={genericStyle.textBox}
              placeholder="Email"
              placeholderTextColor="#3878ee"
              onChangeText={text => setEmail(text)}
              maxLength={40}
            /> */}
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              style={genericStyle.textBox}
              placeholderTextColor="#3878ee"
              onChangeText={text => setEmail(text)}
              maxLength={40}
              placeholder="Email"
              value={email}
            />
          </View>

          <View style={styles.passwordSection}>
            <View style={{width: '90%'}}>
              <TextInput
                secureTextEntry={secure}
                visible-password={true}
                style={styles.passwordInputBox}
                placeholder="Password"
                placeholderTextColor="#3878ee"
                onChangeText={text => setPassword(text)}
                value={password}
                maxLength={40}
                underlineColorAndroid="transparent"
              />

              {/* <TextInput
                secureTextEntry={secure}
                ref={ref}
                visible-password={true}
                style={styles.passwordInputBox}
                placeholder="Password"
                placeholderTextColor="#3878ee"
                onChangeText={text => setPassword(text)}
                maxLength={40}
                underlineColorAndroid="transparent"
              /> */}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSecure(!secure);
                }}>
                <Icon name="eye" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Checkbox
              accessibilityLabel="Remember Me"
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Text style={{marginLeft: 15, color: '#3878ee'}}>Remember Me</Text>
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
                <Text style={[styles.createBtnText, {fontWeight: 'bold'}]}>
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
            <Text style={[genericStyle.loginBtnText, {color: '#3878ee'}]}>
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
