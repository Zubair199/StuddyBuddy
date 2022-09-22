import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS } from '../services/api.constants';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';

export default function AssignmentDetailScreen({ route }) {
  const { assignmentID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userToken, userType } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken)
  const [assignment, setAssignment] = React.useState(null)
  const [studentAssignment, setStudentAssignment] = React.useState(null)
  const [studentAssignments, setStudentAssignments] = React.useState([])

  let [data, setData] = React.useState([])
  let [start, setStart] = React.useState(false)

  React.useEffect(() => {
    console.log(assignmentID);

    if (userType.toLowerCase() === "user") {
      studentApiCall()
    }
    else {
      teacherApiCall()
    }

  }, []);

  const teacherApiCall = () => {
    try {
      fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.GET_ASSIGNMENT_BY_ASSIGNMENT_ID + assignmentID)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('assignment ', responseJson.data)
          setAssignment(responseJson.data.assignment)
          setStudentAssignments(responseJson.data.studentAssignments)
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (exception) {
      console.log('exception ', exception)
    }
  }
  const studentApiCall = () => {
    try {
      fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_ASSIGNMENT_BY_STUDENT_ASSINGMENT_ID + assignmentID)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.data.status.toLowerCase() === 'started') {
            navigation.navigate('AssignmentStartScreen', { assignmentID: assignmentID })
          }
          console.log('assignment ', responseJson.data)
          setAssignment(responseJson.data.assignment)
          setStudentAssignment(responseJson.data)

        })
        .catch(err => {
          console.log(err)
        })
    }
    catch (exception) {
      console.log('exception ', exception)
    }
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
      fetch(AUTHENTICATIONS.API_URL + CLASS.START_ASSIGNMENT + id, requestObj)
        .then((response: any) => {
          console.log(response)
          navigation.navigate('AssignmentStartScreen',
            { assignmentID: assignmentID, studentAssignmentID: id })
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

  return (
    <SafeAreaView style={styles.container}>

      {
        <View>
          {/* <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15, }}>
            <TouchableOpacity style={{ marginTop: 5 }}
              onPress={() => navigation.goBack()}>
              <Icon color={'black'} name="leftcircleo" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Assignment Details</Text>
          </View> */}
          {
            userType.toLowerCase() === "user" ?
              (assignment !== null && studentAssignment !== null)
              &&
              <ScrollView style={{ padding: 15 }}>
                <View>
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
                      <Text style={styles.challengeBoxName}>{assignment.title}</Text>
                      <Text style={styles.challengeBoxDate}>
                        28-05-2022
                      </Text>
                    </View>
                  </ImageBackground>
                  <Text style={styles.text}>Score: {studentAssignment.score}</Text>

                  <Text style={styles.heading}>Details</Text>
                  <Text style={styles.text}>{assignment.description}</Text>
                  {
                    studentAssignment.status.toLowerCase() !== "completed" &&
                    <View style={{ marginVertical: 15 }}>
                      <Button title={'Start Assignment'}
                        onPress={
                          () => {
                            // setStart(!start); 
                            startAssginment(studentAssignment._id);
                          }
                        }
                      />
                    </View>
                  }

                </View>

              </ScrollView>
              :
              (assignment !== null)
              &&
              <ScrollView style={{ padding: 15 }}>
                <View>
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
                      <Text style={styles.challengeBoxName}>{assignment.title}</Text>
                      <Text style={styles.challengeBoxDate}>
                        28-05-2022
                      </Text>
                    </View>
                  </ImageBackground>
                  {/* <Text style={styles.text}>Score: {studentAssignment.score}</Text> */}

                  <Text style={styles.heading}>Details</Text>
                  <Text style={styles.text}>{assignment.description}</Text>
                </View>
                <View >
                  <Text style={styles.heading}>Scores</Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Student</Text>
                    <Text>Status</Text>
                    <Text>Score</Text>
                  </View>
                  <Divider />
                  {

                    studentAssignments.map((item, index) => (
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

              </ScrollView>

          }
        </View>
      }


    </SafeAreaView >
  )
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
});