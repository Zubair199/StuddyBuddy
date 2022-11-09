import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Text,
  View,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import api from '../constants/api';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { logError } from '../utils/HelperFunctions';
import genericStyle from '../assets/styles/styleSheet';
import { AUTH, AUTHENTICATIONS, GENERAL } from '../services/api.constants';
import { app } from '../constants/themeColors';

const CELL_COUNT = 6;
export default function AccountVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams: any = route.params;
  const [showSpinner, setShowSpinner] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [allSkills, setAllSkills] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  React.useEffect(() => {
    try {
      fetch(AUTHENTICATIONS.API_URL + GENERAL.SITE_CONTENTS)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setAllSkills(responseJson.skills)
          setAllLocations(responseJson.locations)
          setAllSubjects(responseJson.subjects)
        })
        .catch((err: any) => {
          console.log(err)
          console.log(err.response)
          Alert.alert('Alert', "Registration Failed. Try Again!");
          setShowSpinner(false);
        })
    }
    catch (exception) {
      console.log('exception ', exception)
      Alert.alert('Alert', "Registration Failed. Try Again!");
      setShowSpinner(false);
    }
  }, [])

  const onPressVerifyBtn = () => {
    if (value.trim().length == 0) {
      Alert.alert('Alert', 'Enter verification code');
      return;
    } else if (value.trim().length < 6) {
      Alert.alert('Alert', 'Incomplete verification code');
      return;
    }

    let verifyRequest = JSON.stringify({
      email: routeParams.email,
      verificationToken: value,
    });


    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: verifyRequest
      }
      fetch(AUTHENTICATIONS.API_URL + AUTH.VERIFY, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson && responseJson.isActive) {
            setShowSpinner(false);
            Alert.alert('Alert', responseJson.message);

            navigation.navigate("ProfileSetup", {
              email: routeParams.email,
              allSkills: allSkills,
              allSubjects: allSubjects,
              allLocations: allLocations,
              skills: [],
              subjects: [],
              locations: [],
            });

          }
          else {
            Alert.alert('Alert', responseJson.message);

          }
        })
        .catch((err: any) => {
          console.log(err)
          console.log(err.response)
          Alert.alert('Alert', "Something went wrong. Try Again!");
          setShowSpinner(false);
        })
    }
    catch (exception) {
      console.log('exception ', exception)
      Alert.alert('Alert', "Something went wrong. Try Again!");
      setShowSpinner(false);
    }
  };

  function handleBack() {
    navigation.navigate('Login');
  }

  React.useEffect(() => {
    console.log(routeParams.email)
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.body}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <TouchableOpacity
            onPress={onPressVerifyBtn}
            style={[genericStyle.loginBtn, { marginTop: 55 }]}>
            <Text style={genericStyle.loginBtnText}>VERIFY</Text>
          </TouchableOpacity>

          {/* <View style={styles.goBackView}>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.goBackText}>Go back</Text>
              <View style={genericStyle.underline}></View>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
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
  body: {
    marginTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
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
  scrollView: {
    // backgroundColor: "transparent",
    justifyContent: 'center',
    paddingHorizontal: 45,
  },
  spinner: {
    position: 'absolute',
    marginTop: 80,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 25,
    textAlign: 'center',
    color: '#3878ee',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 55,
    color: 'grey',
  },
  yesBtn: {
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
  verifyBtnText: {
    textAlign: 'center',
    color: '#3878ee',
    width: '100%',
    fontSize: 18,
  },
  textBox: {
    height: 50,
    width: '100%',
    borderColor: '#4B5F79',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
  },
  verificationCodeBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  verificationCodeLebel: {
    fontSize: 16,
    marginEnd: 30,
    marginVertical: 10,
  },
  verificationCodeInput: {
    height: 50,
    width: '100%',
    borderColor: '#4B5F79',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 4,
    fontFamily: 'System',
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 43,
    height: 43,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: app.lightBlue,
    backgroundColor: '#ffffff',
    textAlign: 'center',

  },
  focusCell: {
    borderColor: '#ffffff',
  },
});
