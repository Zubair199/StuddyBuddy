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
import { Select, Input, TextArea, IconButton } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={{ padding: 15, marginBottom: '28%' }}>

        <Text style={styles.title}>Add Exam</Text>

        <View style={{ marginVertical: 10 }}>
          <Select accessibilityLabel="Choose Service" placeholder="Choose Service">
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>

        </View>

        <View style={{ marginVertical: 10 }}>
          <Input variant="outline" placeholder="Title" />
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Input
              w={'90%'}
              editable={false}
              variant="outline"
              defaultValue={_date}
              placeholder="Start Date"
            />
            <IconButton
              icon={
                <Icon
                  name="calendar"
                  style={{ marginRight: 15 }}
                  size={25}
                  onPress={() => openDatePicker()}
                />
              }
            />
          </View>
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
          <View style={{ flexDirection: 'row' }}>
            <Input
              w={'90%'}
              editable={false}
              variant="outline"
              defaultValue={_date}
              placeholder="End Date"
            />
            <IconButton
              icon={
                <Icon
                  name="calendar"
                  style={{ marginRight: 15 }}
                  size={25}
                  onPress={() => openDatePicker()}
                />
              }
            />
          </View>
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
          <TextArea h={20} placeholder="Description" autoCompleteType={undefined} />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Input
            type='text'
            placeholder="How many questions you want to add? (e.g: 10, 20 , 30)"

          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Button title={"Next"}
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'AddExamQuestions' }],
            })
            }
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
    height: 45,
    backgroundColor: 'white'
  },
  multilineInput: {
    backgroundColor: 'white'
  }
});
