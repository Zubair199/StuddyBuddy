import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { Select, Input, TextArea, IconButton } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import services from "../services/api.services"
import { AUTHENTICATIONS, CLASS } from '../services/api.constants';

const radioButtonsData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Virtual',
  value: 'Virtual'
}, {
  id: '2',
  label: 'InClass',
  value: 'InClass'
}]
export default function AddClassScreen() {
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


  let [user, setUser] = React.useState("")
  let [name, setName] = React.useState("")
  let [level, setLevel] = React.useState("")
  let [startdate, setStartdate] = React.useState("")
  let [enddate, setEnddate] = React.useState("")
  let [subject, setSubject] = React.useState("")
  let [announcements, setAnnouncements] = React.useState("")
  let [maxStudents, setMaxStudents] = React.useState("")
  let [language, setLanguage] = React.useState("")

  function addClass() {
    if (name === '' && level === '' && startdate === '' && enddate === '' && subject === '' && maxStudents === '' && language === '') {
      Alert.alert(
        "All Fields are required",
      );
    }
    else {
      const body = {
        teacher: user,
        name: name,
        level: level,
        startdate: startdate,
        enddate: enddate,
        subject: subject,
        announcements: announcements,
        maxStudents: maxStudents,
        language: language,
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
          .then((response: any) => {
            console.log(response)
            Alert.alert(response.data.message)
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
    setUser('6295cc2b7d505307388d58fd')
  }, [])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>

      <ScrollView style={{ padding: 15, marginBottom: '28%' }}>

        <Text style={styles.title}>Add Class</Text>

        <View style={{ marginVertical: 10 }}>
          <Input variant="outline" placeholder="Enter Class Name"
            onChangeText={(text) => { setName(text) }} />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Select accessibilityLabel="Choose Subject" placeholder="Choose Subject" onValueChange={itemValue => setSubject(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>

        </View>

        <View style={{ marginVertical: 10 }}>
          <Select accessibilityLabel="Choose Level" placeholder="Choose Level"
            onValueChange={itemValue => setLevel(itemValue)}
          >
            <Select.Item label="Beginner" value="Beginner" />
            <Select.Item label="Intermediate" value="Intermediate" />
            <Select.Item label="Advanced" value="Advanced" />
          </Select>

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
          <Input variant="outline" placeholder="Max. Students"
            onChangeText={(text) => { setMaxStudents(text) }} />
        </View>
        {/* <View style={{ marginVertical: 10 }}>
          <Select accessibilityLabel="Choose Class Type" placeholder="Choose Class Type" onValueChange={itemValue => set(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </View> */}

        <View style={{ marginVertical: 10 }}>
          <Select accessibilityLabel="Choose Delivery Language" placeholder="Choose Delivery Language"
            onValueChange={itemValue => setLanguage(itemValue)}>
            <Select.Item label="English" value="English" />
          </Select>
        </View>

        <View style={{ marginVertical: 10, marginBottom: '10%' }}>
          <Button title={"Submit"} onPress={() => addClass()} />
        </View>

      </ScrollView>
    </View>
  )
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
    height: 50,
    backgroundColor: 'white'
  },
  multilineInput: {
    backgroundColor: 'white'
  }
});
