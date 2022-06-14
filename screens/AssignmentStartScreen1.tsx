import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Divider, Radio } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS } from '../services/api.constants';
import MainLayout from './MainLayout';

export default function AssignmentStartScreen({ route }) {
  const { assignmentID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [assignments, setAssignments] = React.useState(null)
  let [data, setData] = React.useState([])
  let [start, setStart] = React.useState(false)

  React.useEffect(() => {

    fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.GET_ASSIGNMENT_QUESTIONS_BY_ASSIGNEMNT_ID + assignmentID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('assignment questions ', responseJson.data)
        setAssignments(responseJson.data)
        let x = new Array()
        responseJson.data.forEach((item, index) => {
          x.push(
            {
              id: item._id,
              question: item.question,
              teacherAnswer: item.answer,
              studentAnswer: '',
            }
          )
        })
        console.log(x)
        setData(x);
        // let arr = Array.from({ length: responseJson.data.assignment.questioncount }, (_, i) => i + 1)
        // console.log(arr)
        // setData(arr)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  function storeAnswers(assignmentObject, value) {
    console.log('data => ', data)
    console.log(assignmentObject)
    console.log(value)
    let obj = {
      id: assignmentObject._id,
      question: assignmentObject.question,
      teacherAnswer: assignmentObject.answer,
      studentAnswer: value,
    }
    console.log(obj)
    let existingValues = data.filter((item, index) => console.log(item.id))
    console.log(existingValues)

  }
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
          {/* <TouchableOpacity style={{ marginTop: 5 }}
                  onPress={() => setStart(false)}>
                  <Icon color={'black'} name="leftcircleo" size={25} />
                </TouchableOpacity> */}
          <Text style={styles.title}>Assignment Questions</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: "center" }}> */}
        {/* <TouchableOpacity style={{ marginTop: 5 }}
                  onPress={() => setStart(false)}>
                  <Icon color={'black'} name="leftcircleo" size={25} />
                </TouchableOpacity> */}
        {/* <Text style={styles.subtitle}>Remaining Time : 60 mins</Text> */}
        {/* </View> */}
        {
          assignments !== null &&
          <ScrollView style={{ padding: 15, marginBottom: '20%' }}>
            {
              assignments.map((assignment, index) => (
                <View key={index} style={{ marginVertical: 10 }}>
                  <View>
                    <Text style={{ fontSize: 20, marginLeft: 15 }}>Q{index + 1}: {assignment.question}</Text>
                  </View>
                  <View style={{ marginVertical: 15 }}>

                    <Radio.Group
                      name="myRadioGroup"
                      onChange={(value) => {
                        storeAnswers(assignment, value);
                      }}
                    >
                      <Radio value={assignment.option1} my="1">
                        {assignment.option1}
                      </Radio>
                      <Radio value={assignment.option2} my="1">
                        {assignment.option2}
                      </Radio>
                      <Radio value={assignment.option3} my="1">
                        {assignment.option3}
                      </Radio>
                      <Radio value={assignment.option4} my="1">
                        {assignment.option4}
                      </Radio>
                    </Radio.Group>
                  </View>
                  <Divider />
                </View>
              ))
            }
          </ScrollView>
        }
      </View>
    </View >
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
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },
  subtitle: {
    fontSize: 20,
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