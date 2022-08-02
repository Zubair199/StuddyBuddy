import * as React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import {useUserAuth} from '../navigation';
import genericStyle from '../assets/styles/styleSheet';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import MainLayout from './MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from 'react-native-elements';
import {Button} from 'native-base';
import {AUTH, AUTHENTICATIONS} from '../services/api.constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function SettingsScreen() {
  const {
    setUserToken,
    setUserName,
    setUserEmail,
    setUserType,
    userType,
    userToken,
  } = useUserAuth()!;
  const {currentScreen, setCurrentScreen} = React.useContext(ThemeContext);
  const handleLogout = () => {
    (async () => {
      await AsyncStorage.setItem('userId', '');
      await AsyncStorage.setItem('password', '');
      await AsyncStorage.setItem('email', '');
      await AsyncStorage.setItem('rememberMe', '');
      setUserName('');
      setUserEmail('');
      setUserToken('');
      setUserType('');
    })();
  };

  let isStudent = userType == 'user';
  let isTeacher = userType == 'teacher';

  const navigation = useNavigation();
  const appVersion = '1.0.0';
  const buildNumber = '1';
  const [policiesModal, setPoliciesModal] = React.useState(false);
  const [toggle, setToggle] = React.useState(true);
  const [toggleFaceID, setToggleFaceID] = React.useState(true);
  const [pushNotificationToggle, setPushNotificationToggle] =
    React.useState(true);
  const [timeZoneToggle, setTimeZoneToggle] = React.useState(false);
  const [selectedTimeZoneValue, setSelectedTimeZoneValue] =
    React.useState('SELECT TIMEZONE');
  const [allTimeZones, setAllTimeZones] = React.useState([
    {label: '', value: ''},
  ]);
  const [toggleProfilePrivacy, setProfilePrivacy] = React.useState(true);
  const [toggleChat, setToggleChat] = React.useState(true);
  const [secure, setSecure] = React.useState(true);
  // confirmation function
  function confirmationBox(
    title: string,
    message: string,
    continueFunc: Function,
  ) {
    // Works on both iOS and Android
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Yes',
          onPress: () => continueFunc(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let [user, setUser] = React.useState(userToken);

  let [tempUsername, setTempUsername] = React.useState('');
  let [tempEmail, setTempEmail] = React.useState('');

  let [username, setUsername] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [password, setPassword] = React.useState('');
  let [confirmpassword, setConfirmPassword] = React.useState('');

  let [usernameEditable, setUsernameEditable] = React.useState(false);
  let [emailEditable, setEmailEditable] = React.useState(false);
  let [passwordEditable, setPasswordEditable] = React.useState(false);

  function getData() {
    try {
      fetch(AUTHENTICATIONS.API_URL + AUTH.GET_USER_BY_ID + user)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);

          if (responseJson) {
            if (responseJson.user) {
              setUsername(responseJson.user.username);
              setEmail(responseJson.user.email);
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert(
            'Alert',
            'Something went wrong. Try again in few minutes.',
          );
        });
    } catch (exception) {
      console.log('exception ', exception);
      Alert.alert('Alert', 'Something went wrong. Try again in few minutes.');
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  function updateUsername() {
    const body = {
      username: tempUsername,
    };
    console.log(body);
    try {
      let requestObj = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(AUTHENTICATIONS.API_URL + AUTH.EDIT_USER + user, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setUsernameEditable(!usernameEditable);
          setTempUsername('');
          Alert.alert(responseJson.message);
          getData();
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
        });
    } catch (exception) {
      console.log('exception ', exception);
    }
  }

  function updateEmail() {
    const body = {
      email: tempEmail,
    };
    console.log(body);
    try {
      let requestObj = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(AUTHENTICATIONS.API_URL + AUTH.EDIT_USER + user, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setEmailEditable(!emailEditable);
          setTempUsername('');
          Alert.alert(responseJson.message);
          getData();
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
        });
    } catch (exception) {
      console.log('exception ', exception);
    }
  }
  function updatePassword() {
    if (password !== '' && confirmpassword !== '') {
      if (password === confirmpassword) {
        const body = {
          password: password,
        };
        console.log(body);
        try {
          let requestObj = {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          };
          fetch(AUTHENTICATIONS.API_URL + AUTH.EDIT_USER + user, requestObj)
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              setPassword('');
              setConfirmPassword('');
              setPasswordEditable(!passwordEditable);
              Alert.alert(responseJson.message);
              getData();
            })
            .catch((err: any) => {
              console.log(err);
              console.log(err.response);
            });
        } catch (exception) {
          console.log('exception ', exception);
        }
      } else {
        Alert.alert('Alert', 'Password and confrim password does not match.');
      }
    } else {
      Alert.alert('Alert', 'Password and confrim password cannot be empty.');
    }
  }
  function compenent() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{}}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity
              onPress={() =>
                confirmationBox('Logout', 'Do you want to logout?', () =>
                  handleLogout(),
                )
              }>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.accountHeading}>Personal Information</Text>
              <View style={styles.horizontalSeparator} />
              <View style={styles.groupBox}>
                <View style={styles.labelBox}>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.iconInputBox}>
                    {usernameEditable ? (
                      <TextInput
                        defaultValue={username}
                        editable={true}
                        onChangeText={text => {
                          setTempUsername(text);
                        }}
                      />
                    ) : (
                      <TextInput value={username} editable={false} />
                    )}
                  </View>
                </View>
                {usernameEditable ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        updateUsername();
                      }}>
                      <FontAwesome
                        name="check"
                        style={styles.check}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTempUsername('');
                        setUsernameEditable(!usernameEditable);
                      }}>
                      <FontAwesome
                        name="times"
                        style={styles.times}
                        size={20}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setUsernameEditable(!usernameEditable);
                    }}>
                    <Image
                      style={styles.pencilIcon}
                      source={require('../assets/images/icons/pencil.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.groupBox}>
                <View style={styles.labelBox}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.iconInputBox}>
                    {emailEditable ? (
                      <TextInput
                        defaultValue={email}
                        editable={true}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => {
                          setTempEmail(text);
                        }}
                      />
                    ) : (
                      <TextInput value={email} editable={false} />
                    )}
                  </View>
                </View>
                {emailEditable ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        updateEmail();
                      }}>
                      <FontAwesome
                        name="check"
                        style={styles.check}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTempEmail('');
                        setEmailEditable(!emailEditable);
                      }}>
                      <FontAwesome
                        name="times"
                        style={styles.times}
                        size={20}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setEmailEditable(!emailEditable);
                    }}>
                    <Image
                      style={styles.pencilIcon}
                      source={require('../assets/images/icons/pencil.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.groupBox}>
                <View style={styles.labelBox}>
                  <Text style={styles.label}>Password</Text>
                  {passwordEditable ? (
                    <View>
                      <View style={styles.iconInputBox}>
                        <TextInput
                          placeholder="New Password"
                          editable={true}
                          onChangeText={text => {
                            setPassword(text);
                          }}
                        />
                      </View>
                      <View style={styles.iconInputBox}>
                        <TextInput
                          placeholder="Re-Enter Password"
                          editable={true}
                          onChangeText={text => {
                            setConfirmPassword(text);
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <TextInput
                      secureTextEntry={secure}
                      value={'Password'}
                      editable={false}
                    />
                  )}
                </View>
                {passwordEditable ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        updatePassword();
                      }}>
                      <FontAwesome
                        name="check"
                        style={styles.check}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setPassword('');
                        setConfirmPassword('');
                        setPasswordEditable(!passwordEditable);
                      }}>
                      <FontAwesome
                        name="times"
                        style={styles.times}
                        size={20}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setPasswordEditable(!passwordEditable);
                    }}>
                    <Image
                      style={styles.pencilIcon}
                      source={require('../assets/images/icons/pencil.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View>
              <Text style={styles.accountHeading}>
                Credit/Debit Card Information
              </Text>
              <View style={styles.horizontalSeparator} />
              <View style={styles.groupBox}>
                <Button onPress={() => {}}>Add Card Information</Button>
              </View>
            </View>

            <View>
              <Text style={styles.accountHeading}>Privacy Settings</Text>
              <View style={styles.horizontalSeparator} />
              <View style={styles.groupBox}>
                <Text style={styles.label}>Push Notifications</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                {/* toggle button here */}

                {/* <Switch /> */}
                {/* <TouchableOpacity onPress={setNotification}>
              {pushNotificationToggle ? (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/toggle.png")}
                />
              ) : (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/Toggle-off.png")}
                />
              )}
            </TouchableOpacity> */}
              </View>
              {/* <View style={styles.groupBox}>
                <Text style={styles.label}>Face ID/Fingerprint</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                /> */}
              {/* <TouchableOpacity onPress={toggleFaceIdOption}>
              {toggleFaceID ? (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/toggle.png")}
                />
              ) : (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/Toggle-off.png")}
                />
              )}
            </TouchableOpacity> */}
              {/* </View> */}

              {/* <View style={styles.groupBox}>
              <Text style={styles.label}>Profile Privacy</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
              {/* toggle button for faceId options starts here */}
              {/* <Switch /> */}
              {/* <TouchableOpacity onPress={() => {
              {
                toggleProfilePrivacy ?
                  confirmationBox("Profile Privacy", "Are you sure you want to disable privacy option?", togglePrivacyOptionFunction)
                  :
                  confirmationBox("Profile Privacy", "Are you sure you want to enable privacy option?", togglePrivacyOptionFunction)
              }
            }}>
              {toggleProfilePrivacy ? (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/toggle.png")}
                />
              ) : (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/Toggle-off.png")}
                />
              )}
            </TouchableOpacity> */}
              {/* </View> */}
              {/* 
            <View style={styles.groupBox}>
            <Text style={styles.label}>Enable Chat</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
              {/* <TouchableOpacity onPress={() => {
              {
                toggleChat ?
                  confirmationBox("Disable Chat", "Are you sure you want to disable chat option for all users?", toggleChatOption)
                  :
                  confirmationBox("Enable Chat", "Are you sure you want to enable chat option for all users?", toggleChatOption)
              }
            }}>
              {toggleChat ? (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/toggle.png")}
                />
              ) : (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/Toggle-off.png")}
                />
              )}
            </TouchableOpacity> */}
              {/* </View> */}

              {/* <View style={styles.groupBox}>
            <Text style={styles.label}>Automatic Time Zone</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
              {/* toggle button here */}
              {/* <Switch /> */}
              {/* <TouchableOpacity onPress={setAutomaticNetworkProvidedTimeZone}>
              {timeZoneToggle ? (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/toggle.png")}
                />
              ) : (
                <Image
                  style={styles.toggleOn}
                  source={require("../assets/images/icons/Toggle-off.png")}
                />
              )}
            </TouchableOpacity> */}
              {/* </View> */}
              {/* Time zone dropdown starts here */}
              {/* <View style={styles.dropdownBoxWrapper}>
            {timeZoneToggle ?
              <Text style={styles.timeZoneText}>{selectedTimeZoneValue}</Text>
              :
              <RNPickerSelect
                value={selectedTimeZoneValue}
                placeholder={{
                  label: selectedTimeZoneValue,
                  value: null,
                }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => {
                  setSelectedTimeZoneValue(value)
                  setTimeZone(value);
                }}
                items={allTimeZones}
                Icon={() => {
                  return <FontAwesome name="caret-down" size={16} style={styles.dropDownPickerBtnIcon} />;
                }}
                InputAccessoryView={() => null}
              />}
          </View> */}
            </View>

            <View style={styles.horizontalSeparator} />
            <View style={{marginTop: 30, backgroundColor: 'transparent'}}>
              <View>
                {/* You can read DeepMove's &nbsp; */}
                <Text style={{textAlign: 'center'}}>
                  <Text
                    onPress={() => Linking.openURL('https://www.google.com/')}
                    style={{
                      textDecorationLine: 'underline',
                      fontFamily: 'roboto-bold',
                    }}>
                    Terms &amp; Conditions
                  </Text>
                  &nbsp;and&nbsp;
                  <Text
                    onPress={() => Linking.openURL('https://www.google.com/')}
                    style={{
                      textDecorationLine: 'underline',
                      fontFamily: 'roboto-bold',
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
                <Text style={{textAlign: 'center', marginTop: 5}}>
                  {/* Test Version {Platform.OS=='android'? appJson.expo.android.versionName : appJson.expo.ios.buildNumber}
                {'\n'} */}
                  {'StudyBuddy Version ' +
                    appVersion +
                    ' (' +
                    buildNumber +
                    ')'}
                </Text>
                {/* &nbsp; here. */}
              </View>
            </View>
            <View style={styles.deleteBox}>
              <TouchableOpacity
              // onPress={() =>
              //   confirmationBox(
              //     "Delete Account",
              //     "Do you want to delete your account?",
              //     () => handleDelete()
              //   )
              // }
              >
                <Text style={styles.delete}>Delete my account</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.delete}>Share App</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  return <MainLayout Component={compenent()} />;
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    marginTop: 80,
    alignSelf: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    padding: 15,
  },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'roboto-light',
    marginTop: 10,
  },

  dropdownBoxWrapper: {
    marginTop: 15,
    width: '100%',
    height: 38,
    borderColor: '#4B5F79',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 4,
    zIndex: 10,
  },

  horizontalSeparator: {
    marginTop: 20,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  logout: {
    fontSize: 16,
    color: '#4B5F79',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 30,
  },

  accountHeading: {
    fontSize: 20,
    marginTop: 20,
    textTransform: 'uppercase',
  },

  groupBox: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  iconInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  disableInput: {
    width: '100%',
    fontFamily: 'roboto-light',
    fontSize: 15,
  },

  enableInput: {
    width: '70%',
    height: 50,
    borderRadius: 5,
    borderColor: '#949599',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 8,
    fontFamily: 'roboto-light',
    fontSize: 15,
  },

  times: {
    color: '#FF6565',
  },

  check: {
    color: '#01C75D',
  },

  labelBox: {
    width: '90%',
  },

  label: {
    fontSize: 15,
    fontFamily: 'roboto-regular',
  },

  inputField: {},

  pencilIcon: {
    height: 20,
    width: 20,
  },

  toggleOn: {
    // color: "#4B5F79",
    width: 41,
    height: 27,
  },
  toggleOff: {
    color: '#4B5F79',
  },

  deleteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25,
    marginTop: 29,
  },
  delete: {
    fontSize: 16,
    color: '#4B5F79',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dropDownPickerBtnIcon: {
    right: 10,
    top: 10,
    position: 'absolute',
  },
  timeZoneText: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#4B5F79',
    fontFamily: 'roboto-light',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: '#4B5F79',
    paddingRight: 10,
    fontFamily: 'roboto-light',
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    color: '#4B5F79',
    paddingRight: 10,
    fontFamily: 'roboto-light',
  },
  placeholder: {
    color: '#000000',
  },
});
