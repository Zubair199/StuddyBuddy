import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Share,
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Modal,
  Platform,
} from 'react-native';
import {Avatar, BottomSheet, CheckBox} from 'react-native-elements';
import api from '../constants/api';
import {EditProfileParamList} from '../types';
import {AuthContext} from '../utils/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import genericStyle from '../assets/styles/styleSheet';
import {AUTH, AUTHENTICATIONS} from '../services/api.constants';
import * as ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

interface IPROPS {
  email: String;
}
interface dataTypes {
  skillsType: any;
}

const useUserAuth = () => React.useContext(AuthContext);

export default function ProfileSetupScreen(props: IPROPS, dataType: dataTypes) {
  const route = useRoute<RouteProp<EditProfileParamList, 'EditProfileModal'>>();

  const [email, setEmail] = useState(route.params.email);
  const [fullName, setFullName] = useState('');
  const [pastExperience, setPastExperience] = useState('');

  const [genres, setGenres] = useState(route.params.subjects);
  const [genreModal, setGenreModal] = useState(false);
  const [queryGenre, setQueryGenre] = React.useState(route.params.allSubjects);
  const [allGenres, setAllGenres] = React.useState(route.params.allSubjects);

  const [skills, setSkills] = useState(route.params.skills);
  const [skillsModal, setSkillsModal] = useState(false);
  const [query, setQuery] = React.useState(route.params.allSkills);
  const [allSkills, setAllSkills] = React.useState(route.params.allSkills);

  const [locations, setLocations] = useState(route.params.locations);
  const [locationsModal, setLocationsModal] = useState(false);
  const [queryLocations, setQueryLocation] = React.useState(
    route.params.allLocations,
  );
  const [allLocations, setAllLocations] = React.useState(
    route.params.allLocations,
  );

  const {setUserToken, setUserName, setUserEmail, setGuestView, userToken} =
    useUserAuth()!;

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Login');
  };

  const [user, setUser] = useState('');

  const [videoResponse, setVideoResponse] = useState(null);

  React.useEffect(() => {
    try {
      fetch(
        AUTHENTICATIONS.API_URL + AUTH.GET_USER_BY_EMAIL + route.params.email,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          setUser(responseJson.user);
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
  }, []);
  const selectVideo = async () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'video', includeBase64: true},
      response => {
        console.log(response);
        if (response.didCancel) {
          Alert.alert('Alert', 'No Video Selected!');
        }
        if (!response.didCancel) {
          console.log(response.assets[0]);
          setVideoResponse(response.assets[0]);
        }
      },
    );
  };
  const onPressNextBtn = () => {
    if (!email && fullName.trim().length == 0) {
      Alert.alert('Alert', 'Full name cannot be empty!');
      return;
    } else if (pastExperience.trim().length == 0) {
      Alert.alert('Alert', 'Past experience & client cannot be empty!');
      return;
    } else if (locations.length < 1) {
      Alert.alert('Alert', 'Location cannot be empty!');
      return;
    } else if (genres.length < 1) {
      Alert.alert('Alert', 'Subject cannot be empty!');
      return;
    } else if (skills.length < 1) {
      Alert.alert('Alert', 'Skill cannot be empty!');
      return;
    } else if (videoResponse === null) {
      Alert.alert('Alert', 'Video cannot be empty!');
      return;
    }

    let profileUpdateRequest: any = JSON.stringify({
      user: user,
      certifications: 'N/A',
      skills: skills,
      subjects: genres,
      locations: locations,
      pastExperience: pastExperience,
    });

    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: profileUpdateRequest,
      };

      fetch(AUTHENTICATIONS.API_URL + AUTH.PROFILE, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          // let res = responseJson;
          // if (res !== null) {
          //   RNFetchBlob.fetch(
          //     'PUT',
          //     AUTHENTICATIONS.API_URL +
          //       AUTH.PROFILE_VIDEO +
          //       user +
          //       '/' +
          //       responseJson.data._id,
          //     {'Content-Type': 'multipart/form-data'},
          //     [
          //       {
          //         name: 'video',
          //         filename:
          //           videoResponse.fileName +
          //           '.' +
          //           videoResponse.type.split('/')[1],
          //         type: 'video/mp4',
          //         data: RNFetchBlob.wrap(videoResponse.uri),
          //       },
          //     ],
          //   )
          //     .then(response => response.json())
          //     .then(responseJ => {
          //       if (res.data.status.toLowerCase() == 'pending') {
          //         navigation.navigate('Login');
          //         Alert.alert(          // let res = responseJson;
          // if (res !== null) {
          //   RNFetchBlob.fetch(
          //     'PUT',
          //     AUTHENTICATIONS.API_URL +
          //       AUTH.PROFILE_VIDEO +
          //       user +
          //       '/' +
          //       responseJson.data._id,
          //     {'Content-Type': 'multipart/form-data'},
          //     [
          //       {
          //         name: 'video',
          //         filename:
          //           videoResponse.fileName +
          //           '.' +
          //           videoResponse.type.split('/')[1],
          //         type: 'video/mp4',
          //         data: RNFetchBlob.wrap(videoResponse.uri),
          //       },
          //     ],
          //   )
          //     .then(response => response.json())
          //     .then(responseJ => {
          //       if (res.data.status.toLowerCase() == 'pending') {
          //         navigation.navigate('Login');
          //         Alert.alert(
          //           'Success',
          //           'Your account is created and sent for admin approval. Once approved you can login!',
          //         );
          //       }
          //     })
          //     .catch((err: any) => {
          //       console.log(err);
          //       console.log(err.response);
          //       Alert.alert('Alert', 'Registration Failed. Try Again!');
          //     })
          //           'Success',
          //           'Your account is created and sent for admin approval. Once approved you can login!',
          //         );
          //       }
          //     })
          //     .catch((err: any) => {
          //       console.log(err);
          //       console.log(err.response);
          //       Alert.alert('Alert', 'Registration Failed. Try Again!');
          //     });
          // }
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert('Alert', 'Registration Failed. Try Again!');
        });
    } catch (exception) {
      console.log('exception ', exception);
      Alert.alert('Alert', 'Registration Failed. Try Again!');
    }
    // api.updateProfile(profileUpdateRequest).then((profileResponse: any) => {
    //   if (profileResponse) {
    //     if (profileResponse.success) {
    //       if (profileResponse.status == 'pending') {
    //         navigation.navigate('Login');
    //         Alert.alert(
    //           'Success',
    //           'Your account is created and sent for admin approval. Once approved you can login!',
    //         );
    //       } else if (profileResponse.status == 'approved') {
    //         let loginRequest: any = JSON.stringify({
    //           email: email,
    //           password: route.params.password,
    //           notificationToken: '',
    //           os: Platform.OS,
    //         });

    //         api.userLogin(loginRequest).then((loginResponse: any) => {
    //           if (loginResponse) {
    //             if (loginResponse.success) {
    //               if (
    //                 loginResponse.profile.emailVerified &&
    //                 loginResponse.profile.profileCreated
    //               ) {
    //                 if (
    //                   !loginResponse.profile.isBanned &&
    //                   !loginResponse.profile.isAdmin
    //                 ) {
    //                   (async () => {
    //                     await AsyncStorage.setItem(
    //                       'userId',
    //                       loginResponse.profile._id,
    //                     );
    //                     await AsyncStorage.setItem(
    //                       'password',
    //                       route.params.password,
    //                     );
    //                     await AsyncStorage.setItem(
    //                       'email',
    //                       loginResponse.profile.email,
    //                     );
    //                   })();
    //                   setUserName(loginResponse.profile.fullName);
    //                   setUserEmail(loginResponse.profile.email);
    //                   setUserToken(loginResponse.profile._id);
    //                 } else {
    //                   Alert.alert(
    //                     'Alert',
    //                     'Sorry, You not allowed to access system!',
    //                   );
    //                 }
    //               }
    //             }
    //           }
    //         });
    //       }
    //     } else {
    //       let messagetext = '';
    //       if (profileResponse.message) {
    //         messagetext = profileResponse.message;
    //       } else if (profileResponse.errors && profileResponse.errors.message) {
    //         messagetext = profileResponse.errors.message;
    //       }
    //       Alert.alert('Alert', messagetext);
    //     }
    //   }
    // });
  };

  /**
   * send feed details to server
   */
  const uploadVideo = async () => {};

  function searchLocation(text: string) {
    var result: any = [];
    if (text === '') {
      result = allLocations;
    } else {
      for (let i = 0; i < allLocations.length; i++) {
        if (
          allLocations[i].title.toLowerCase().indexOf(text.toLowerCase()) > -1
        ) {
          result.push(allLocations[i]);
        }
      }
    }
    setQueryLocation(result);
    result = [];
  }

  function addRemoveLocation(text: string) {
    var itemExist = false;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i] === text) {
        itemExist = true;
      }
    }
    if (!itemExist) {
      setLocations([...locations, text]);
    } else {
      removeLocation(text);
    }
  }

  function toggleLocation(text: string) {
    var itemExist = false;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i] === text) {
        itemExist = true;
      }
    }
    return itemExist;
  }

  //remove location
  function removeLocation(text: string) {
    setLocations(locations.filter((item: any) => item !== text));
  }

  //cancel location
  function cancelLocation() {
    setLocations(route.params.locations);
    setLocationsModal(false);
    setQueryLocation(route.params.allLocations);
  }

  function saveLocation() {
    if (route.params.locations == locations) {
      cancelLocation();
      return;
    }
    setLocationsModal(false);
    setQueryLocation(route.params.allLocations);
  }
  function searchGenre(text: string) {
    var result: any = [];
    if (text === '') {
      result = allGenres;
    } else {
      for (let i = 0; i < allGenres.length; i++) {
        if (allGenres[i].title.toLowerCase().indexOf(text.toLowerCase()) > -1) {
          result.push(allGenres[i]);
        }
      }
    }
    setQueryGenre(result);
    result = [];
  }
  function addRemoveGenre(text: string) {
    var itemExist = false;
    for (let i = 0; i < genres.length; i++) {
      if (genres[i] === text) {
        itemExist = true;
      }
    }

    if (!itemExist) {
      setGenres([...genres, text]);
    } else {
      removeGenre(text);
    }
  }

  function toggleGenre(text: string) {
    var itemExist = false;
    for (let i = 0; i < genres.length; i++) {
      if (genres[i] === text) {
        itemExist = true;
      }
    }
    return itemExist;
  }

  function removeGenre(text: string) {
    setGenres(genres.filter((item: any) => item !== text));
  }

  function cancelGenre() {
    setGenres(route.params.skills);
    setGenreModal(false);
    setQueryGenre(route.params.allSubjects);
  }
  function saveGenre() {
    if (route.params.genres == genres) {
      cancelGenre();
      return;
    }
    setGenreModal(false);
    setQueryGenre(route.params.allSubjects);
  }
  function searchSkill(text: string) {
    var result: any = [];
    if (text === '') {
      result = allSkills;
    } else {
      for (let i = 0; i < allSkills.length; i++) {
        if (allSkills[i].title.toLowerCase().indexOf(text.toLowerCase()) > -1) {
          result.push(allSkills[i]);
        }
      }
    }
    setQuery(result);
    result = [];
  }
  function addRemoveSkill(text: string) {
    var itemExist = false;
    for (let i = 0; i < skills.length; i++) {
      if (skills[i] === text) {
        itemExist = true;
      }
    }

    if (!itemExist) {
      setSkills([...skills, text]);
    } else {
      removeSkill(text);
    }
  }

  function toggleSkill(text: string) {
    var itemExist = false;
    for (let i = 0; i < skills.length; i++) {
      if (skills[i] === text) {
        itemExist = true;
      }
    }
    return itemExist;
  }

  function removeSkill(text: string) {
    setSkills(skills.filter((item: any) => item !== text));
  }

  function cancelSkill() {
    setSkills(route.params.skills);
    setSkillsModal(false);
    setQuery(route.params.allSkills);
  }

  function saveSkill() {
    if (route.params.skills == skills) {
      cancelSkill();
      return;
    }
    setSkillsModal(false);
    setQuery(route.params.allSkills);
  }

  React.useEffect(() => {}, []);

  React.useEffect(() => {
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Avatar
              rounded
              title="P"
              activeOpacity={0.7}
              size="xlarge"
              onPress={() => {}}
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />

            <View
              style={[
                styles.textBoxContainer,
                {marginTop: 35, alignItems: 'center'},
              ]}>
              {email ? (
                <Text
                  style={{fontSize: 15, color: '#3878ee', fontWeight: 'bold'}}>
                  {email}
                </Text>
              ) : (
                <TextInput
                  style={styles.textBox}
                  autoCapitalize="words"
                  placeholder="Full Name"
                  placeholderTextColor="#3878ee"
                  onChangeText={text => setFullName(text)}
                  maxLength={40}
                />
              )}
            </View>

            <View style={[styles.textBoxContainer, {height: 100}]}>
              <TextInput
                style={genericStyle.textBox}
                autoCapitalize="words"
                placeholder="Past Experience/Clients"
                placeholderTextColor="#3878ee"
                multiline={true}
                onChangeText={text => setPastExperience(text)}
                maxLength={40}
                numberOfLines={3}
                scrollEnabled={false}
              />
            </View>
          </View>

          <View style={styles.selectBox}>
            <Text style={genericStyle.subHeading}>Location</Text>
            <View style={genericStyle.locationEditBox}>
              {locations.map((location: any, index: number) => (
                <View key={index + '_location_edit'}>
                  <TouchableOpacity
                    onPress={() => removeLocation(location)}
                    style={genericStyle.locationAddRemove}>
                    <Text style={genericStyle.addRemoveBox}>{location}</Text>
                    <Image
                      source={require('../assets/images/icons/delete-button.png')}
                      style={genericStyle.removeIconlocation}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => setLocationsModal(true)}
                style={[
                  genericStyle.locationAddRemove,
                  {
                    width: 150,
                  },
                ]}>
                <Image
                  source={require('../assets/images/icons/add-button.png')}
                  style={styles.addIcon}
                />
                <Text style={genericStyle.addRemoveBoxText}>Add Location</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.selectBox}>
            <Text style={genericStyle.subHeading}>Subjects</Text>
            <View style={genericStyle.locationEditBox}>
              {genres.map((genre: any, index: number) => (
                <View key={index + 'genre'}>
                  <TouchableOpacity
                    onPress={() => removeGenre(genre)}
                    style={genericStyle.locationAddRemove}>
                    <Text style={genericStyle.addRemoveBox}>{genre}</Text>
                    <Image
                      source={require('../assets/images/icons/delete-button.png')}
                      style={genericStyle.removeIconlocation}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => setGenreModal(true)}
                style={[genericStyle.locationAddRemove, {width: 150}]}>
                <Image
                  source={require('../assets/images/icons/add-button.png')}
                  style={styles.addIcon}
                />
                <Text style={styles.addRemoveBoxText}>Add Subjects</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.selectBox}>
            <Text style={genericStyle.subHeading}>Skills</Text>
            <View style={genericStyle.locationEditBox}>
              {skills.map((skill: any, index: number) => (
                <View key={index + 'skill'}>
                  <TouchableOpacity
                    onPress={() => removeSkill(skill)}
                    style={genericStyle.locationAddRemove}>
                    <Text style={genericStyle.addRemoveBox}>{skill}</Text>
                    <Image
                      source={require('../assets/images/icons/delete-button.png')}
                      style={genericStyle.removeIconlocation}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => setSkillsModal(true)}
                style={[styles.locationAddRemove, {width: 150}]}>
                <Image
                  source={require('../assets/images/icons/add-button.png')}
                  style={styles.addIcon}
                />
                <Text style={styles.addRemoveBoxText}>Add Skill</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.selectBox}>
            <Text style={genericStyle.subHeading}>Video</Text>
            <View style={genericStyle.locationEditBox}>
              <TouchableOpacity
                onPress={() => selectVideo()}
                style={[styles.locationAddRemove, {width: 150}]}>
                <Image
                  source={require('../assets/images/icons/add-button.png')}
                  style={styles.addIcon}
                />
                <Text style={styles.addRemoveBoxText}>Upload Video</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.selectBox}></View>

          <TouchableOpacity
            onPress={onPressNextBtn}
            style={[genericStyle.loginBtn, {marginTop: 25}]}>
            <Text style={genericStyle.loginBtnText}>Submit Request</Text>
          </TouchableOpacity>

          <View style={styles.goBackView}>
            <TouchableOpacity onPress={handleBack}>
              <View style={{width: 'auto', alignSelf: 'center'}}>
                <Text style={styles.goBackText}>Go back</Text>
                <View style={genericStyle.underline} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 50}} />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={skillsModal}
        onRequestClose={() => setSkillsModal(false)}>
        <View style={styles.skillModal}>
          <View style={styles.searchCheck}>
            <View style={styles.searchAndIcon}>
              <TextInput
                style={styles.searchBox}
                placeholder={'Search Skills'}
                onChangeText={text => searchSkill(text)}
                placeholderTextColor="#3878ee"
              />
              <Image
                style={styles.searchIcon}
                source={require('../assets/images/icons/search-blue.png')}
              />
            </View>
            <TouchableOpacity onPress={() => saveSkill()}>
              <Image
                source={require('../assets/images/icons/check.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cancelSkill()}>
              <Image
                source={require('../assets/images/icons/cancel.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <View>
              {query.length < 1 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.emptySearchText}>No Results found</Text>
                </View>
              ) : (
                query.map((skill: any, index: number) => (
                  <TouchableOpacity
                    key={index + '_skill_add'}
                    onPress={() => addRemoveSkill(skill.title)}
                    style={
                      toggleSkill(skill.title)
                        ? styles.skillAdded
                        : styles.addSkillBox
                    }>
                    <Text
                      style={
                        toggleSkill(skill.title)
                          ? styles.addedSkill
                          : styles.addSkill
                      }>
                      {skill.title}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={genreModal}
        onRequestClose={() => setGenreModal(false)}>
        <View style={styles.skillModal}>
          <View style={styles.searchCheck}>
            <View style={styles.searchAndIcon}>
              <TextInput
                style={styles.searchBox}
                placeholder={'Search Subjects'}
                onChangeText={text => searchGenre(text)}
                placeholderTextColor="#3878ee"
              />
              <Image
                style={styles.searchIcon}
                source={require('../assets/images/icons/search-blue.png')}
              />
            </View>
            <TouchableOpacity onPress={() => saveGenre()}>
              <Image
                source={require('../assets/images/icons/check.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cancelGenre()}>
              <Image
                source={require('../assets/images/icons/cancel.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <View>
              {queryGenre.length < 1 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.emptySearchText}>No Results found</Text>
                </View>
              ) : (
                queryGenre.map((genre: any, index: number) => (
                  <TouchableOpacity
                    key={index + '_genre_add'}
                    onPress={() => addRemoveGenre(genre.title)}
                    style={
                      toggleGenre(genre.title)
                        ? styles.skillAdded
                        : styles.addSkillBox
                    }>
                    <Text
                      style={
                        toggleGenre(genre.title)
                          ? styles.addedSkill
                          : styles.addSkill
                      }>
                      {genre.title}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={locationsModal}
        onRequestClose={() => setLocationsModal(false)}>
        <View style={styles.skillModal}>
          <View style={styles.searchCheck}>
            <View style={styles.searchAndIcon}>
              <TextInput
                style={styles.searchBox}
                placeholder={'Search Locations'}
                onChangeText={text => searchLocation(text)}
                placeholderTextColor="#3878ee"
              />
              <Image
                style={styles.searchIcon}
                source={require('../assets/images/icons/search-blue.png')}
              />
            </View>
            <TouchableOpacity onPress={() => saveLocation()}>
              <Image
                source={require('../assets/images/icons/check.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cancelLocation()}>
              {/* <FontAwesome name="times" style={styles.times} size={30} /> */}
              <Image
                source={require('../assets/images/icons/cancel.png')}
                style={styles.removeIconlocation}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <View>
              {queryLocations.length < 1 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.emptySearchText}>No Results found</Text>
                </View>
              ) : (
                queryLocations.map((location: any, index: number) => (
                  <TouchableOpacity
                    key={index + '_location_add'}
                    onPress={() => addRemoveLocation(location.title)}
                    style={
                      toggleLocation(location.title)
                        ? styles.skillAdded
                        : styles.addSkillBox
                    }>
                    <Text
                      style={
                        toggleLocation(location.title)
                          ? styles.addedSkill
                          : styles.addSkill
                      }>
                      {location.title}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    marginTop: 0,
  },
  scrollView: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    marginBottom: 0,
    flex: 1,
  },
  header: {
    marginBottom: 50,
    // height: 102,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'center',
    marginTop: 25,
  },
  loginBtn: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    height: 55,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    borderColor: '#ffffff',
    marginTop: 90,
    marginBottom: 25,
  },
  loginBtnText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#3878ee',
    width: '100%',
    fontSize: 18,
  },
  addRemoveBoxText: {paddingLeft: 15, color: '#3878ee'},
  textBox: {
    height: '100%',
    width: 300,
    borderColor: '#3878ee',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 4,
    fontFamily: 'System',
  },

  searchBox: {
    width: '94%',
    color: 'black',
    fontSize: 18,
    fontFamily: 'System',
  },
  form: {
    marginTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
  },
  textBoxContainer: {
    marginTop: 15,
    height: 50,
    width: '100%',
  },
  modalView: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
  },
  subHeading: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'System',
    color: '#3878ee',
    paddingLeft: 10,
  },
  textCancel: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
    // fontFamily: "System",
    marginTop: 15,
    color: '#3878ee',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center',
    // color: "#3878ee",
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    // color: "#3878ee",
  },
  selectBox: {
    marginVertical: 15,
  },
  locationEditBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  locationAddRemove: {
    padding: 5,
    borderColor: '#C1CAE1',
    backgroundColor: '#C1CAE1',
    borderRadius: 25,
    borderWidth: 1,
    height: 40,
    width: 95,
    marginRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  removeIconlocation: {
    width: 26,
    height: 26,
    marginLeft: 5,
    // top: -12,
    right: -5,
  },
  addIcon: {
    width: 26,
    height: 26,
    marginLeft: 5,
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
  goBackView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  goBackText: {
    color: '#3878ee',
    textAlign: 'center',
    fontSize: 18,
  },
  skillModal: {
    marginTop: 40,
    padding: 15,
  },
  searchCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  searchAndIcon: {
    height: 44,
    width: '70%',
    borderColor: '#949599',
    backgroundColor: '#ffffff',
    color: '#3878ee',
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 10,
    fontSize: 15,
    fontFamily: 'System',
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginTop: 8,
  },
  emptySearchText: {
    fontSize: 28,
    fontFamily: 'System',
    color: '#949599',
    textTransform: 'capitalize',
  },

  addSkill: {
    color: '#3878ee',
  },

  addedSkill: {
    color: '#3878ee',
  },
  addSkillBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#3878ee',
    marginRight: 10,
    marginTop: 10,
    fontSize: 15,
  },
  skillAdded: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#C1CAE1',
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#C1CAE1',
    fontSize: 15,
  },
  addRemoveBox: {
    color: '#3878ee',
    fontFamily: 'System',
    textAlign: 'center',
  },
});
