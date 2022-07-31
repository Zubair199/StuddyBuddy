import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { Select, Input, TextArea, IconButton } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS, EXAM } from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';

const radioButtonsData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Virtual',
  value: 'Virtual'
}, {
  id: '2',
  label: 'InClass',
  value: 'InClass'
}]
export default function AddExamScreen() {

  const { userToken, userType } = React.useContext(AuthContext);

  const [value, setValue] = React.useState('first');
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [_date, _setDate] = React.useState('')
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [response, setResponse] = React.useState<any>(null);
  const navigation = useNavigation();

  function openDatePicker() {
    setOpen(true)
  }
  function openDatePicker1() {
    setOpen1(true)
  }
  let [_startdate, _setStartdate] = React.useState(new Date())
  let [_enddate, _setEnddate] = React.useState(new Date())


  let [user, setUser] = React.useState(userToken)

  let [selectedClass, setSelectedClass] = React.useState(null)

  let [_class, setClass] = React.useState('')
  let [title, setTitle] = React.useState('')
  let [description, setDescription] = React.useState('')
  let [startdate, setStartdate] = React.useState('')
  let [enddate, setEnddate] = React.useState('')
  let [subject, setSubject] = React.useState('')
  let [questionCount, setQuestionCount] = React.useState('')
  let [subjectID, setSubjectID] = React.useState("")

  let [loader, setLoader] = React.useState(true)

  const [classes, setClasses] = React.useState([])


  function AddExam() {
    if (title === '' && startdate === '' && enddate === '' && subject === '' && questionCount === '' && description === '') {
      Alert.alert(
        "All Fields are required",
      );
    }
    else {
      const body = {
        class: _class,
        teacher: user,
        title: title,
        startdate: startdate,
        enddate: enddate,
        subject: subjectID,
        questioncount: questionCount,
        description: description
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
        fetch(AUTHENTICATIONS.API_URL + EXAM.CREATE, requestObj)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('exam responseJson => ', responseJson)
            navigation.navigate('AddExamQuestions', { examID: responseJson.examID })
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
  }
  React.useEffect(() => {
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_ALL_ACTIVE_CLASSES_BY_TEACHER_ID + user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.classes)
        setClasses(responseJson.classes)
        setLoader(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (loader) {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ padding: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingTop: 29, marginRight: 70 }}>
              <TouchableOpacity
                onPress={
                  () => { navigation.navigate('HomeScreen') }
                }
              >
                <Icon name='leftcircleo' size={25} style={{ fontWeight: '600' }} />
              </TouchableOpacity>
            </View>
            <View >
              <Text style={styles.title}>Add Exam</Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Select accessibilityLabel="Choose Subject" placeholder="Choose Class"
              onValueChange={
                itemValue => {
                  setClass(itemValue);
                  let res = classes.filter(item => item._id === itemValue);
                  console.log(res)
                  if (res.length > 0) {
                    setSubjectID(res[0].Subject._id)
                    setSubject(res[0].Subject.name)
                    setSelectedClass(res);
                  }
                }
              }
            >
              {
                classes.length > 0 &&
                classes.map((item, index) => {
                  return (
                    <Select.Item key={index} label={item.name} value={item._id} />
                  )
                })
              }
            </Select>

          </View>
          <View style={{ marginVertical: 10 }}>
            <Input variant="outline" placeholder="Enter Title"
              onChangeText={(text) => { setTitle(text) }} />
          </View>

          {/* <View style={{ marginVertical: 10 }}>
            <Select accessibilityLabel="Choose Subject" placeholder="Choose Subject" onValueChange={itemValue => setSubject(itemValue)}>
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
              <Select.Item label="Cross Platform Development" value="cross" />
              <Select.Item label="UI Designing" value="ui" />
              <Select.Item label="Backend Development" value="backend" />
            </Select>

          </View> */}
          <View style={{ marginVertical: 10 }}>
            <Input variant="outline" placeholder="Subject" value={subject} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Input
                w={'88%'}
                editable={false}
                variant="outline"
                defaultValue={startdate}
                placeholder="Start Date"
              />
              <IconButton
                icon={
                  <Icon
                    name="calendar"
                    style={{ marginRight: 15 }}
                    size={25}
                    onPress={() => { console.log("preess"); openDatePicker() }}
                  />
                }
              />
              {/* <TouchableOpacity
                style={{ marginTop: 10, marginLeft: 8 }}
                onPress={() =>{ console.log("preess"); openDatePicker()}}
              >
                <Icon
                  name="calendar"
                  style={{ marginRight: 15 }}
                  size={25}
                />
              </TouchableOpacity> */}
            </View>
            <DatePicker
              modal
              open={open}
              date={_startdate}
              onConfirm={(text) => {
                _setStartdate(text)
                setStartdate(text.toString())
                setOpen(false)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Input
                w={'88%'}
                editable={false}
                variant="outline"
                defaultValue={enddate}
                placeholder="End Date"
              />
              <IconButton
                icon={
                  <Icon
                    name="calendar"
                    style={{ marginRight: 15 }}
                    size={25}
                    onPress={() => { console.log("preess1"); openDatePicker1() }}
                  />
                }
              />
              {/* <TouchableOpacity
                style={{ marginTop: 10, marginLeft: 8 }}
                onPress={() => { console.log("preess1"); openDatePicker1()} }
              >
                <Icon
                  name="calendar"
                  style={{ marginRight: 15 }}
                  size={25}
                />
              </TouchableOpacity> */}
            </View>
            <DatePicker
              modal
              open={open1}
              date={_enddate}
              onConfirm={(text) => {
                setOpen1(false)
                setEnddate(text.toString())
                _setEnddate(text)
              }}
              onCancel={() => {
                setOpen1(false)
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <TextArea h={20} placeholder="Description" autoCompleteType={undefined} onChangeText={(text) => setDescription(text)} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Input
              type='text'
              placeholder="How many questions you want to add? (e.g: 10, 20 , 30)"
              onChangeText={(text) => setQuestionCount(text)}
            />
          </View>
          <View style={{ marginVertical: 10, marginBottom: 40 }}>
            <Button title={"Next"} onPress={() => AddExam()} />
          </View>
        </ScrollView>
      
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "roboto-light",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "300",
  },
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "300",
  },
  input: {
    height: 45,
    backgroundColor: 'white'
  },
  multilineInput: {
    backgroundColor: 'white'
  }
});
