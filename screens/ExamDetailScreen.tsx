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

export default function ExamDetailScreen({ route }) {
  const { examID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userToken } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken)
  const [exam, setAssignment] = React.useState(null)
  const [startExam, setStudentExam] = React.useState(null)

  let [data, setData] = React.useState([])
  let [start, setStart] = React.useState(false)

  React.useEffect(() => {
    console.log(user)
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_EXAM_BY_STUDENT_EXAM_ID + examID)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.status.toLowerCase() === 'started') {
          navigation.navigate('ExamStartScreen', { examID: examID })
        }
        console.log('exam ', responseJson.data)
        setAssignment(responseJson.data.exam)
        setStudentExam(responseJson.data)
        let arr = Array.from({ length: responseJson.data.questioncount }, (_, i) => i + 1)
        console.log(arr)
        setData(arr)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

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

  function component() {
    return (
      <View style={styles.container}>

        {
          <View>
            <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15, }}>
              <TouchableOpacity style={{ marginTop: 5 }}
                onPress={() => navigation.goBack()}>
                <Icon color={'black'} name="leftcircleo" size={25} />
              </TouchableOpacity>
              <Text style={styles.title}>Exam Details</Text>
            </View>
            {
              (exam !== null && startExam !== null)
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
                      <Text style={styles.challengeBoxName}>{exam.title}</Text>
                      <Text style={styles.challengeBoxDate}>
                        28-05-2022
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
  return (
    <MainLayout Component={component()} />
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