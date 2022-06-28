import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { Select, Input, TextArea, IconButton } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import services from "../services/api.services"
import { AUTHENTICATIONS, CLASS } from '../services/api.constants';
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
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export default function AddClassScreen() {
  const [value, setValue] = React.useState('first');
  const [date, setDate] = React.useState(new Date())
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())

  const [isModal, setIsModal] = React.useState(false)

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [_date, _setDate] = React.useState('')
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [response, setResponse] = React.useState<any>(null);
  const navigation = useNavigation();

  const [monthDates, setMonthDates] = React.useState([])
  function openDatePicker() {
    setOpen(true)
  }
  function openDatePicker1() {
    setOpen1(true)
  }

  let [_startdate, _setStartdate] = React.useState(new Date())
  let [_enddate, _setEnddate] = React.useState(new Date())

  const { userToken, userType } = React.useContext(AuthContext);

  let [user, setUser] = React.useState(userToken)
  let [name, setName] = React.useState("")
  let [level, setLevel] = React.useState("")
  let [startdate, setStartdate] = React.useState("")
  let [enddate, setEnddate] = React.useState("")
  let [subject, setSubject] = React.useState("")
  let [subjectID, setSubjectID] = React.useState("")

  let [announcements, setAnnouncements] = React.useState("")
  let [maxStudents, setMaxStudents] = React.useState("")
  let [language, setLanguage] = React.useState("")
  let [classDuration, setClassDuration] = React.useState("")
  let [subjects, setSubjects] = React.useState([])

  let [schedule, setSchedule] = React.useState([])
  let [step1Errors, setStep1Errors] = React.useState(false)
  let [step2Errors, setStep2Errors] = React.useState(false)

  React.useEffect(() => {
    createCalendar(date.getFullYear(), currentMonth);
    fetch(AUTHENTICATIONS.API_URL + CLASS.SUBJECTS)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.data)
        setSubjects(responseJson.data)

        // Alert.alert(responseJson.data.message)
      })
      .catch((err: any) => {
        console.log(err)
        console.log(err.response)
      })
  }, [])

  function createCalendar(year, month) {
    console.log(year, month)
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);

    let table = new Array();
    let weekDates = new Array();

    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table.push(" ");
    }

    // <td> with actual dates
    while (d.getMonth() == mon) {
      table.push(d.getDate());

      if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        weekDates.push({ week: table })
        table = new Array()
      }

      d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table.push(" ");

      }
    }

    console.log(table)
    console.log(weekDates)
    weekDates.push({ week: table })
    // close the table
    // table += '</tr></table>';
    setMonthDates(weekDates)

  }

  function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  function toggleModal() {
    console.log("modal")
    setIsModal(!isModal)
  }

  function getNextMonth() {
    console.log("next")
    if (currentMonth + 1 > 12) {
      setCurrentYear(currentYear + 1)
      createCalendar(currentYear + 1, 1);
      setCurrentMonth(1)
    }
    else {
      createCalendar(currentYear, (currentMonth + 1));
      setCurrentMonth(currentMonth + 1)
    }
  }
  function getPrevMonth() {
    console.log("previous",)
    if (currentMonth - 1 <= 0) {
      setCurrentYear(currentYear - 1)
      createCalendar(currentYear - 1, 12);
      setCurrentMonth(12)
    }
    else {
      createCalendar(currentYear, (currentMonth - 1));
      setCurrentMonth(currentMonth - 1)
    }
  }
  function startDateSetup(weekDate) {
    let y = currentYear
    let m = currentMonth > 9 ? currentMonth : "0" + currentMonth
    let d = weekDate > 9 ? weekDate : "0" + weekDate
    let makeDate = new Date(`${y}-${m}-${d}`)
    console.log(makeDate)
    _setStartdate(makeDate)
    _setEnddate(makeDate)
  }
  function getMonthDates() {
    console.log(monthDates.length)
    return monthDates.map((item, index) => {
      return (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }} key={index}>
          {
            item.week.map((weekDate, i) => (
              <View style={styles.box} key={i}>
                <Pressable onPress={() => { toggleModal(); startDateSetup(weekDate); }}>
                  <Text style={{ fontWeight: '400' }}>{weekDate}</Text>
                </Pressable>
              </View>
            ))
          }
        </View>
      )
    })

  }

  function clearFields() {
    _setStartdate(new Date())
    setStartdate("")
    setEnddate("")
    _setEnddate(new Date())
    setMaxStudents("")
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

  function submitSchedule() {
    if (startdate !== "" && enddate !== "" && maxStudents !== "") {
      const scheduleObj = {
        startdate: startdate,
        enddate: enddate,
        maxStudents: maxStudents,
      }
      let _schedule = schedule;
      _schedule.push(scheduleObj)
      setSchedule(_schedule)
      clearFields();
      toggleModal()
      console.log(_schedule)
    }
    else {
      Alert.alert("All Fields are required");
    }
  }

  function addClass() {

    const body = {
      teacher: user,
      name: name,
      level: level,
      subject: subjectID,
      duration: classDuration,
      language: language,
      schedule: schedule
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
      fetch(AUTHENTICATIONS.API_URL + CLASS.CREATE, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          Alert.alert(responseJson.message)
          navigation.navigate("Classes")
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

  function step1() {
    if (name !== "" && level !== "" && subject !== "" && classDuration !== "" && language !== "") {
      setStep1Errors(false)
    }
    else {
      setStep1Errors(true)
      Alert.alert(
        "All Fields are required",
      );
    }
  }
  function step2() {
    console.log(classDuration)
    if (schedule.length !== (parseInt(classDuration) * monthDates.length)) {
      setStep2Errors(true)
      Alert.alert(
        "Kindly schedule your classes",
      );
    }
    else {
      setStep2Errors(false)
    }
  }
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Text style={styles.title}>Add Class</Text>

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
            <Pressable
              onPress={
                () => { toggleModal(); clearFields(); }
              }
            >
              <Icon name='close' size={25} />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
            <Text style={styles.title}>Add Class Schedule</Text>
          </View>
          <View>
            <ScrollView >
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
                <Input variant="outline" placeholder="Max. Students"
                  onChangeText={(text) => { setMaxStudents(text) }} />
              </View>

              <View style={{ marginVertical: 10, marginBottom: 40 }}>
                <Button title={"Submit"} onPress={() => { submitSchedule() }} />
              </View>


            </ScrollView>
          </View>
        </View>
      </Modal>
      <ProgressSteps>
        <ProgressStep label="Class Information" onNext={() => step1()} errors={step1Errors}>
          <View >
            <ScrollView style={{ padding: 15, marginBottom: '28%' }}>

              <View style={{ marginVertical: 10 }}>
                <Input variant="outline" value={name} placeholder="Enter Class Name"
                  onChangeText={(text) => { setName(text) }} />
              </View>


              <View style={{ marginVertical: 10 }}>
                <Select accessibilityLabel="Choose Subject" selectedValue={subjectID}
                  placeholder="Choose Subject" onValueChange={itemValue => {
                    setSubjectID(itemValue);
                    console.log(subjects.filter(item => item._id === itemValue)[0].name)
                    setSubject(subjects.filter(item => item._id === itemValue)[0].name)
                  }}>
                  {
                    subjects.map((item, index) => {
                      return (
                        <Select.Item label={item.name} key={index} value={item._id} />

                      )
                    })
                  }
                  {/* <Select.Item label="Web Development" value="web" />
                  <Select.Item label="Cross Platform Development" value="cross" />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" /> */}
                </Select>

              </View>

              <View style={{ marginVertical: 10 }}>
                <Select accessibilityLabel="Choose Level" selectedValue={level} placeholder="Choose Level"
                  onValueChange={itemValue => setLevel(itemValue)}
                >
                  <Select.Item label="Beginner" value="Beginner" />
                  <Select.Item label="Intermediate" value="Intermediate" />
                  <Select.Item label="Advanced" value="Advanced" />
                </Select>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Select accessibilityLabel="Choose Class Duration" selectedValue={classDuration} placeholder="Choose Class Duration" onValueChange={itemValue => setClassDuration(itemValue)}>
                  <Select.Item label="1 month" value="1" />
                  <Select.Item label="2 month" value="2" />
                  <Select.Item label="3 month" value="3" />
                  <Select.Item label="4 month" value="4" />
                  <Select.Item label="5 month" value="5" />
                  <Select.Item label="6 month" value="6" />
                </Select>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Select accessibilityLabel="Choose Delivery Language" selectedValue={language} placeholder="Choose Delivery Language"
                  onValueChange={itemValue => setLanguage(itemValue)}>
                  <Select.Item label="English" value="English" />
                </Select>
              </View>

            </ScrollView>
          </View>
        </ProgressStep>
        <ProgressStep label="Add Schedule" //</ProgressSteps>onNext={() => step2()} errors={step2Errors}
        >
          <View >
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15 }}>
              <View>
                <Text style={{ fontSize: 20 }}>{monthNames[currentMonth - 1]}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable onPress={() => getPrevMonth()}>
                  <Icon name="left" size={25} />
                </Pressable>
                <Pressable onPress={() => getNextMonth()}>
                  <Icon name="right" size={25} />
                </Pressable>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                {
                  dayNames.map((item, index) => {
                    return (
                      <View style={styles.box}>
                        <Text style={{ fontWeight: '400' }}>{item.slice(0, 3)}</Text>
                      </View>
                    )
                  })
                }

              </View>
              {getMonthDates()}
            </View>
          </View>
        </ProgressStep>
        <ProgressStep label="Review Class & Schedule" onSubmit={() => addClass()}>
          <View style={{ padding: 15 }}>
            <View>
              <Text>{name}</Text>
              <Text>{subject}</Text>
              <Text>{level}</Text>
              <Text>{classDuration}</Text>
              <Text>{language}</Text>
            </View>
            <View>
              {
                schedule.map((item, index) => {
                  return (
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                      <View>
                        <Text>{formatDate(item.startdate)}</Text>
                        <Text>{formatTime(item.startdate)}</Text>
                      </View>
                      <View>
                        <Text>{formatDate(item.enddate)}</Text>
                        <Text>{formatTime(item.enddate)}</Text>
                      </View>
                      <View>
                        <Text>{item.maxStudents}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => console.log("pressed")}>
                          <FontAwesomeIcon name='trash' size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>

    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 10,
    width: 40,
    height: 15,
    justifyContent: "center",
    alignItems: "center"
  },
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
    height: 50,
    backgroundColor: 'white'
  },
  multilineInput: {
    backgroundColor: 'white'
  }
});
