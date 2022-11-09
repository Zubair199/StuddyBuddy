import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Divider, Radio, Select } from 'native-base';
import { Text, Button, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH, AUTHENTICATIONS, GENERAL } from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';
import MainLayout from './MainLayout';
import Icon from 'react-native-vector-icons/AntDesign';
import api from '../services/api.services';
import { app, grey } from '../constants/themeColors';
import LottieView from 'lottie-react-native';
export default function NetworkScreen() {
  const { userToken, userType } = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(true);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  let [user, setUser] = React.useState(userToken);
  let [users, setUsers] = React.useState([]);
  let [userProfiles, setUserProfiles] = React.useState([]);
  let [profile, setProfile] = React.useState(null);

  const [userName, setUserName] = React.useState('');
  const [noShowCount, setNoShowCount] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);
  const [lateCancellation, setLateCancellation] = React.useState(0);
  const [image, setImage] = React.useState('');
  const [skills, setSkills] = React.useState([]); //teachers/students skills/class preferences api
  const [imageModal, setImageModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [editSkill, setEditSkill] = React.useState([]); //teachers/students skills/class preferences api
  const [editing, setEditing] = React.useState(false);
  const [query, setQuery] = React.useState([]);
  const [pastExperience, setPastExperience] = React.useState('');
  // const [isSkillEdit, setIsSkillEdit] = React.useState(false);
  const [allSkills, setAllSkills] = React.useState([]);
  const [self, setSelf] = React.useState();
  // const [imageLoader, setImageLoader] = React.useState(false);
  const [reRun, setReRun] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [experience, setExperience] = React.useState('');
  const [certifications, setCertifications] = React.useState([]);
  const [friendList, setFriendList] = React.useState<Array<object>>([]);
  const [mentorList, setMentorList] = React.useState<Array<object>>([]);
  const [pageFriend, setPageFriend] = React.useState(1);
  const [friends, setFriends] = React.useState<any>();
  const [pageMentors, setPageMentors] = React.useState(1);
  const [mentors, setMentors] = React.useState<any>();
  const [pageLoader, setPageLoader] = React.useState(false);
  const [emptySearch, setEmptySearch] = React.useState(false);
  const [temp, setTemp] = React.useState('');

  const [isStudent, setIsStudent] = React.useState(false);
  const [isTeacher, setIsTeacher] = React.useState(false);

  const [inputBio, setInputBio] = React.useState({
    style: styles.disableInput,
    editable: false,
    bio: 'Lorem Ipsum salt dolor set amet sha.',
  });

  React.useEffect(() => {
    //console.log("NetworkScreen", userType)
    apiCall();
  }, [isFocused]);
  function apiCall() {
    fetch(AUTHENTICATIONS.API_URL + AUTH.USERS)
      .then(response => response.json())
      .then(responseJson => {
        console.log('users ', responseJson.users);
        let x = responseJson.users.filter(item => item._id !== user);
        let y = x.filter(item => item.roles.name !== 'admin');
        console.log(y);
        setUsers(y);
        setUserProfiles(responseJson.profiles);
        setLoader(false)
      })
      .catch(err => {
        console.log(err);
      });
  }
  function handleChat(classId, group) {
    console.log(group);
    // if(group === true){
    //     const requestData = {classId:"62ba40cc2c9acbf79d1b1326" ,flag:group,groupUsers:["62bb70317d78ecbb83bcb7d1","6295cc2b7d505307388d58fd","62a1af738c535a276ca3c3ef"] };

    //     api.createNewMessage(requestData).then((resp) => {

    //       if (resp) {
    //         const newChatInfo = resp.data;
    //         if (newChatInfo && newChatInfo.data.chatId) {

    //              navigation.navigate("ChatScreen", { chatId: newChatInfo.data.chatId, textMes: "",classId });
    //         }

    //       }
    //     }).catch(e=>{console.log(e)});
    // }
    // else{
    console.log('here in one to one');
    const requestData = { toUser: classId };
    console.log(classId);
    api
      .createNewMessage(requestData)
      .then(resp => {
        console.log('hit ');
        if (resp) {
          const newChatInfo = resp.data;
          if (newChatInfo && newChatInfo.data.chatId) {
            console.log('bro here in chat');
            navigation.navigate('ChatScreen', {
              chatId: newChatInfo.data.chatId,
              textMes: '',
              history:'N'

            });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
    // }
  }

  const [isModal, setIsModal] = React.useState(false);
  const [isModal1, setIsModal1] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);

  function getProfileData(id, item) {
    let result = userProfiles.filter(item => item.user === id);

    console.log(result);
    if (result.length > 0) {
      setProfile(result[0]);
      setSkills(result[0].skills);
      setCertifications(result[0].certifications);
      setPastExperience(result[0].pastExperience);
      if (result[0].image) {
        setImage(result[0].image);
      }
      setIsEnabled(item.isHired);
      setIsStudent(item.roles.name === 'user');
      setIsTeacher(item.roles.name === 'teacher');
      console.log(isStudent);
      console.log(isTeacher);

    } else {
      setProfile(null);
      setSkills([]);
      setCertifications('');
      setPastExperience('');
      setIsEnabled(false)
    }
    toggleModal1();

  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      onPress={() => {
        getProfileData(item._id, item);
      }}>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <View>
            <Text>{item.username}</Text>
            <View>
              <Text>{item.roles.name}</Text>
            </View>
          </View>
        </View>
        <View>
          {/* <TouchableOpacity onPress={() => {handleChat(item._id,)}}> */}
          <TouchableOpacity
            onPress={() => {
              handleChat(item._id, false);
            }}>
            <Icon name="message1" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
  const searchUser = (name) => {
    const backup = users
    // if (name !== '') {
    //   const res = users.filter((item) => item.username.includes(name))
    //   console.log(res)
    //   setUser(res)
    // } else {
    //   setUser(backup)
    // }
  }
  let [hireFlag, setHireFlag] = React.useState('');
  let [name, setName] = React.useState('');
  const [value, setValue] = React.useState('students');

  function teacherApiCall() {
    try {
      fetch(
        AUTHENTICATIONS.API_URL +
        GENERAL.TEACHER_SEARCH +
        'name=' +
        name +
        '&hire=' +
        hireFlag,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('teachers ', responseJson);
          setUsers(responseJson.users);
          setLoader(false)
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function studentApiCall() {
    try {
      fetch(AUTHENTICATIONS.API_URL + GENERAL.USER_SEARCH + name)
        .then(response => response.json())
        .then(responseJson => {
          console.log('students ', responseJson);
          setUsers(responseJson.users);
          setLoader(false)
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function generalApiCall() {
    try {
      setLoader(true)
      fetch(AUTHENTICATIONS.API_URL + GENERAL.GENERAL_USER + name)
        .then(response => response.json())
        .then(responseJson => {
          console.log('all users ', responseJson);
          setUsers(responseJson.users);
          setLoader(false)
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function toggleModal() {
    console.log('modal');
    setIsModal(!isModal);
    // clearStates();
  }

  function clearStates() {
    setName('');
    setHireFlag('');
    setValue('students');
  }

  function filter() {
    setLoader(true)
    if (value === 'students') {
      studentApiCall();
    } else if (value === 'teachers') {
      teacherApiCall();
    }
    toggleModal();
  }
  function toggleModal1() {
    setIsModal1(!isModal1)
  }
  if (loader) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <LottieView
        source={require('../assets/images/Gifs/study.json')}
        autoPlay
        loop
      />
      </SafeAreaView>
    )
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>

        <Modal
          animationType="slide"
          visible={isModal1}
          onRequestClose={() => {
            toggleModal1();
          }}>
          <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal1();
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
              <Text style={styles.title}>Profile Details</Text>
            </View>
            <SafeAreaView style={styles.container}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
              >
                {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
                <View style={styles.basicInfo}>
                  {/* instructor name and image will be replaced by api's data on integration of apis */}
                  <View style={styles.profileImageBox}>
                    <Avatar
                      rounded
                      title="P"
                      activeOpacity={0.7}
                      size="xlarge"

                      source={
                        image === ''
                          ? require('../assets/images/user.png')
                          : { uri: AUTHENTICATIONS.API_URL + image }
                      }
                    />
                  </View>
                  <View style={styles.nameBox}>
                    <Text style={styles.name}>{userName}</Text>
                  </View>
                  <View style={styles.instructorBox}>
                    <Text style={styles.instructor}>
                      {isStudent ? 'Student' : 'Instructor'}
                    </Text>
                  </View>
                </View>

                {isStudent ? null : (
                  <View>
                    {/* Divider */}
                    <View style={styles.lineStyle} />

                    <View style={styles.actionBox}>
                      <Text style={[styles.noShowTitle, { marginRight: 20 }]}>
                        Late Cancellation:{' ' + lateCancellation}
                      </Text>
                      <Text style={[styles.noShowTitle, { marginLeft: 20 }]}>
                        No Show:{' ' + noShowCount}
                      </Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.lineStyle} />
                  </View>
                )}
                <View style={styles.skillBox}>
                  <View style={styles.skillsWithIcon}>
                    <Text style={styles.skillsAttributesHeading}>
                      {isStudent ? 'Class Preferences' : 'Skills'}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    {skills.map((skill, index, arr) => (
                      <View
                        key={index + '_skill_view'}
                        style={{ flexDirection: 'row' }}>
                        <Text style={styles.skillsText}>{skill}</Text>
                        {arr.length - 1 !== index ? (
                          <View style={styles.dot}></View>
                        ) : null}
                      </View>
                    ))}
                  </View>
                </View>
                {isTeacher && (
                  <View style={styles.textContent}>
                    <Text style={styles.contentTitle}>Certifications</Text>
                    {(certifications && certifications.length > 0) ? (
                      <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
                        {
                          certifications.map((item, index) => {
                            return (
                              <View style={{ padding: 2 }} key={index}>
                                <View style={{ width: 100, height: 100 }}>
                                  <View style={{ flexDirection: "row" }}>
                                    <Image
                                      source={{ uri: AUTHENTICATIONS.API_URL + item }}
                                      style={{ width: 100, height: 100, borderRadius: 15 }}
                                    />
                                  </View>
                                </View>
                              </View>
                            )
                          })
                        }
                      </View>
                    ) : (
                      <Text style={styles.placeholder}>
                        Your Certifications Here
                      </Text>
                    )}
                  </View>
                )}
                <View style={styles.textContent}>
                  <Text style={styles.contentTitle}>
                    {isTeacher ? 'Past Experience' : 'Past Education'}
                  </Text>
                  {experience ? (
                    <Text style={styles.actualText}>{experience}</Text>
                  ) : (
                    <Text style={styles.placeholder}>
                      Your Past Experience Here
                    </Text>
                  )}
                  <View style={styles.lineStyle} />
                </View>

                {isTeacher && (
                  <>
                    <View style={styles.lineStyle} />

                    <View style={styles.switchBoxWarpper}>
                      <Text style={styles.switchBoxLebel}>
                        Mark as available to hire.
                      </Text>

                      <View>
                        <Switch
                          trackColor={{ false: "#767577", true: grey[400] }}
                          thumbColor={isEnabled ? app.lightBlue : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          value={isEnabled}
                        />
                      </View>
                    </View>
                    <View style={styles.lineStyle} />
                  </>
                )}

                {/* {!isStudent && (
                    <SubscribersListComponent subscribersList={fakeSubscribers} />
                )} */}

                {/* image modal starts here */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={imageModal}
                  onRequestClose={() => setImageModal(false)}>
                  <View style={styles.centeredView}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                      }}
                      onPress={() => setImageModal(false)}></TouchableOpacity>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={styles.imageModal}>
                        <Icon name="camera" size={30} />
                        <Text>Take Picture</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.imageModal}>
                        <Icon name="upload" size={30} />
                        <Text>Upload Picture</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
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
            <View style={{ height: '90%' }}>
              <View style={{ marginVertical: 10 }}>
                <Radio.Group
                  direction={'row'}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  name="myRadioGroup"
                  value={value}
                  onChange={nextValue => {
                    setValue(nextValue);
                  }}>
                  <Radio value="students" my="1">
                    Students
                  </Radio>
                  <Radio value="teachers" my="1">
                    Teachers
                  </Radio>
                </Radio.Group>
              </View>
              <View style={{ marginVertical: 10 }}>
                <TextInput
                  placeholder="Enter Name"
                  onChangeText={text => setName(text)}
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    borderRadius: 5,
                    height: 43,
                  }}
                />
              </View>
              {value === 'teachers' && (
                <View>
                  <View style={{ marginVertical: 10 }}>
                    <Select
                      accessibilityLabel="Available to hire"
                      selectedValue={hireFlag}
                      onValueChange={itemValue => {
                        setHireFlag(itemValue);
                      }}
                      placeholder="Available to hire">
                      <Select.Item label="Yes" value="1" />
                      <Select.Item label="No" value="0" />
                    </Select>
                  </View>
                </View>
              )}
            </View>
            <View style={{ height: '10%' }}>
              <Button
                onPress={() => filter()}
                buttonStyle={{ width: '100%', backgroundColor: app.lightBlue }}
                containerStyle={{ width: '100%' }}
                title="Search"
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15
          }}>
          <TextInput
            placeholder="Enter Name"
            onChangeText={text => setName(text)}
            style={{
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 5,
              height: 43,
              width: '80%',
              marginRight: 5
            }}
            onSubmitEditing={() => { console.log("done"); generalApiCall(); }}
          />
          <Button
            onPress={() => toggleModal()}
            iconRight
            buttonStyle={{ backgroundColor: app.lightBlue }}
            icon={<Icon name="filter" size={15} color="white" />}
            title="Filter"
          />
        </View>
        {
          !users || users.length === 0 ?
            (
              <View style={styles.contentBox}>
                <Text style={styles.emptySearchText}>No Users Has Been Found</Text>
              </View>
            )
            :
            (
              <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />

            )
        }
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    marginTop: 80,
    alignSelf: 'center',
  },

  lineStyle: {
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingHorizontal: 15,
  },
  scrollView: {
    paddingHorizontal: 15,
    height: '100%',
  },
  closeIconBox: {
    paddingRight: 15,
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // backgroundColor:"blue"
  },
  sticky: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginLeft: 24,
    fontFamily: 'roboto-light',
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  basicInfo: {
    marginTop: 40,
    width: '100%',
  },

  profileImageBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 160,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  name: {
    fontSize: 18,
    color: '#4B5F79',
    textTransform: 'uppercase',
    fontFamily: 'roboto-light',
  },

  instructorBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  instructor: {
    fontSize: 14,
    fontFamily: 'roboto-light',
  },

  skillBox: {
    marginTop: 50,
    marginBottom: 20,
  },

  skillsWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  skillsAttributesHeading: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'roboto-light',
  },
  pencilIcon: {
    width: 24,
    height: 24,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillsText: {
    fontSize: 15,
    fontFamily: 'roboto-light',
  },

  dot: {
    height: 3,
    width: 3,
    backgroundColor: 'black',
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },

  bottomSpace: {
    marginBottom: 20,
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  bioBox: {
    // marginBottom: 5,
  },

  headingAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  disableInput: {
    width: '100%',
    fontFamily: 'roboto-light',
    fontSize: 16,
  },

  enableInput: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    borderColor: '#949599',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 8,
    fontFamily: 'roboto-light',
    fontSize: 16,
    color: 'black',
  },

  bioActionBox: {
    width: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  actionBox: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: 210,
  },
  modalView: {
    height: 200,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 20,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imageModal: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },

  skillEditBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  skillAddRemove: {
    padding: 5,
    borderColor: '#4B5F79',
    borderRadius: 3,
    borderWidth: 1,
    // width:"30%",
    marginRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  removeIcon: {
    width: 14,
    height: 4,
    marginLeft: 5,
  },
  addIcon: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },

  addSkillBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#4B5F79',
    marginRight: 10,
    marginTop: 10,
    fontSize: 15,
  },

  skillAdded: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#4B5F79',
    fontSize: 15,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginTop: 3,
  },
  textBox: {
    width: '94%',
    color: 'black',
    fontSize: 18,
    fontFamily: 'roboto-light',
  },

  emptySearchText: {
    fontSize: 28,
    fontFamily: 'roboto-regular',
    textTransform: 'uppercase',
    textAlign: "center"
  },

  addSkill: {
    color: '#4B5F79',
  },

  addedSkill: {
    color: '#ffffff',
  },

  actionBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  actionBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#4B5F79',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  times: {
    color: '#FF6565',
  },

  check: {
    color: '#01C75D',
  },

  skillModal: {
    marginTop: 40,
    padding: 15,
  },
  textContent: {
    marginBottom: 20,
  },
  contentTitle: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'roboto-light',
    marginBottom: 8,
  },
  noShowTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '200',
    fontFamily: 'roboto-light',
  },
  placeholder: {
    color: '#939598',
    width: '100%',
    fontFamily: 'roboto-light',
    fontSize: 16,
  },
  actualText: {
    color: 'black',
    width: '100%',
    fontFamily: 'roboto-light',
    fontSize: 16,
  },
  noResultView: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  noResultText: {
    textAlign: 'center',
    fontFamily: 'roboto-light',
    color: '#4b5f79',
  },
  classBoxWrapper: {
    height: '100%',
    width: 120,
    overflow: 'hidden',
    // marginBottom: 22,
    borderRadius: 5,
    // marginHorizontal: 5,
    marginRight: 15,
  },
  classBoxImage: {
    width: '100%',
    height: '100%',
    // position: "relative",
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  classBoxText: {
    // marginLeft: 7,
    color: '#FFFFFF',
    fontSize: 13,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
  classBox: {
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 10,
    flex: 1,
  },
  classBoxName: {
    color: '#ffff',
    fontSize: 18,
    fontFamily: 'roboto-regular',
  },
  toggleOn: {
    // color: "#4B5F79",
    width: 41,
    height: 27,
  },
  switchBoxWarpper: {
    width: '100%',
    height: 25,
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  switchBoxLebel: {
    textAlign: 'left',
    flex: 0.8,
    alignContent: 'flex-start',
    color: '#000000',
    fontSize: 15,
    fontFamily: 'roboto-regular',
    marginTop: 2,
  },
  profileBox: {
    justifyContent: 'flex-end',
    paddingLeft: 15,
    paddingBottom: 10,
    flex: 1,
  },
  profileBoxName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'roboto-regular',
  },
  profileBoxImage: {
    width: '100%',
    height: '100%',
  },
  profileBoxWrapper: {
    height: '100%',
    width: 120,
    overflow: 'hidden',
    borderRadius: 5,
    marginRight: 15,
  },
});
