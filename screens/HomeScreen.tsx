import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import ClassSlider from '../components/ClassSlider';
import Icon from 'react-native-vector-icons/AntDesign';

import { FAB } from 'react-native-elements';
import AssignmentSlider from '../components/AssignmentSlider';
import ExamSlider from '../components/ExamSlider';
import AddAssignmentScreen from './AddAssignment';
import { FormControl, Modal, Button, Divider } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS, EXAM } from '../services/api.constants';
import TeacherClassSlider from '../components/TeacherClassSlider';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';
import TeacherAssignmentSlider from '../components/TeacherAssignmentSlider';
import TeacherExamSlider from '../components/TeacherExamSlider';

export default function HomeScreen() {
  const { userToken, userType } = React.useContext(AuthContext);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);

  const [classes, setClasses] = React.useState([])
  const [exams, setExams] = React.useState([])
  const [assignments, setAssignments] = React.useState([])
  let [user, setUser] = React.useState(userToken)

  React.useEffect(() => {
    console.log("HomeScreen", userType)
    if (userType.toLowerCase() === "user") {
      studentApiCall()
    }
    else {
      teacherApiCall()
    }
  }, [isFocused])

  function teacherApiCall() {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_ALL_ACTIVE_UPCOMING_CLASSES_BY_TEACHER_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.classes)
        console.log('schedules ', responseJson.schedules)
        let _classes = []
        responseJson.classes.forEach(item => {
          let classScheule = responseJson.schedules.filter(schedule => schedule.Class === item._id)
          console.log(classScheule)
          if (classScheule.length > 0) {
            _classes.push({
              class: item,
              schedule: classScheule
            })
          }
        })
        console.log("_classes=> ", _classes)
        setClasses(_classes)
      })
      .catch(err => {
        console.log(err)
      })
    fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.GET_ALL_ACTIVE_ASSIGNMENTS_BY_TEACHER_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('assignments ', responseJson.data)
        setAssignments(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })
    fetch(AUTHENTICATIONS.API_URL + EXAM.GET_ALL_ACTIVE_EXAMS_BY_TEACHER_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('exams ', responseJson.data)
        setExams(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })

  }
  function studentApiCall() {
    console.log("call", userType)
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_STUDENT_UPCOMING_CLASSES + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.data)
        setClasses(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_ASSIGNMENTS_BY_STUDENT_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('assignments ', responseJson.data)
        setAssignments(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_JOINED_CLASS_EXAMS_BY_STUDENT_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('exams ', responseJson.data)
        setExams(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })


  }
  function component() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        {/* <AddAssignmentScreen/> */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>What do you want to add?</Modal.Header>
            <Modal.Body>
              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                  onPress={() =>
                    navigation.navigate('AddClass')
                  }
                >
                  <Text style={styles.title}>
                    Class
                  </Text>
                  <Icon name="right" size={20} />
                </TouchableOpacity>
              </View>
              <Divider my="2" _light={{
                bg: "muted.300"
              }} />
              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                  onPress={() =>
                    navigation.navigate('AddAssignment')
                  }
                >
                  <Text style={styles.title}>
                    Assignment
                  </Text>
                  <Icon name="right" size={20} />
                </TouchableOpacity>
              </View>
              <Divider my="2" _light={{
                bg: "muted.300"
              }} />
              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                  onPress={() =>
                    navigation.navigate('AddExam')
                  }
                >
                  <Text style={styles.title}>
                    Exam
                  </Text>
                  <Icon name="right" size={20} />
                </TouchableOpacity>

              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <ScrollView style={{ padding: 10 }}>
          <View>
            {
              userType.toLowerCase() === "teacher" &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginVertical: 10 }}>
                <TextInput placeholder='Search...' style={{ width: '70%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, height: 45 }} />
                <TouchableOpacity>
                  <Icon name="search1" size={20} style={{ marginLeft: -35 }} />
                </TouchableOpacity>
                <Button style={{ backgroundColor: '#3878ee' }} onPress={() => setShowModal(true)} >
                  Add New...
                </Button>
              </View>
            }
          </View>
          <View style={{ marginVertical: 10 }}>
            {
              userType.toLowerCase() === "user" ?
                <ClassSlider data={classes} categoryText={"My Upcoming Classes"} screen={"ClassDetails"} />
                :
                <TeacherClassSlider data={classes} categoryText={"My Upcoming Classes"} screen={"ClassDetails"} />
            }
          </View>
          <View style={{ marginVertical: 10 }}>
            {
              userType.toLowerCase() === "user" ?
                <AssignmentSlider data={assignments} categoryText={"My Assignments"} screen={"AssignmentDetails"} />
                :
                <TeacherAssignmentSlider data={assignments} categoryText={"My Assignments"} screen={"AssignmentDetails"} />
            }
          </View>
          <View style={{ marginVertical: 10, paddingBottom: 10 }}>
            {
              userType.toLowerCase() === "user" ?
                <ExamSlider data={exams} categoryText={"My Exams"} screen={"ExamDetails"} />
                :
                <TeacherExamSlider data={exams} categoryText={"My Exams"} screen={"ExamDetails"} />
            }
          </View>
        </ScrollView>
        {/* <FAB title={<Icon name="plus" size={20} color={'white'} style={{fontWeight: 'bold'}}/>} color='#3878ee' placement='right' style={{ marginBottom: '25%' }} onPress={()=>{toggleModal()}}/> */}

      </View>
    )
  }

  return (
    <MainLayout Component={component()} />
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    fontWeight: '300',
    textTransform: "uppercase",
  },
  cancel: {
    fontWeight: '400',
    color: 'red',
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: "uppercase",
  }
})
