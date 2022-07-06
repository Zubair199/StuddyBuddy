import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Alert, ImageBackground, Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AUTHENTICATIONS, CLASS } from '../services/api.constants';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Select, Input, TextArea, IconButton } from "native-base";
import api from "../services/api.services";
export default function ClassDetailScreen({ route }) {
  const { classID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userToken, userType } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken)


  const [_class, setClass] = React.useState(null)
  const [schedule, setSchedule] = React.useState([])
  const [topics, setTopics] = React.useState([])
  const [announcements, setAnnouncements] = React.useState([])


  const [teacher, setTeacher] = React.useState(null)
  const [isJoined, setIsJoined] = React.useState(false)

  const [description, setDescription] = React.useState("")
  const [scheduleID, setScheduleID] = React.useState("")

  const [studentIds, setStudentIds] = React.useState([])
  const [teacherId, setTeacherId] = React.useState([])

  React.useEffect(() => {
    console.log(user)
    fetch(AUTHENTICATIONS.API_URL + CLASS.JOINED_STUDENTS + classID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('JOINED_STUDENTS : = ', responseJson)
        setStudentIds(responseJson.students)
        setTeacherId(responseJson.teacher)
      })
      .catch(err => {
        console.log(err)
      })
    if (userType.toLowerCase() === "user") {
      studentApiCall();
    }
    else {
      teacherApiCall()
    }
  }, [])

  function teacherApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_CLASS_BY_CLASS_ID + classID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('details classes ', responseJson.schedules)
        setClass(responseJson.classes)
        setTeacher(responseJson.classes.Teacher)
        setSchedule(responseJson.schedules)
        console.log(responseJson.classes.schedules);

      })
      .catch(err => {
        console.log(err)
      })
  }
  function apiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_CLASS_BY_CLASS_ID + classID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.schedules)
        setClass(responseJson.classes)
        setTeacher(responseJson.classes.Teacher)
        setSchedule(responseJson.schedules)
      })
      .catch(err => {
        console.log(err)
      })
  }
  function studentApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_BY_ID + classID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.data)
        if (responseJson.data === null) {
          apiCall()
        }
        else {
          setClass(responseJson.data.Class)
          setIsJoined(responseJson.data.isJoined)
          setTeacher(responseJson.data.Teacher)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  function joinClass(props) {
    const body = {
      Teacher: props.Teacher._id,
      Student: user,
      Class: props._id
    }
    console.log(body)
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(AUTHENTICATIONS.API_URL + CLASS.JOIN_CLASS, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          Alert.alert(responseJson.message)
          studentApiCall()
        })
        .catch((err: any) => {
          console.log(err)
          console.log(err.response)
        })
    }
    catch (exception) {
      console.log('exception ', exception)
    }
  }
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  function formatTime(d) {
    var date = new Date(d)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const [subjectText, setSubjectText] = React.useState("")
  const [isModal, setIsModal] = React.useState(false)
  function toggleModal() {
    console.log("modal")
    setIsModal(!isModal)
  }
  function apiCallTopicAnnouncement(id) {

  }
  function setPropertySubjectText(x, id) {
    if (x === "view") {
      apiCallTopicAnnouncement(id)
      fetch(AUTHENTICATIONS.API_URL + CLASS.GET_TOPIC_ANNOUNCEMENT_BY_SCHEDULE_ID + id)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('json ', responseJson)
          setTopics(responseJson.topics)
          setAnnouncements(responseJson.announcements)

        })
        .catch(err => {
          console.log(err)
        })
    }
    setSubjectText(x)
    setScheduleID(id)
    toggleModal()
  }
  function addTA() {
    if (description !== "") {

      const body = {
        ClassSchedule: scheduleID,
        description: description,
      }
      console.log(body)
      let endpoint = ''
      if (subjectText.toLocaleLowerCase() === "topic") {
        endpoint = CLASS.CREATE_TOPIC
      }
      else {
        endpoint = CLASS.CREATE_ANNOUNCEMENT
      }
      console.log(endpoint);

      try {
        let requestObj = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
        fetch(AUTHENTICATIONS.API_URL + endpoint, requestObj)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            toggleModal()
            Alert.alert(responseJson.message)
          })
          .catch((err: any) => {
            console.log(err)
            console.log(err.response)
          })
      }
      catch (exception) {
        console.log('exception ', exception)
      }
    }
    else {
      Alert.alert("All Fields are required.")
    }
  }

  function groupChat() {
    console.log(studentIds, teacherId)
    const grUsers = studentIds.concat(teacherId)
    console.log(grUsers, classID)

    const requestData = { classId: classID, groupUsers: grUsers, flag: true };

    api.createNewMessage(requestData).then((resp) => {
      if (resp) {
        const newChatInfo = resp.data;
        if (newChatInfo && newChatInfo.data.chatId) {
          navigation.navigate("ChatScreenG", { chatId: newChatInfo.data.chatId, textMes: "", classID: classID });
        }
      }
    }).catch(e => { console.log(e) });

  }

  function component() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15 }}>
          <TouchableOpacity style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon color={'black'} name="leftcircleo" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Class Details</Text>
        </View>
        {
          (_class !== null && teacher !== null)
          &&
          <ScrollView style={{ marginBottom: "5%", padding: 15 }}>
            <View >
              {/* header starts here */}
              <View style={{ marginTop: 10 }}>
                <ImageBackground
                  resizeMode='cover'
                  source={require("../assets/images/bg.jpg")}
                  style={styles.classBoxImage}
                  imageStyle={{ borderRadius: 5 }}
                >
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

                {/* price tags start here */}
                {/* this will be render if student has not already joined the class */}
                {
                  (
                    userType.toLowerCase() === "user"
                    &&
                    !isJoined
                  )
                  &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity onPress={() => { joinClass(_class) }} style={{ backgroundColor: '#4B5F79', padding: 10, borderRadius: 5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: '300', color: "white" }}>Join Class</Text>
                    </TouchableOpacity>
                  </View>
                }

                <View style={styles.joinBox}>
                  <Text style={styles.cost}>
                    Cost: &#36;{12}
                    {/* Max. Students : {_class.maxStudents} */}
                  </Text>
                </View>
                {
                  userType.toLowerCase() === "teacher" &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                }
                {
                  (
                    userType.toLowerCase() === "user"
                    &&
                    isJoined
                  )
                  &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                }
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
                    <Text style={styles.languageAttributesHeading}>Languages</Text>
                  </View>
                  <View style={styles.language}>
                    <View
                      style={{ flexDirection: "row" }}
                    >
                      <Text style={styles.languageText}>{_class.language}</Text>
                    </View>
                  </View>
                </View>

                <Modal
                  animationType="slide"
                  visible={isModal}
                  onRequestClose={() => {
                    toggleModal();
                  }}
                >
                  <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
                    <View style={{ flexDirection: "row-reverse" }}>
                      <TouchableOpacity
                        onPress={
                          () => { toggleModal(); }
                        }
                      >
                        <Icon name='close' size={25} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
                      {
                        subjectText !== "view" ?
                          <Text style={styles.title}>Add {subjectText}</Text>
                          :
                          <Text style={styles.title}>Details</Text>
                      }
                    </View>
                    <View>
                      <ScrollView >
                        {
                          subjectText !== "view" ?
                            <View>
                              <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Description"
                                  onChangeText={(text) => { setDescription(text) }} />
                              </View>

                              <View style={{ marginVertical: 10, marginBottom: 40 }}>
                                <Button title={"Submit"} onPress={() => { addTA() }} />
                              </View>
                            </View>
                            :
                            <View>
                              <View style={styles.languageBoxLanguage}>
                                <View style={styles.languageWithIcon}>
                                  <Text style={styles.languageAttributesHeading}>Topics</Text>
                                </View>
                                {
                                  topics.length > 0 &&
                                  topics.map((item, index) => {
                                    return (
                                      <View style={{ marginVertical: 5 }}>
                                        <Text>{index + 1} {"- "} {item.description}</Text>
                                      </View>
                                    )
                                  })
                                }
                              </View>

                              <View style={styles.languageBoxLanguage}>
                                <View style={styles.languageWithIcon}>
                                  <Text style={styles.languageAttributesHeading}>Announcements</Text>
                                </View>
                                {
                                  announcements.length > 0 &&
                                  announcements.map((item, index) => {
                                    return (
                                      <View style={{ marginVertical: 5 }}>
                                        <Text>{index + 1} {"- "} {item.description}</Text>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                            </View>
                        }



                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>SCHEDULE</Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    {
                      schedule.map((item, index) => {
                        return (
                          <View key={index} style={{ marginVertical: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                              <Text>Start Date: {" "}{formatDate(item.startdate)}{" "}</Text>
                              <Text>{formatTime(item.startdate)}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text>End Date: {" "}{formatDate(item.enddate)}{" "}</Text>
                              <Text>{formatTime(item.enddate)}</Text>
                            </View>
                            <View>
                              <Text>Max. Students:{" "} {item.maxStudents}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setPropertySubjectText("view", item._id)}>
                                <Text >View Details</Text>
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setPropertySubjectText("Topic", item._id) }}>
                                <Text>Add Topic</Text>
                                {/* <Icon name="plus" size={20} /> */}
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setPropertySubjectText("Announement", item._id) }}>
                                <Text>Add Announcement</Text>
                                {/* <Icon name="plus" size={20} /> */}
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                            </View>
                            <Divider width={1} />

                          </View>
                        )
                      })
                    }
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
                {
        /*classData.documents.length === 0 ? null : (
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

        }

      </View>

    )
  }
  function studentComponent() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15 }}>
          <TouchableOpacity style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon color={'black'} name="leftcircleo" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Class Details</Text>
        </View>
        {
          (_class !== null && teacher !== null)
          &&
          <ScrollView style={{ marginBottom: "5%", padding: 15 }}>
            <View >
              {/* header starts here */}
              <View style={{ marginTop: 10 }}>
                <ImageBackground
                  resizeMode='cover'
                  source={require("../assets/images/bg.jpg")}
                  style={styles.classBoxImage}
                  imageStyle={{ borderRadius: 5 }}
                >
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

                {/* price tags start here */}
                {/* this will be render if student has not already joined the class */}
                {
                  (
                    userType.toLowerCase() === "user"
                    &&
                    !isJoined
                  )
                  &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity onPress={() => { joinClass(_class) }} style={{ backgroundColor: '#4B5F79', padding: 10, borderRadius: 5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: '300', color: "white" }}>Join Class</Text>
                    </TouchableOpacity>
                  </View>
                }

                <View style={styles.joinBox}>
                  <Text style={styles.cost}>
                    Cost: &#36;{12}
                    {/* Max. Students : {_class.maxStudents} */}
                  </Text>
                </View>
                {
                  userType.toLowerCase() === "teacher" &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                }
                {
                  (
                    userType.toLowerCase() === "user"
                    &&
                    isJoined
                  )
                  &&
                  <View style={styles.joinBox}>
                    <TouchableOpacity style={{ marginTop: 5 }}
                      onPress={() => groupChat()}>
                      <Icon color={'black'} name="message1" size={25} />
                    </TouchableOpacity>
                  </View>
                }
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
                    <Text style={styles.languageAttributesHeading}>Languages</Text>
                  </View>
                  <View style={styles.language}>
                    <View
                      style={{ flexDirection: "row" }}
                    >
                      <Text style={styles.languageText}>{_class.language}</Text>
                    </View>
                  </View>
                </View>

                <Modal
                  animationType="slide"
                  visible={isModal}
                  onRequestClose={() => {
                    toggleModal();
                  }}
                >
                  <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
                    <View style={{ flexDirection: "row-reverse" }}>
                      <TouchableOpacity
                        onPress={
                          () => { toggleModal(); }
                        }
                      >
                        <Icon name='close' size={25} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
                      {
                        subjectText !== "view" ?
                          <Text style={styles.title}>Add {subjectText}</Text>
                          :
                          <Text style={styles.title}>Details</Text>
                      }
                    </View>
                    <View>
                      <ScrollView >
                        {
                          subjectText !== "view" ?
                            <View>
                              <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Description"
                                  onChangeText={(text) => { setDescription(text) }} />
                              </View>

                              <View style={{ marginVertical: 10, marginBottom: 40 }}>
                                <Button title={"Submit"} onPress={() => { addTA() }} />
                              </View>
                            </View>
                            :
                            <View>
                              <View style={styles.languageBoxLanguage}>
                                <View style={styles.languageWithIcon}>
                                  <Text style={styles.languageAttributesHeading}>Topics</Text>
                                </View>
                                {
                                  topics.length > 0 &&
                                  topics.map((item, index) => {
                                    return (
                                      <View style={{ marginVertical: 5 }}>
                                        <Text>{index + 1} {"- "} {item.description}</Text>
                                      </View>
                                    )
                                  })
                                }
                              </View>

                              <View style={styles.languageBoxLanguage}>
                                <View style={styles.languageWithIcon}>
                                  <Text style={styles.languageAttributesHeading}>Announcements</Text>
                                </View>
                                {
                                  announcements.length > 0 &&
                                  announcements.map((item, index) => {
                                    return (
                                      <View style={{ marginVertical: 5 }}>
                                        <Text>{index + 1} {"- "} {item.description}</Text>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                            </View>
                        }



                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <View style={styles.languageBoxLanguage}>
                  <View style={styles.languageWithIcon}>
                    <Text style={styles.languageAttributesHeading}>SCHEDULE</Text>
                  </View>
                  <View style={{ marginBottom: 25 }}>
                    {
                      schedule.map((item, index) => {
                        return (
                          <View key={index} style={{ marginVertical: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                              <Text>Start Date: {" "}{formatDate(item.startdate)}{" "}</Text>
                              <Text>{formatTime(item.startdate)}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Text>End Date: {" "}{formatDate(item.enddate)}{" "}</Text>
                              <Text>{formatTime(item.enddate)}</Text>
                            </View>
                            <View>
                              <Text>Max. Students:{" "} {item.maxStudents}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => setPropertySubjectText("view", item._id)}>
                                <Text >View Details</Text>
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setPropertySubjectText("Topic", item._id) }}>
                                <Text>Add Topic</Text>
                                {/* <Icon name="plus" size={20} /> */}
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setPropertySubjectText("Announement", item._id) }}>
                                <Text>Add Announcement</Text>
                                {/* <Icon name="plus" size={20} /> */}
                              </TouchableOpacity>
                              <Divider orientation="vertical" width={3} />
                            </View>
                            <Divider width={1} />

                          </View>
                        )
                      })
                    }
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
                {
        /*classData.documents.length === 0 ? null : (
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

        }

      </View>

    )
  }
  return (
    <>
      {
        userType.toLowerCase() === "user" ?
          <MainLayout Component={studentComponent()} />
          :
          <MainLayout Component={component()} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  bannerImage: {
    width: 129,
    height: 92,
  },

  promoDisplayView: {
    width: "100%",
    marginTop: 30,
    borderRadius: 3,
    height: 110,
    borderColor: "#949599",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    padding: 2,
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },
  titleIconBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  promoNameText: {
    fontSize: 15,
    fontFamily: "roboto-regular"
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
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    justifyContent: "flex-end",
    padding: 10,
  },
  classBoxText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "uppercase",
  },
  levelBox: {
    flexDirection: "row",
    // position: "absolute",
    // bottom: 90,
    // left: 14,
    backgroundColor: "transparent",
  },

  levelAdvance: {
    width: 4,
    height: 13,
    backgroundColor: "#FF6565",
    marginTop: 2,
  },

  levelBeginner: {
    width: 4,
    height: 13,
    backgroundColor: "#01C75D",
    marginTop: 2,
  },

  levelIntermediate: {
    width: 4,
    height: 13,
    backgroundColor: "#FFEB00",
    marginTop: 2,
  },
  classBoxName: {
    // position: "absolute",
    // bottom: 62,
    // left: 14,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
  },
  classBoxInstructor: {
    color: "#FFFFFF",
    fontSize: 15,
    textTransform: "capitalize"
  },
  classBoxDate: {
    // position: "absolute",
    // bottom: 23,
    // left: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },
  classBoxViews: {
    // position: "absolute",
    // bottom: 65,
    // right: 14,
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "roboto-regular",
  },
  classBoxSubscribers: {
    // position: "absolute",
    // bottom: 25,
    // right: 14,
    color: "#FFFFFF",
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
    position: "absolute",
    top: 10,
    right: 10,
    height: 20,
    width: 23,
  },

  profileBox: {
    marginTop: 20,
    flexDirection: "row",
  },
  profilePic: {
    width: 95,
    height: 114,
    borderRadius: 5,
  },

  info: {
    marginLeft: 20,
    position: "relative",
  },

  name: {
    fontSize: 18,
    color: "#4B5F79",
    width: "100%",
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },
  languageBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    marginTop: 7,
  },

  languageHeader: {
    fontSize: 14,
    fontFamily: "roboto-regular",
  },

  dot: {
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 50,
    margin: 5,
    marginTop: 10,
  },

  actionBox: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    flex: 1,
  },

  envelopeIcon: {
    width: 21,
    height: 17,
  },

  joinBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },

  cost: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    color: "#4B5F79",
  },

  joinClassBtn: {
    height: 34,
    backgroundColor: "#4B5F79",
    borderRadius: 3,
    width: 113,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },

  joinText: {
    fontFamily: "roboto-light",
    fontSize: 15,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },

  heading: {
    fontSize: 20,
    fontFamily: "roboto-light",
    marginTop: 40,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 15,
    fontFamily: "roboto-light",
    marginTop: 5,
  },

  scrollView: {
    marginTop: 10,
    // marginHorizontal: -1,
  },

  classBoxWrapper: {
    height: "100%",
    width: 225,
    overflow: "hidden",
    // marginBottom: 22,
    borderRadius: 5,
    marginRight: 15,
  },

  uploadBoxImage: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  uploadBox: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 15,
    bottom: 10,
  },

  uploadName: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 16,
  },
  uploadDate: {
    color: "#FFFFFF",
    fontFamily: "roboto-light",
    fontSize: 14,
  },

  removeBtn: {
    padding: 10,
    borderColor: "#4B5F79",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    height: 44,
    marginBottom: 20,
  },

  removeText: {
    color: "#4B5F79",
    fontFamily: "roboto-light",
    fontSize: 16,
    textTransform: "uppercase",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 44,
    marginBottom: 20,
    backgroundColor: "#FF6565",
  },
  reportText: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 16,
    textTransform: "uppercase",
  },

  reasonBox: {
    // marginTop: 10,
    // marginBottom: 10,
    width: "100%",
    borderRadius: 5,
    borderColor: "#949599",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    padding: 8,
    fontFamily: "roboto-light",
    fontSize: 16,
    height: 100,
  },
  languageBoxLanguage: {
    marginTop: 30,
  },

  languageWithIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  languageAttributesHeading: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "200",
    fontFamily: "roboto-light",
  },
  language: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  languageText: {
    fontSize: 15,
    fontFamily: "roboto-light",
  },
  dotLanguage: {
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },
});
