import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  TextInput,
  Button as NativeButton
} from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AUTH, AUTHENTICATIONS, CLASS, STRIPE, TWILIO } from '../services/api.constants';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Select, Input, TextArea, Button } from 'native-base';
import api from '../services/api.services';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';


export default function ClassDetailScreen({ route }) {
  const { classID } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userToken, userType, userEmail } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken);

  const [_class, setClass] = React.useState(null);
  const [schedule, setSchedule] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);

  const [teacher, setTeacher] = React.useState(null);
  const [isJoined, setIsJoined] = React.useState(false);

  const [isPlatformPaid, setIsPlatformPaid] = React.useState(false);


  const [description, setDescription] = React.useState('');
  const [scheduleID, setScheduleID] = React.useState('');

  const [studentIds, setStudentIds] = React.useState([]);
  const [teacherId, setTeacherId] = React.useState([]);
  const [chatFlag, setChatFlag] = React.useState(false);
  const [isDispute, setIsDispute] = React.useState(false);

  const [paymentIntentID, setPaymentIntentId] = React.useState(null);

  const [cardDetails, setCardDetails] = React.useState(null);

  const [room, setRoom] = React.useState(null)
  const [roomName, setRoomName] = React.useState('')

  React.useEffect(() => {
    console.log(user, isPlatformPaid);
    fetch(AUTHENTICATIONS.API_URL + CLASS.JOINED_STUDENTS + classID)
      .then(response => response.json())
      .then(responseJson => {
        console.log('JOINED_STUDENTS : = ', responseJson);
        setStudentIds(responseJson.students);
        setTeacherId(responseJson.teacher);
      })
      .catch(err => {
        console.log(err);
      });

    getUser()
    console.log(userType);

    if (userType.toLowerCase() === 'user') {
      studentApiCall();
    } else {
      teacherApiCall();
    }
  }, []);

  function getUser() {
    fetch(AUTHENTICATIONS.API_URL + AUTH.GET_USER_BY_ID + user)
      .then(response => response.json())
      .then(responseJson => {
        console.log('JOINED_STUDENTS : = ', responseJson);
        if (responseJson && responseJson.user) {
          setIsPlatformPaid(responseJson.user.isPlatformPaid);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function teacherApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_CLASS_BY_CLASS_ID + classID)
      .then(response => response.json())
      .then(responseJson => {
        console.log('details classes ', responseJson);
        setClass(responseJson.classes);
        setTeacher(responseJson.classes.Teacher);
        setSchedule(responseJson.schedules);
        console.log(responseJson.classes.schedules);
        let d = new Date()
        let _room = "SB-" + responseJson.classes.name + "(" + formatDate(d) + ")"
        setRoomName(_room)
        getRoom(_room)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getRoom(payload) {
    fetch(AUTHENTICATIONS.API_URL + TWILIO.GET_ROOM + payload)
      .then(response => response.json())
      .then(responseJson => {
        console.log('ROOM : = ', responseJson);
        if (responseJson && responseJson.room) {
          setRoom(responseJson.room);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  function apiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_CLASS_BY_CLASS_ID + classID)
      .then(response => response.json())
      .then(responseJson => {
        console.log('classes ', responseJson.schedules);
        setClass(responseJson.classes);
        setTeacher(responseJson.classes.Teacher);
        setSchedule(responseJson.schedules);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function studentApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_BY_ID + classID)
      .then(response => response.json())
      .then(responseJson => {
        console.log('classes ', responseJson.paymentIntentId);
        if (responseJson.classes) {
          setIsJoined(responseJson.studentClass.isJoined);
          setClass(responseJson.classes);
          setTeacher(responseJson.classes.Teacher);
          setSchedule(responseJson.schedules);
          setPaymentIntentId(responseJson.paymentIntentId)
          setIsDispute(responseJson.dispute)

          // console.log(responseJson.classes.schedules);
          let d = new Date()
          let _room = "SB-" + responseJson.classes.name + "(" + formatDate(d) + ")"
          setRoomName(_room)
          getRoom(_room)

          let date = formatDate(new Date());
          console.log(date);
          responseJson.schedules.forEach(schedule => {
            console.log('schedule => ', schedule.startdate);
            if (date === schedule.startdate) {
              setChatFlag(true);
            }
          });

        } else {
          apiCall();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function joinClass() {
    const body = {
      Teacher: _class.Teacher._id,
      Student: user,
      Class: _class._id,
    };
    console.log(body);
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(AUTHENTICATIONS.API_URL + CLASS.JOIN_CLASS, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert(responseJson.message);
          studentApiCall();
          toggleModal1()
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
        });
    } catch (exception) {
      console.log('exception ', exception);
    }
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  function formatTime(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const [subjectText, setSubjectText] = React.useState('');
  const [reason, setReason] = React.useState('');

  const [isModal, setIsModal] = React.useState(false);
  function toggleModal() {
    console.log('modal');
    setIsModal(!isModal);
  }

  const [isModal1, setIsModal1] = React.useState(false);
  function toggleModal1() {
    console.log('modal1');
    setIsModal1(!isModal1);
  }


  const [isModal2, setIsModal2] = React.useState(false);
  function toggleModal2() {
    console.log('modal2');
    setIsModal2(!isModal2);
  }

  function apiCallTopicAnnouncement(id) { }

  function setPropertySubjectText(x, id) {
    if (x === 'view') {
      apiCallTopicAnnouncement(id);
      fetch(
        AUTHENTICATIONS.API_URL +
        CLASS.GET_TOPIC_ANNOUNCEMENT_BY_SCHEDULE_ID +
        id,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('json ', responseJson);
          setTopics(responseJson.topics);
          setAnnouncements(responseJson.announcements);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setSubjectText(x);
    setScheduleID(id);
    toggleModal();
  }

  function addTA() {
    if (description !== '') {
      const body = {
        ClassSchedule: scheduleID,
        description: description,
      };
      console.log(body);
      let endpoint = '';
      if (subjectText.toLocaleLowerCase() === 'topic') {
        endpoint = CLASS.CREATE_TOPIC;
      } else {
        endpoint = CLASS.CREATE_ANNOUNCEMENT;
      }
      console.log(endpoint);

      try {
        let requestObj = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
        fetch(AUTHENTICATIONS.API_URL + endpoint, requestObj)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            toggleModal();
            Alert.alert(responseJson.message);
          })
          .catch((err: any) => {
            console.log(err);
            console.log(err.response);
          });
      } catch (exception) {
        console.log('exception ', exception);
      }
    } else {
      Alert.alert('All Fields are required.');
    }
  }

  function groupChat() {
    console.log(studentIds, teacherId);
    const grUsers = studentIds.concat(teacherId);
    console.log(grUsers, classID);

    const requestData = { classId: classID, groupUsers: grUsers, flag: true };

    api
      .createNewMessage(requestData)
      .then(resp => {
        if (resp) {
          const newChatInfo = resp.data;
          if (newChatInfo && newChatInfo.data.chatId) {
            navigation.navigate('ChatScreenG', {
              chatId: newChatInfo.data.chatId,
              textMes: '',
              classID: classID,
            });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }


  function dispute() {
    if (reason !== '') {

      const body = {
        user: userToken,
        paymentIntentId: paymentIntentID,
        class: _class._id,
        description: reason
      };
      console.log(body);

      try {
        let requestObj = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
        fetch(AUTHENTICATIONS.API_URL + STRIPE.CREATE_DISPUTE, requestObj)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            Alert.alert(responseJson.message);
            toggleModal2()
            studentApiCall()
          })
          .catch((err: any) => {
            console.log(err);
            console.log(err.response);
            Alert.alert('Something went wrong');
          });
      } catch (exception) {
        console.log('exception ', exception);
        Alert.alert('Something went wrong');
      }
    }
    else {
      Alert.alert('Description is required.');
    }
  }
  const [loader, setLoader] = React.useState(true);

  const [card, setCard] = React.useState(null)
  const fetchPaymentIntentClientSecret = async () => {
    console.log(AUTHENTICATIONS.API_URL + STRIPE.CREATE_PAYMENT_INTENT_PLATFORM)
    let url = ''
    let body = {}
    if (isPlatformPaid) {
      url = AUTHENTICATIONS.API_URL + STRIPE.CREATE_PAYMENT_INTENT_CLASS
      body = {
        currency: 'usd',
        user: user,
        teacher: _class.Teacher._id,
        class: _class._id
      }
    }
    else {
      url = AUTHENTICATIONS.API_URL + STRIPE.CREATE_PAYMENT_INTENT_PLATFORM
      body = {
        currency: 'usd',
        user: user,
      }
    }
    console.log(url, body)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const { clientSecret, paymentIntentId } = await response.json();
    return { clientSecret, paymentIntentId };
  };
  const { confirmPayment, loading } = useConfirmPayment();
  const handlePayPress = async () => {
    try {

      // Gather the customer's billing information (for example, email)
      if (!card) {
        Alert.alert("Error", "Card Details are required.")
        return
      }
      else {

        // Fetch the intent client secret from the backend
        const { clientSecret, paymentIntentId } = await fetchPaymentIntentClientSecret();

        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
          card
        });

        if (error) {
          console.log('Payment confirmation error', error);
          Alert.alert("Error", error.localizedMessage)
        } else if (paymentIntent) {
          console.log('Success from promise', paymentIntent);
          if (isPlatformPaid) {
            let paymentSuccess = await fetch(AUTHENTICATIONS.API_URL + STRIPE.SUCCESS_PAYMENT_INTENT_CLASS + user + "/" + _class._id + "/" + paymentIntentId)
            const { message } = await paymentSuccess.json();
            Alert.alert("Success", message)
            joinClass()
          }
          else {
            let paymentSuccess = await fetch(AUTHENTICATIONS.API_URL + STRIPE.SUCCESS_PAYMENT_INTENT_PLATFORM + user + "/" + paymentIntentId)
            const { message } = await paymentSuccess.json();
            studentApiCall()
            getUser()
            toggleModal1()
            Alert.alert("Success", message)
          }
        }
      }
    }
    catch (e) {
      console.log("pay")
      Alert.alert("Error", "Something went wrong.")
    }

  };

  function createRoom() {
    try {
      let d = new Date()
      const body = {
        user: userToken,
        class: _class._id,
        name: roomName
      };
      console.log(body)

      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(AUTHENTICATIONS.API_URL + TWILIO.CREATE_ROOM, requestObj)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          Alert.alert(responseJson.message);
          toggleModal2()
          teacherApiCall()
        })
        .catch((err: any) => {
          console.log(err);
          console.log(err.response);
          Alert.alert('Something went wrong');
        });
    }
    catch (e) {
      console.log("pay")
      Alert.alert("Error", "Something went wrong.")
    }
  }

  function joinRoom() {
    fetch(AUTHENTICATIONS.API_URL + TWILIO.GET_TOKEN + userToken + "/" + roomName)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        if (responseJson && responseJson.token) {
          navigation.navigate("ClassVideoScreen", { room: room.room, user: userToken, accessToken: responseJson.token })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function component() {
    return (
      <View style={styles.container}>
        <View
          style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15 }}>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon color={'black'} name="leftcircleo" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Class Details</Text>
        </View>
        {_class !== null && teacher !== null && (
          <ScrollView style={{ marginBottom: '5%', padding: 15 }}>
            <View>
              {/* header starts here */}
              <View style={{ marginTop: 10 }}>
                <ImageBackground
                  resizeMode="cover"
                  source={require('../assets/images/bg.jpg')}
                  style={styles.classBoxImage}
                  imageStyle={{ borderRadius: 5 }}>
                  <View style={styles.overlay}>
                    <View style={styles.levelBox}>
                      <View style={styles.levelIntermediate}></View>
                      <Text style={styles.classBoxText}>{_class.level}</Text>
                    </View>
                    <Text style={styles.classBoxName}>{_class.name}</Text>
                    <Text style={styles.classBoxInstructor}>
                      {teacher.username}
                    </Text>
                    {/* <Text style={styles.classBoxDate}>
                      Tuesday 12:00 - 13:00
                    </Text> */}
                    <Text style={styles.classBoxInstructor}>
                      {_class.Subject.name}
                    </Text>
                    <Text style={styles.classBoxInstructor}>
                      {_class.status}
                    </Text>
                  </View>
                </ImageBackground>
                {/* header ends here */}

                <View style={styles.joinBox}>
                  <Text style={styles.cost}>
                    Cost: &#36;{_class.price}
                    {/* Max. Students : {_class.maxStudents} */}
                  </Text>
                </View>
                <View style={styles.joinBox}>
                  {
                    room !== null ?
                      <TouchableOpacity
                        onPress={() => {
                          console.log('room join')
                          joinRoom()
                        }}
                        style={{
                          backgroundColor: '#4B5F79',
                          padding: 10,
                          borderRadius: 5,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '300',
                            color: 'white',
                          }}>
                          Join Room
                        </Text>
                      </TouchableOpacity>

                      :
                      <TouchableOpacity
                        onPress={() => {
                          createRoom()
                        }}
                        style={{
                          backgroundColor: '#4B5F79',
                          padding: 10,
                          borderRadius: 5,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '300',
                            color: 'white',
                          }}>
                          Create Room
                        </Text>
                      </TouchableOpacity>

                  }
                </View>
                {userType.toLowerCase() === 'teacher' &&
                  _class.status.toLowerCase() === 'approved' && (
                    <View style={styles.joinBox}>
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() => groupChat()}>
                        <Icon color={'black'} name="message1" size={25} />
                      </TouchableOpacity>
                    </View>
                  )}
                {userType.toLowerCase() === 'user' && isJoined && (
                  <View style={styles.joinBox}>
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                )}
                {/* price ends here */}

                {/* Class Location Starts here */}
                {/* <View>
                <Text style={styles.heading}>Class Location</Text>
                <Text style={styles.text}>CR 4 EE Building</Text>
              </View> */}
                {/* Class Location ends here */}

                {/* Language section starts here */}
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>
                      Languages
                    </Text>
                  </View>
                  <View style={styles.language}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.languageText}>{_class.language}</Text>
                    </View>
                  </View>
                </View>

                <Modal
                  animationType="slide"
                  visible={isModal}
                  onRequestClose={() => {
                    toggleModal();
                  }}>
                  <View
                    style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
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
                      {subjectText !== 'view' ? (
                        <Text style={styles.title}>Add {subjectText}</Text>
                      ) : (
                        <Text style={styles.title}>Details</Text>
                      )}
                    </View>
                    <View>
                      <ScrollView>
                        {subjectText !== 'view' ? (
                          <View>
                            <View style={{ marginVertical: 10 }}>
                              <Input
                                variant="outline"
                                placeholder="Description"
                                onChangeText={text => {
                                  setDescription(text);
                                }}
                              />
                            </View>

                            <View
                              style={{ marginVertical: 10, marginBottom: 40 }}>
                              <TouchableOpacity
                                onPress={() => {
                                  addTA()
                                }}
                                style={{
                                  backgroundColor: '#4B5F79',
                                  padding: 10,
                                  borderRadius: 5,
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontWeight: '300',
                                    color: 'white',
                                  }}>
                                  Submit
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View style={styles.languageBoxLanguage}>
                              <View style={styles.languageWithIcon}>
                                <Text style={styles.languageAttributesHeading}>
                                  Topics
                                </Text>
                              </View>
                              {topics.length > 0 &&
                                topics.map((item, index) => {
                                  return (
                                    <View style={{ marginVertical: 5 }} key={index}>
                                      <Text>
                                        {index + 1} {'- '} {item.description}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>

                            <View style={styles.languageBoxLanguage}>
                              <View style={styles.languageWithIcon}>
                                <Text style={styles.languageAttributesHeading}>
                                  Announcements
                                </Text>
                              </View>
                              {announcements.length > 0 &&
                                announcements.map((item, index) => {
                                  return (
                                    <View style={{ marginVertical: 5 }} key={index}>
                                      <Text>
                                        {index + 1} {'- '} {item.description}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>
                      SCHEDULE
                    </Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    {schedule.map((item, index) => {
                      return (
                        <View key={index} style={{ marginVertical: 20 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>
                              Start Date: {formatDate(item.startdate)}{' '}
                            </Text>
                            <Text>{formatTime(item.startdate)}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>End Date: {formatDate(item.enddate)} </Text>
                            <Text>{formatTime(item.enddate)}</Text>
                          </View>
                          {/* <View>
                              <Text>Max. Students:{" "} {item.maxStudents}</Text>
                            </View> */}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginVertical: 15,
                            }}>
                            <Divider orientation="vertical" width={3} />
                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() =>
                                setPropertySubjectText('view', item._id)
                              }>
                              <Text>View Details</Text>
                            </TouchableOpacity>
                            <Divider orientation="vertical" width={3} />
                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() => {
                                setPropertySubjectText('Topic', item._id);
                              }}>
                              <Text>Add Topic</Text>
                              {/* <Icon name="plus" size={20} /> */}
                            </TouchableOpacity>
                            <Divider orientation="vertical" width={3} />
                            <TouchableOpacity
                              style={{ flexDirection: 'row' }}
                              onPress={() => {
                                setPropertySubjectText('Announement', item._id);
                              }}>
                              <Text>Add Announcement</Text>
                              {/* <Icon name="plus" size={20} /> */}
                            </TouchableOpacity>
                            <Divider orientation="vertical" width={3} />
                          </View>
                          <Divider width={1} />
                        </View>
                      );
                    })}
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
                {/* Language section ends here */}

                {/* Announcements Starts here */}
                {/* <Text style={styles.heading}>Announcements</Text>
              <Text style={styles.text}>class announcements</Text> */}
                {/* Announcements ends here */}

                {/* Topics & Instructions Starts here */}
                {/* <Text style={styles.heading}>Topics and Instructions</Text>
              <Text style={styles.text}>class topics</Text> */}
                {/* Topics & Instructions ends here */}

                {/* connectivity link for enrolled students Starts here */}
                {/* <Text style={styles.heading}>Pre Recorded Class Link</Text> */}
                {/* <Text style={styles.heading}>Class Link</Text>

              <TouchableOpacity
                onPress={() => Linking.openURL("https://www.google.com/")}
              >
                <Text style={styles.text}>connectivityLink</Text>
              </TouchableOpacity> */}
                {/* connectivity link for enrolled students ends here */}

                {/* Schedule Starts here */}
                {/* <Text style={styles.heading}>Schedule</Text>
              <Text style={styles.text}>
                Day: Tuesday
                Time: 12:00 - 13:00
              </Text> */}
                {/* Schedule ends here */}

                {/* classes starts here */}
                {/*classData.documents.length === 0 ? null : (
        //   <>
        //     <Text style={styles.heading}>Instructor Uploads</Text>
        //     <View style={{ height: 180 }}>
        //       <ScrollView style={styles.scrollView} horizontal={true}>
        //         {classData.documents.map((upload: any, index: number) => (
        //           <TouchableOpacity
        //             key={index}
        //             style={styles.classBoxWrapper}
        //             onPress={() => Linking.openURL(upload)}
        //           >
        //             <ImageBackground
        //               source={
        //                 upload
        //                   .substring(upload.lastIndexOf(".") + 1)
        //                   .toLowerCase() == "pdf"
        //                   ? require("../assets/images/icons/document.png")
        //                   : { uri: upload }
        //               }
        //               style={styles.uploadBoxImage}
        //             >
        //               <View style={styles.overlay}>
        //                 <View style={styles.uploadBox}>
        //                   <Text style={styles.uploadName}>{upload.name}</Text>
        //                   <Text style={styles.uploadDate}>Uploaded Today</Text>
        //                 </View>
        //               </View>
        //             </ImageBackground>
        //           </TouchableOpacity>
        //         ))}
        //       </ScrollView>
        //     </View>
        //   </>
        // )
        */}

                {/* classes ends here */}

                {/* Enrolled Students Starts here */}
                {/* <Text style={styles.heading}>Students Enrolled</Text>
              <Text style={styles.text}>{5}</Text> */}
                {/* Enrolled Students ends here */}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  function studentComponent() {
    return (
      <View style={styles.container}>
        <View
          style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15 }}>
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon color={'black'} name="leftcircleo" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Class Details</Text>
        </View>
        {_class !== null && teacher !== null && (
          <ScrollView style={{ marginBottom: '5%', padding: 15 }}>
            <View>
              {/* header starts here */}
              <View style={{ marginTop: 10 }}>
                <ImageBackground
                  resizeMode="cover"
                  source={require('../assets/images/bg.jpg')}
                  style={styles.classBoxImage}
                  imageStyle={{ borderRadius: 5 }}>
                  <View style={styles.overlay}>
                    <View style={styles.levelBox}>
                      <View style={styles.levelIntermediate}></View>
                      <Text style={styles.classBoxText}>{_class.level}</Text>
                    </View>
                    <Text style={styles.classBoxName}>{_class.name}</Text>
                    <Text style={styles.classBoxInstructor}>
                      {teacher.username}
                    </Text>
                    {/* <Text style={styles.classBoxDate}>
                      Tuesday 12:00 - 13:00
                    </Text> */}
                    <Text style={styles.classBoxInstructor}>
                      {_class.Subject.name}
                    </Text>
                    <Text style={styles.classBoxInstructor}>
                      {_class.status}
                    </Text>
                  </View>
                </ImageBackground>

                <Modal
                  animationType="slide"
                  visible={isModal1}
                  onRequestClose={() => {
                    toggleModal1();
                  }}>
                  <View
                    style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
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
                      <Text style={styles.title}>Make Payment</Text>
                    </View>
                    <View>
                      <View>
                        {
                          isPlatformPaid ?
                            <Text style={{ fontSize: 20 }}>Class Fee: ${_class.price}</Text>
                            :
                            <Text style={{ fontSize: 20 }} >Platform Fee: $4.99</Text>
                        }
                      </View>
                      <View>
                        <CardField
                          postalCodeEnabled={false}
                          placeholders={{
                            number: '4242 4242 4242 4242',
                          }}
                          cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                            borderColor: "#D6D6D6",
                            borderWidth: 1,
                            borderRadius: 10
                          }}
                          style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                          }}
                          onCardChange={(cardDetails) => {
                            console.log('cardDetails', cardDetails);
                            setCard(cardDetails)
                          }}
                          onFocus={(focusedField) => {
                            console.log('focusField', focusedField);
                          }}
                        />
                      </View>
                      <View>
                        <NativeButton onPress={handlePayPress} title="Pay" disabled={loading} />
                      </View>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="slide"
                  visible={isModal2}
                  onRequestClose={() => {
                    toggleModal2();
                  }}>
                  <View
                    style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                      <TouchableOpacity
                        onPress={() => {
                          toggleModal2();
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
                      <Text style={styles.title}>Create Dispute</Text>
                    </View>
                    <View>
                      <View>
                        <TextInput
                          autoCapitalize="words"
                          placeholder={"Description"}
                          style={{ borderColor: '#D6D6D6', borderRadius: 10, borderWidth: 1, textAlignVertical: 'top' }}
                          multiline={true}
                          maxLength={40}
                          numberOfLines={4}
                          scrollEnabled={false}
                          onChangeText={(text) => setReason(text)}
                        />
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                          onPress={() => {
                            dispute()
                          }}
                          style={{
                            backgroundColor: '#4B5F79',
                            padding: 10,
                            borderRadius: 5,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '300',
                              color: 'white',
                            }}>
                            Submit
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
                {
                  room !== null &&
                  <View style={styles.joinBox}>

                    <TouchableOpacity
                      onPress={() => {
                        console.log('room join')
                        joinRoom()
                      }}
                      style={{
                        backgroundColor: '#4B5F79',
                        padding: 10,
                        borderRadius: 5,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '300',
                          color: 'white',
                        }}>
                        Join Room
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                {(userType.toLowerCase() === 'user' && !isJoined) ? (
                  <View style={styles.joinBox}>
                    <TouchableOpacity
                      onPress={() => {
                        // isPlatformPaid ?
                        //   navigation.navigate('ClassPayScreen', {
                        //     classID: _class._id,
                        //     teacherID: _class.Teacher._id
                        //   })
                        //   :
                        //   navigation.navigate('PlatformPayScreen')
                        // joinClass(_class);
                        toggleModal1()
                      }}
                      style={{
                        backgroundColor: '#4B5F79',
                        padding: 10,
                        borderRadius: 5,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '300',
                          color: 'white',
                        }}>
                        {isPlatformPaid ? "Join Class" : "Subscribe Now!"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
                  :
                  (isDispute ?
                    <View style={styles.joinBox}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '300',
                          color: 'black',
                        }}>
                        Dispute has been sent to Admin.
                      </Text>
                    </View>
                    :
                    <View style={styles.joinBox}>
                      <TouchableOpacity
                        onPress={() => {
                          toggleModal2()
                          // dispute(_class, subscription)
                        }}
                        style={{
                          backgroundColor: '#4B5F79',
                          padding: 10,
                          borderRadius: 5,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '300',
                            color: 'white',
                          }}>
                          Dispute
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                <View style={styles.joinBox}>
                  <Text style={styles.cost}>Cost: &#36;{_class.price}</Text>
                </View>
                <View style={styles.joinBox}>
                  <Text style={styles.cost}>
                    Max. Students : {_class.maxStudents}
                  </Text>
                </View>

                {userType.toLowerCase() === 'user' && isJoined && chatFlag && (
                  <View style={styles.joinBox}>
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>
                      Languages
                    </Text>
                  </View>
                  <View style={styles.language}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.languageText}>{_class.language}</Text>
                    </View>
                  </View>
                </View>

                <Modal
                  animationType="slide"
                  visible={isModal}
                  onRequestClose={() => {
                    toggleModal();
                  }}>
                  <View
                    style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
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
                      {subjectText !== 'view' ? (
                        <Text style={styles.title}>Add {subjectText}</Text>
                      ) : (
                        <Text style={styles.title}>Details</Text>
                      )}
                    </View>
                    <View>
                      <ScrollView>
                        {subjectText !== 'view' ? (
                          <View>
                            <View style={{ marginVertical: 10 }}>
                              <Input
                                variant="outline"
                                placeholder="Description"
                                onChangeText={text => {
                                  setDescription(text);
                                }}
                              />
                            </View>

                            <View
                              style={{ marginVertical: 10, marginBottom: 40 }}>
                              <Button
                                title={'Submit'}
                                onPress={() => {
                                  addTA();
                                }}
                              />
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View style={styles.languageBoxLanguage}>
                              <View style={styles.languageWithIcon}>
                                <Text style={styles.languageAttributesHeading}>
                                  Topics
                                </Text>
                              </View>
                              {topics.length > 0 &&
                                topics.map((item, index) => {
                                  return (
                                    <View style={{ marginVertical: 5 }}>
                                      <Text>
                                        {index + 1} {'- '} {item.description}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>

                            <View style={styles.languageBoxLanguage}>
                              <View style={styles.languageWithIcon}>
                                <Text style={styles.languageAttributesHeading}>
                                  Announcements
                                </Text>
                              </View>
                              {announcements.length > 0 &&
                                announcements.map((item, index) => {
                                  return (
                                    <View style={{ marginVertical: 5 }}>
                                      <Text>
                                        {index + 1} {'- '} {item.description}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>
                      SCHEDULE
                    </Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    {schedule.map((item, index) => {
                      return (
                        <View key={index} style={{ marginVertical: 20 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>
                              Start Date: {formatDate(item.startdate)}{' '}
                            </Text>
                            <Text>{formatTime(item.startdate)}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>End Date: {formatDate(item.enddate)} </Text>
                            <Text>{formatTime(item.enddate)}</Text>
                          </View>
                          <View>
                            <Text>Max. Students: {item.maxStudents}</Text>
                          </View>
                          <View
                            style={{
                              marginVertical: 15,
                            }}>
                            <Divider width={1} />
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 10,
                              }}
                              onPress={() =>
                                setPropertySubjectText('view', item._id)
                              }>
                              <Text>View Details</Text>
                            </TouchableOpacity>
                            {/* <Divider orientation="vertical" width={3} />
                            <TouchableOpacity
                              style={{flexDirection: 'row'}}
                              onPress={() => {
                                setPropertySubjectText('Topic', item._id);
                              }}>
                              <Text>Add Topic</Text>
                            </TouchableOpacity>
                            <Divider orientation="vertical" width={3} />
                            <TouchableOpacity
                              style={{flexDirection: 'row'}}
                              onPress={() => {
                                setPropertySubjectText('Announement', item._id);
                              }}>
                              <Text>Add Announcement</Text>
                            </TouchableOpacity>
                            <Divider orientation="vertical" width={3} /> */}
                          </View>
                          <Divider width={1} />
                        </View>
                      );
                    })}
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView >
        )
        }
      </View >
    );
  }

  return (
    <>
      {userType.toLowerCase() === 'user' ? (
        <MainLayout Component={studentComponent()} />
      ) : (
        <MainLayout Component={component()} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  bannerImage: {
    width: 129,
    height: 92,
  },

  promoDisplayView: {
    width: '100%',
    marginTop: 30,
    borderRadius: 3,
    height: 110,
    borderColor: '#949599',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 2,
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textTransform: 'uppercase',
    fontFamily: 'roboto-light',
  },
  titleIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  promoNameText: {
    fontSize: 15,
    fontFamily: 'roboto-regular',
  },
  backIcon: {
    marginTop: 35,
    height: 17,
    width: 10,
  },

  classBoxImage: {
    // width: "100%",
    height: 266,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    justifyContent: 'flex-end',
    padding: 10,
  },
  classBoxText: {
    marginLeft: 7,
    color: '#FFFFFF',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  levelBox: {
    flexDirection: 'row',
    // position: "absolute",
    // bottom: 90,
    // left: 14,
    backgroundColor: 'transparent',
  },

  levelAdvance: {
    width: 4,
    height: 13,
    backgroundColor: '#FF6565',
    marginTop: 2,
  },

  levelBeginner: {
    width: 4,
    height: 13,
    backgroundColor: '#01C75D',
    marginTop: 2,
  },

  levelIntermediate: {
    width: 4,
    height: 13,
    backgroundColor: '#FFEB00',
    marginTop: 2,
  },
  classBoxName: {
    // position: "absolute",
    // bottom: 62,
    // left: 14,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'roboto-regular',
  },
  classBoxInstructor: {
    color: '#FFFFFF',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  classBoxDate: {
    // position: "absolute",
    // bottom: 23,
    // left: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  classBoxViews: {
    // position: "absolute",
    // bottom: 65,
    // right: 14,
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'roboto-regular',
  },
  classBoxSubscribers: {
    // position: "absolute",
    // bottom: 25,
    // right: 14,
    color: '#FFFFFF',
    fontSize: 18,
  },
  classBoxSubscribersIcon: {
    // position: "absolute",
    // bottom: 23,
    // right: 40,
    width: 35,
    height: 38,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 20,
    width: 23,
  },

  profileBox: {
    marginTop: 20,
    flexDirection: 'row',
  },
  profilePic: {
    width: 95,
    height: 114,
    borderRadius: 5,
  },

  info: {
    marginLeft: 20,
    position: 'relative',
  },

  name: {
    fontSize: 18,
    color: '#4B5F79',
    width: '100%',
    textTransform: 'uppercase',
    fontFamily: 'roboto-light',
  },
  languageBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    marginTop: 7,
  },

  languageHeader: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
  },

  dot: {
    height: 3,
    width: 3,
    backgroundColor: 'black',
    borderRadius: 50,
    margin: 5,
    marginTop: 10,
  },

  actionBox: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
  },

  envelopeIcon: {
    width: 21,
    height: 17,
  },

  joinBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },

  cost: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    color: '#4B5F79',
  },

  joinClassBtn: {
    height: 34,
    backgroundColor: '#4B5F79',
    borderRadius: 3,
    width: 113,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },

  joinText: {
    fontFamily: 'roboto-light',
    fontSize: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  heading: {
    fontSize: 20,
    fontFamily: 'roboto-light',
    marginTop: 40,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 15,
    fontFamily: 'roboto-light',
    marginTop: 5,
  },

  scrollView: {
    marginTop: 10,
    // marginHorizontal: -1,
  },

  classBoxWrapper: {
    height: '100%',
    width: 225,
    overflow: 'hidden',
    // marginBottom: 22,
    borderRadius: 5,
    marginRight: 15,
  },

  uploadBoxImage: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  uploadBox: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 15,
    bottom: 10,
  },

  uploadName: {
    color: '#ffffff',
    fontFamily: 'roboto-regular',
    fontSize: 16,
  },
  uploadDate: {
    color: '#FFFFFF',
    fontFamily: 'roboto-light',
    fontSize: 14,
  },

  removeBtn: {
    padding: 10,
    borderColor: '#4B5F79',
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    height: 44,
    marginBottom: 20,
  },

  removeText: {
    color: '#4B5F79',
    fontFamily: 'roboto-light',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  removeIcon: {
    width: 19,
    height: 5,
    marginLeft: 5,
  },
  reportBtn: {
    padding: 10,
    // borderColor: "#4B5F79",
    borderRadius: 7,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 44,
    marginBottom: 20,
    backgroundColor: '#FF6565',
  },
  reportText: {
    color: '#ffffff',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  reasonBox: {
    // marginTop: 10,
    // marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    borderColor: '#949599',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 8,
    fontFamily: 'roboto-light',
    fontSize: 16,
    height: 100,
  },
  languageBoxLanguage: {
    marginTop: 30,
  },

  languageWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  languageAttributesHeading: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'roboto-light',
  },
  language: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  languageText: {
    fontSize: 15,
    fontFamily: 'roboto-light',
  },
  dotLanguage: {
    height: 3,
    width: 3,
    backgroundColor: 'black',
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },
});
