import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  View,
  Text,
} from 'react-native';

import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  isValidEmail,
  isValidPassword,
  isValidUserName,
} from '../utils/HelperFunctions';
import api from '../constants/api';
import genericStyle from '../assets/styles/styleSheet';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {AUTH, AUTHENTICATIONS} from '../services/api.constants';
import {Radio} from 'native-base';

/**
 * Accounts create
 * @returns
 */
export default function AccountCreateScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Teacher',
      value: '0',
    },
    {
      id: '2',
      label: 'Student',
      value: '1',
    },
  ];

  const [radioButtons, setRadioButtons] = React.useState(radioButtonsData);
  const [role, setRole] = React.useState('0');

  function onPressRadioButton(radioButtonsArray) {
    setRole(radioButtonsArray);
    console.log(radioButtonsArray);
  }

  function handleBack() {
    navigation.navigate('Login');
  }

  const onPressNextBtn = () => {
    if (fullName.trim().length == 0) {
      Alert.alert('Alert', 'Enter full name');
      return;
    } else if (!isValidUserName(fullName)) {
      Alert.alert(
        'Alert',
        'Full Name cannot start or end with a space and cannot have numbers',
      );
      return;
    } else if (email.trim().length == 0) {
      Alert.alert('Alert', 'Enter email');
      return;
    } else if (!isValidEmail(email)) {
      Alert.alert('Alert', 'Enter valid email');
      return;
    } else if (password.trim().length == 0) {
      Alert.alert('Alert', 'Enter password');
      return;
    } else if (!isValidPassword(password)) {
      Alert.alert(
        'Alert',
        'Password must contain Capital letters, Lowercase letters, numbers and special characters and must be 8 characters long',
      );
      return;
    } else if (confirmPassword.trim().length == 0) {
      Alert.alert('Alert', 'Enter confirm password');
      return;
    } else if (
      confirmPassword.trim().toLowerCase() != password.trim().toLowerCase()
    ) {
      Alert.alert('Alert', 'Password not match with confirm password');
      return;
    }

    setShowSpinner(true);

    let signUpRequest = JSON.stringify({
      username: fullName,
      email: email,
      password: password,
      role: role,
    });

    //   api.collaboratorSignUp(signUpRequest).then(signUpResponse => {
    //     if (!signUpResponse.error && signUpResponse.success) {
    //       setShowSpinner(false);
    //       navigation.navigate('AccountVerify', {
    //         fullName: fullName,
    //         email: email,
    //         password: password,
    //       });
    //     } else {
    //       let messageText = '';
    //       if (signUpResponse.message) {
    //         messageText = signUpResponse.message;
    //       } else if (signUpResponse.errors && signUpResponse.errors.message) {
    //         messageText = signUpResponse.errors.message;
    //       }
    //       Alert.alert('Alert', messageText);
    //       setShowSpinner(false);
    //     }
    //   });
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: signUpRequest,
      };
      fetch(AUTHENTICATIONS.API_URL + AUTH.SIGNUP, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setShowSpinner(false);
          Alert.alert('Alert', responseJson.message);
          navigation.navigate('AccountVerify', {email: email});
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View
            style={{
              marginTop: 8,
              height: 60,
            }}>
            {/* <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
              containerStyle={{ justifyContent: "space-around" }}
            /> */}
            <Radio.Group
              name="myRadioGroup"
              value={role}
              onChange={nextValue => {
                console.log(nextValue);
                setRole(nextValue);
              }}>
              <Radio value="1" my="1">
                Student
              </Radio>
              <Radio value="0" my="1">
                Teacher
              </Radio>
            </Radio.Group>
          </View>
          <View
            style={{
              marginTop: 8,
              height: 50,
            }}>
            <TextInput
              style={genericStyle.textBox}
              autoCapitalize="words"
              placeholder="Full Name"
              placeholderTextColor="#3878ee"
              onChangeText={text => setFullName(text)}
              maxLength={40}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              height: 50,
            }}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              style={genericStyle.textBox}
              placeholder="Email"
              placeholderTextColor="#3878ee"
              onChangeText={text => setEmail(text)}
              maxLength={40}
            />
          </View>
          <View style={styles.passwordSection}>
            <TextInput
              style={styles.passwordInputBox}
              secureTextEntry={secure}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#3878ee"
              onChangeText={text => setPassword(text)}
              maxLength={40}
            />
          </View>
          <View style={styles.passwordSection}>
            <TextInput
              style={styles.passwordInputBox}
              secureTextEntry={confirmSecure}
              autoCapitalize="none"
              placeholder="Confirm password"
              placeholderTextColor="#3878ee"
              onChangeText={text => setConfirmPassword(text)}
              maxLength={40}
            />
          </View>

          <TouchableOpacity
            onPress={onPressNextBtn}
            style={[genericStyle.loginBtn, {marginTop: 55}]}>
            <Text style={genericStyle.loginBtnText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.goBackView}>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.goBackText}>Go back</Text>
              <View style={genericStyle.underline}></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    // paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
  },
  spinner: {
    position: 'absolute',
    marginTop: 80,
    alignSelf: 'center',
  },
  goBackView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  goBackText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#3878ee',
  },
  title: {
    fontSize: 20,
    textTransform: 'capitalize',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },

  titleIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  backIconIPhone: {
    marginTop: 11,
    marginRight: 10,
    height: 17,
    width: 10,
  },
  backIcon: {
    marginTop: 14,
    marginRight: 10,
    height: 17,
    width: 10,
  },

  form: {
    marginTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
  },
  radioBtnContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },
  radioBtnText: {
    fontSize: 18,
    marginTop: 5,
  },
  nextBtn: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    height: 55,
    marginTop: 30,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderColor: 'white',
  },
  nextBtnText: {
    textAlign: 'center',
    color: '#3878ee',
    width: '100%',
    fontSize: 18,
  },
  progressButtonTextStyle: {
    color: '#3878ee',
  },
  textBox: {
    height: '100%',
    width: '100%',
    borderColor: '#3878ee',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 4,
    fontFamily: 'System',
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    flex: 1,
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
