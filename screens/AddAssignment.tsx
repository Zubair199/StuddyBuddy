import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
// import { Button } from 'react-native-elements';
import { Button } from "native-base";

import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
const radioButtonsData = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Virtual',
  value: 'Virtual'
}, {
  id: '2',
  label: 'InClass',
  value: 'InClass'
}]
export default function AddAssignmentScreen() {
  const [value, setValue] = React.useState('first');
  const [date, setDate] = React.useState(new Date())
  const [dateEnd, setDateEnd] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [modeEnd, setModeEnd] = React.useState('date');
  const [showEnd, setShowEnd] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [response, setResponse] = React.useState<any>(null);
  const onChange = (event, selectedDate) => {
    if(mode ==="date"){
      const currentDate = selectedDate;
      setDate(currentDate);
      setMode('time');
    }
    else{
      setShow(false);
      setDate(selectedDate)
      
      
    }
    
   
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const onChangeEnd = (event, selectedDate) => {
    if(modeEnd ==="date"){
      const currentDate = selectedDate;
      setDateEnd(currentDate);
      setModeEnd('time');
    }
    else{
      setShowEnd(false);
      setDateEnd(selectedDate)  
    }

  };
  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const showDatepickerEnd = () => {
    console.log("asd")
    showModeEnd('date');
  };

 

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);
 
  


  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <ScrollView style={{ marginBottom: '28%' }}>

        <Text style={styles.title}>Add Assignment</Text>

        <View style={{ marginVertical: 10 }}>
          <TextInput
            placeholder="Enter Title"
            mode="outlined"
            style={styles.input}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          
          <Button variant="rounded" onPress={showDatepicker} style={{marginBottom:10}}>Start Date</Button>
          <Text>{"Start Date" + date.toString()}</Text>
          <Button variant="rounded" onPress={showDatepickerEnd}>End Date</Button>
          {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )} 
        {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateEnd}
          mode={modeEnd}
          is24Hour={true}
          onChange={onChangeEnd}
        />
      )} 
      <Text>{"End Date" +dateEnd.toString()}</Text>
     
        
        </View>

        <View style={{ marginVertical: 10 }}>
          <TextInput
            placeholder="Enter Details"
            multiline
            numberOfLines={5}
            editable
            mode="outlined"
            style={styles.multilineInput}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button onPress={() => { }} >Upload Image</Button>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Class Type</Text>
          <RadioGroup
            containerStyle={{ justifyContent: 'space-around', flex: 1 }}
            layout='row'
            radioButtons={radioButtonsData}
          />
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
