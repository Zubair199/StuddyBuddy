import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS, EXAM } from '../services/api.constants';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';
import { app } from '../constants/themeColors';

export default function ExamDetailScreen({ route }) {
  const { examID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userToken, userType } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken)
  const [exam, setExam] = React.useState(null)
  const [examQuestions, setExamQuestions] = React.useState([])
  const [startExam, setStudentExam] = React.useState(null)
  const [studentExams, setStudentExams] = React.useState([])
  let [questionsCount, setQuestionsCount] = React.useState(0)

  let [data, setData] = React.useState([])
  let [start, setStart] = React.useState(false)

  React.useEffect(() => {
    console.log(userType)
    if (userType.toLowerCase() === "user") {
      studentApiCall();
    }
    else {
      teacherApiCall()
    }
  }, []);

  function teacherApiCall() {
    fetch(AUTHENTICATIONS.API_URL + EXAM.GET_EXAM_BY_EXAM_ID + examID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('exam ', responseJson.examQuestionsCount)
        setExam(responseJson.data)
        setExamQuestions(responseJson.questions)
        setStudentExams(responseJson.studentExams)
        setQuestionsCount(responseJson.examQuestionsCount)

        // setStudentExam(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function studentApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_EXAM_BY_STUDENT_EXAM_ID + examID)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.status.toLowerCase() === 'started') {
          navigation.navigate('ExamStartScreen', { examID: examID })
        }
        console.log('exam ', responseJson.data)
        setExam(responseJson.data.exam)
        setStudentExam(responseJson.data)
        let arr = Array.from({ length: responseJson.data.questioncount }, (_, i) => i + 1)
        console.log(arr)
        setData(arr)
        setQuestionsCount(responseJson.data.examQuestionsCount)

      })
      .catch(err => {
        console.log(err)
      })
  }

  const startAssginment = (id) => {
    try {
      console.log(id)
      let requestObj = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: "Started" })
      }
      fetch(AUTHENTICATIONS.API_URL + CLASS.START_EXAM + id, requestObj)
        .then((response: any) => {
          console.log(response)
          navigation.navigate('ExamStartScreen',
            { examID: examID, studentExamID: id })
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
    console.log(new Date(date))
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
  function component() {
    return (
      <View style={styles.container}>

        {
          <View>
            {/* <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15, }}>
              <TouchableOpacity style={{ marginTop: 5 }}
                onPress={() => navigation.goBack()}>
                <Icon color={'black'} name="leftcircleo" size={25} />
              </TouchableOpacity>
              <Text style={styles.title}>Exam Details</Text>
            </View> */}
            {
              (exam !== null)
              &&
              <ScrollView >
                <View style={{ padding: 15 }}>
                  <ImageBackground
                    resizeMode='cover'
                    source={require('../assets/images/bg.jpg')}
                    style={styles.challengeBoxImage}
                    imageStyle={{ borderRadius: 5 }}
                  >
                    <View style={styles.overlay}>
                      <View style={styles.challengeTypeOverLay}>
                        <Text style={styles.challengeBoxText}>
                          Virtual
                        </Text>
                      </View>
                      <Text style={styles.challengeBoxName}>{exam.title}</Text>
                      <Text style={styles.challengeBoxDate}>
                        Start DateTime: {formatDate(exam.startdate)} {formatTime(exam.startdate)}
                      </Text>
                      <Text style={styles.challengeBoxDate}>
                        End DateTime: {formatDate(exam.enddate)} {formatTime(exam.enddate)}
                      </Text>
                    </View>
                  </ImageBackground>

                  <View style={{ paddingTop: 15 }}>
                    {
                      questionsCount > 0 ?
                        <></>
                        // <TouchableOpacity style={[styles.segmentButtons, { backgroundColor: app.lightBlue }]} onPress={() => { }}>
                        //   <Text style={styles.buttonText}> View Questions </Text>
                        // </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.segmentButtons, { backgroundColor: app.lightBlue }]} onPress={() => { navigation.navigate('AddExamQuestions', { examID: exam._id }) }}>
                          <Text style={styles.buttonText}> Add Questions </Text>
                        </TouchableOpacity>

                    }
                  </View>

                  <Text style={styles.heading}>Details</Text>
                  <Text style={styles.text}>{exam.description}</Text>
                  <View >

                    <Text style={styles.heading}>Scores</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text>Student</Text>
                      <Text>Status</Text>
                      <Text>Score</Text>
                    </View>
                    <Divider />
                    {

                      studentExams.map((item, index) => (
                        <View key={index}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>{item.student.username}</Text>
                            <Text>{item.status}</Text>
                            <Text>{item.score}</Text>

                          </View>
                          <Divider />
                        </View >
                      ))
                    }
                  </View>
                </View>
                {/* <View>
                  <Text style={styles.heading}>Questions</Text>
                  {
                    examQuestions.length > 0 &&
                    examQuestions.map((item, index) => (
                      <View key={index}>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Question {index + 1}: {item.question}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Answer 1: {item.answer1}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Answer 2: {item.answer2}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Answer 3: {item.answer3}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Answer 4: {item.answer4}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                          <Text style={{ fontWeight: '400' }}>Right Answer : {item.answer}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View> */}

              </ScrollView>
            }
          </View>
        }


      </View >
    )
  }
  function studentComponent() {
    return (
      <View style={styles.container}>

        {
          <View>
            {
              (exam !== null && startExam !== null)
              &&
              <ScrollView>
                <View style={{ padding: 15 }}>
                  <ImageBackground
                    resizeMode='cover'
                    source={require('../assets/images/bg.jpg')}
                    style={styles.challengeBoxImage}
                    imageStyle={{ borderRadius: 5 }}
                  >
                    <View style={styles.overlay}>
                      <View style={styles.challengeTypeOverLay}>
                        <Text style={styles.challengeBoxText}>
                          Virtual
                        </Text>
                      </View>
                      <Text style={styles.challengeBoxName}>{exam.title}</Text>
                      <Text style={styles.challengeBoxDate}>
                        Start DateTime: {formatDate(exam.startdate)} {formatTime(exam.startdate)}
                      </Text>
                      <Text style={styles.challengeBoxDate}>
                        End DateTime: {formatDate(exam.enddate)} {formatTime(exam.enddate)}
                      </Text>
                    </View>
                  </ImageBackground>
                  <Text style={styles.text}>Score: {startExam.score}</Text>

                  <Text style={styles.heading}>Details</Text>
                  <Text style={styles.text}>{exam.description}</Text>
                  {
                    startExam.status.toLowerCase() !== "completed" &&
                    <View style={{ marginVertical: 15 }}>
                      <Button title={'Start Exam'}
                        onPress={
                          () => {
                            // setStart(!start); 
                            startAssginment(startExam._id);
                          }
                        }
                      />
                    </View>
                  }

                </View>

              </ScrollView>
            }
          </View>
        }


      </View >
    )
  }
  if (userType.toLowerCase() === "user") {
    return (
      studentComponent()
    )
  }
  else {
    return (
      component()
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1
  },

  challengeBoxImage: {
    height: 266,
  },

  challengeBoxDate: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  challengeTypeBox: {
    paddingLeft: 0,
    flex: 1,
  },

  challengeTypeOverLay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 30,
    justifyContent: "center"
  },

  challengeBoxText: {
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 5,
  },

  title: {
    fontSize: 25,
    marginLeft: 15,
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    justifyContent: "flex-end",
    padding: 10,
    overflow: "hidden"
  },

  challengeBoxName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
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

  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  segmentButtons: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
    // marginVertical: 5,    
    width: '100%'
  },
});