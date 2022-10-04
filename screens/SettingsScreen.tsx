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
  Modal,
} from 'react-native';
import { useUserAuth } from '../navigation';
import genericStyle from '../assets/styles/styleSheet';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MainLayout from './MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from 'react-native-elements';
import { Button, Input } from 'native-base';
import { AUTH, AUTHENTICATIONS, STRIPE } from '../services/api.constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import { app } from '../constants/themeColors';

export default function SettingsScreen() {
  const {
    setUserToken,
    setUserName,
    setUserEmail,
    setUserType,
    userType,
    userToken,
  } = useUserAuth()!;
  const { currentScreen, setCurrentScreen } = React.useContext(ThemeContext);
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
    { label: '', value: '' },
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
      { cancelable: false },
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

  let [cardEditable, setCardEditable] = React.useState(false);

  let [cardNumber, setCardNumber] = React.useState('');
  let [expiryMonth, setExpiryMonth] = React.useState('');
  let [cvc, setCVC] = React.useState('');

  let [cardInfo, setCardInfo] = React.useState(null);

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
      fetch(AUTHENTICATIONS.API_URL + STRIPE.CARD_DETAILS + user)
        .then(response => response.json())
        .then(responseJson => {
          console.log('card details => ', responseJson);
          setCardInfo(responseJson.data);
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
  const [isModal, setIsModal] = React.useState(false);
  function toggleModal() {
    console.log('modal');
    setIsModal(!isModal);
  }

  function submitCard() {
    let obj = {
      user: user,
      expiryMonth: expiryMonth,
      cvc: cvc,
      cardNumber: cardNumber,
    };
    console.log(obj);
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      };

      fetch(AUTHENTICATIONS.API_URL + STRIPE.CREATE_CARD, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert('Alert', responseJson.message);
          setCardNumber('');
          setCVC('');
          setExpiryMonth('');
          getData();
          toggleModal();
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert('Alert', 'Something went wrong.');
        });
    } catch (exception) {
      console.log('exception ', exception);
      Alert.alert('Alert', 'Something went wrong.');
    }
  }

  function updateCard(id) {
    let obj = {
      user: user,
      expiryMonth: expiryMonth,
      cvc: cvc,
      cardNumber: cardNumber,
    };
    console.log(obj);
    try {
      let requestObj = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      };

      fetch(AUTHENTICATIONS.API_URL + STRIPE.UPDATE_CARD + id, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert('Alert', responseJson.message);
          setCardNumber('');
          setCVC('');
          setExpiryMonth('');
          getData();
          setCardEditable(!cardEditable);
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert('Alert', 'Something went wrong.');
        });
    } catch (exception) {
      console.log('exception ', exception);
      Alert.alert('Alert', 'Something went wrong.');
    }
  }
  function handleCardNumber(text) {
    console.log(text);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        visible={isModal}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}>
              <Icon name="close" size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 15,
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>Add Card Details</Text>
          </View>
          <View>
            <Input
              variant="outline"
              placeholder="Card Number"
              maxLength={16}
              onChangeText={text => setCardNumber(text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <Input
              variant="outline"
              placeholder="MM/YY"
              w={'48%'}
              onChangeText={text => setExpiryMonth(text)}
              maxLength={5}
            />
            <Input
              variant="outline"
              placeholder="CVC"
              w={'48%'}
              maxLength={3}
              onChangeText={text => setCVC(text)}
            />
          </View>
          <View>
            <Button onPress={() => submitCard()}>Submit</Button>
          </View>
        </View>
      </Modal>
      <View style={{}}>
        <ScrollView style={styles.scrollView}>

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
          {
            userType.toLowerCase() === 'teacher' &&
            <View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.accountHeading}>Card Information</Text>
                <View style={{ marginTop: 25 }}>
                  {cardInfo !== null && cardEditable ? (
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                          updateCard(cardInfo._id);
                        }}>
                        <FontAwesome
                          name="check"
                          style={styles.check}
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setCardEditable(!cardEditable);
                        }}>
                        <FontAwesome
                          name="times"
                          style={styles.times}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setCardEditable(!cardEditable);
                      }}>
                      <Image
                        style={styles.pencilIcon}
                        source={require('../assets/images/icons/pencil.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.horizontalSeparator} />
              {cardInfo !== null ? (
                <>
                  <View style={styles.groupBox}>
                    <View style={styles.labelBox}>
                      <Text style={styles.label}>Card Number</Text>
                      <View style={styles.iconInputBox}>
                        {cardEditable ? (
                          <TextInput
                            defaultValue={cardInfo.cardNumber}
                            editable={true}
                            maxLength={16}
                            placeholder={'Card Number'}
                            onChangeText={text => {
                              setCardNumber(text);
                            }}
                          />
                        ) : (
                          <TextInput
                            value={cardInfo.cardNumber}
                            editable={false}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.groupBox}>
                    <View style={styles.labelBox}>
                      <Text style={styles.label}>Expiry Month</Text>
                      <View style={styles.iconInputBox}>
                        {cardEditable ? (
                          <TextInput
                            defaultValue={cardInfo.expiryMonth}
                            editable={true}
                            maxLength={5}
                            placeholder={'MM/YY'}
                            onChangeText={text => {
                              setExpiryMonth(text);
                            }}
                          />
                        ) : (
                          <TextInput
                            value={cardInfo.expiryMonth}
                            editable={false}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.groupBox}>
                    <View style={styles.labelBox}>
                      <Text style={styles.label}>CVC</Text>
                      <View style={styles.iconInputBox}>
                        {cardEditable ? (
                          <TextInput
                            defaultValue={cardInfo.cvc}
                            editable={true}
                            maxLength={3}
                            placeholder={'CVC'}
                            onChangeText={text => {
                              setCVC(text);
                            }}
                          />
                        ) : (
                          <TextInput value={cardInfo.cvc} editable={false} />
                        )}
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.groupBox}>
                  <Button
                    style={{ backgroundColor: app.lightBlue }}
                    onPress={() => {
                      toggleModal();
                    }}>
                    Add Card Information
                  </Button>
                </View>
              )}
            </View>
          }
          <View>
            <Text style={styles.accountHeading}>Privacy Settings</Text>
            <View style={styles.horizontalSeparator} />
            <View style={styles.groupBox}>
              <Text style={styles.label}>Push Notifications</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
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
          <View style={{ marginTop: 30, backgroundColor: 'transparent' }}>
            <View>
              {/* You can read DeepMove's &nbsp; */}
              <Text style={{ textAlign: 'center' }}>
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
              <Text style={{ textAlign: 'center', marginTop: 5 }}>
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

          <View style={{ marginBottom: 50 }}>
            <TouchableOpacity
              style={[
                genericStyle.loginBtn,
              ]}
              onPress={() =>
                confirmationBox('Logout', 'Do you want to logout?', () =>
                  handleLogout(),
                )
              }>
              <Text style={[genericStyle.loginBtnText, { color: '#ffffff' }]}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
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
