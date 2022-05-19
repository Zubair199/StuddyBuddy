// import AsyncStorage from "@react-native-community/async-storage";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import api from '../constants/api';

/**
 * Determines whether valid email is
 * @param email
 * @returns true/false
 */

// function that capitilizes first letter
export function capitalizes(str: string) {
  return str.charAt(0).toUpperCase() + str.substr(1, str.length - 1);
}
export function lowercase(str: string) {
  return str.charAt(0).toLowerCase() + str.substr(1, str.length - 1);
}
// Function to validate email syntax
export function isValidEmail(email: string) {
  if (email.length == 0) {
    return false;
  }
  const reg =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email)) {
    return true;
  }
  return false;
}

export function isValidURL(url: string) {
  // const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  const reg =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  if (reg.test(url)) {
    return true;
  }
  return false;
}

export function isValidPassword(password: string) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (reg.test(password)) {
    return true;
  }
  return false;
}

// Function for validating password syntax
export function isValidUserName(name: string) {
  const reg = /^[^0-9 ]+( [^0-9]+)*$/;
  if (reg.test(name)) {
    return true;
  }
  return false;
}

// sending error logs to server
export function logError(
  description: string,
  error: Error,
  screen?: string,
  userId?: string,
) {
  try {
    const {serializeError, deserializeError} = require('serialize-error');
    let errorSerialized = JSON.stringify(serializeError(error));
    let errorDetail = {
      error: errorSerialized,
      screenName: screen,
      description: description,
      userId: userId,
    };
    const requestData = JSON.stringify(errorDetail);

    api.errorLogging(requestData).then(res => {
      if (res) {
        if (res.message !== undefined) console.log(res.message);
      } else {
        console.log('Failed: Error Logged Detail');
      }
    });
  } catch (error) {}
}

// check internet connectivity uses expo package
export async function checkNetwork() {
  // unsubscribe();
  const netInfo = useNetInfo();
}

const unsubscribe = NetInfo.addEventListener(state => {
  // console.log("Connection sstype", state.type);
  // console.log("Is connected?", state.isConnected);
});
