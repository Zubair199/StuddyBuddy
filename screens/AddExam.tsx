import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
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
  const [value, setValue] = React.useState('first');
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [_date, _setDate] = React.useState('')
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);
  function openDatePicker() {
    setOpen(true)
  }
  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>

      <ScrollView style={{ marginBottom: '28%' }}>

        <Text style={styles.title}>Add Exam</Text>

        <View style={{ marginVertical: 10 }}>
          <TextInput
            placeholder="Enter Title"
            mode="outlined"
            style={styles.input}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            placeholder="Enter End Time"
            onPressIn={openDatePicker}
            value={_date}
            mode="outlined"
            style={styles.input}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              _setDate(date.toString())
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
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
          <Button title={'Upload Image'} onPress={() => { }} />
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
