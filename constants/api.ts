import {Alert} from 'react-native';
import CONSTANTS from '../constants/common';
import {logError} from '../utils/HelperFunctions';

const BASE_URL = CONSTANTS.VALUES.BASE_SERVER_URL;

let api = {
  // login api-->
  userLogin: async (data: string) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data,
    };
    return fetch(BASE_URL + '/login', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description = 'name: userLogin, api: /login, method::POST';
          logError(description, error, 'Login');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description = 'name: userLogin, api: /login, method::POST';
        logError(description, error, 'Login');
        console.log('error=', error);
      });
  },

  //get self profile information-->
  getProfile: function () {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return fetch(BASE_URL + '/getself', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description = 'name: getProfile, api: /getself, method::GET';
          logError(description, error, 'My Profile');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description = 'name: getProfile, api: /getself, method::GET';
        logError(description, error, 'My Profile');
      });
  },

  // update profile skills, name, bio, social networks etc
  updateProfile: function (data: string) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    };
    return fetch(BASE_URL + '/updateprofile', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description =
            'name: updateProfile, api: /profile/updateprofile, method::PUT';
          logError(description, error, 'My Profile');
          return response.json();
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description =
          'name: updateProfile, api: /profile/updateprofile, method::PUT';
        logError(description, error, 'My Profile');
        console.log('error=', error);
      });
  },

  //account verify api-->
  verifyAccount: function (data: string) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data,
    };
    return fetch(BASE_URL + '/verifyemail', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description =
            'name: verifyAccount, api: /verifyemail, method::POST';
          logError(description, error, 'Account Verification Screen');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description =
          'name: verifyAccount, api: /verifyemail, method::POST';
        logError(description, error, 'Account Verification Screen');
        console.log('error=', error);
      });
  },

  // api for saving error logs on db-->
  errorLogging: function (data: string) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    };
    return fetch(BASE_URL + '/frontenderrorlog', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          console.log(error);
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {});
  },

  //api for teacher signup below
  collaboratorSignUp: function (data: string) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data,
    };
    return fetch(BASE_URL + '/collaboratorsignup', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description =
            'name: collaboratorsignup, api: /collaboratorsignup, method::POST';
          logError(description, error, 'Create Account');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description =
          'name: teacherSignup, api: /userroutes/teacherSignup, method::POST';
        logError(description, error, 'Create Account');
        console.log('error=', error);
      });
  },
  // log out api
  userLogout: function (data: string) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data,
    };
    return fetch(BASE_URL + '/logout', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description = 'name: userLogout, api: /logout, method::POST';
          logError(description, error, 'settings');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description = 'name: userLogout, api: /logout, method::POST';
        logError(description, error, 'settings');
        console.log('error', error);
      });
  },
  // get site content api:  skills
  getSkills: function () {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return fetch(
      BASE_URL + '/sitecontents/getsitecontents?contentType=skills',
      requestOptions,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description =
            'name: getSkills, api: /sitecontents/getsitecontents?contentType=skills, method::GET';
          logError(description, error, 'My Profile, Add/Edit Profile');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description =
          'name: getSkills, api: /sitecontents/getsitecontents?contentType=skills, method::GET';
        logError(description, error, 'My Profile, Add/Edit Profile');
      });
  },

  // Get site content API : Get multiple things
  getSiteContents: function (content: string) {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    return fetch(
      BASE_URL + '/sitecontents/getsitecontents?contentTypes=' + content,
      requestOptions,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          let description =
            'name: getSkills, api: /sitecontents/getsitecontents?contentType=content, method::GET';
          logError(description, error, 'My Profile, Add/Edit Class');
        }
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        let description =
          'name: getSkills, api: /sitecontents/getsitecontents?contentType=content, method::GET';
        logError(description, error, 'My Profile, Add/Edit Class');
      });
  },
};

export default api;
