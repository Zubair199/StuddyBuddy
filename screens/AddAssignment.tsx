import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { RadioButton, TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
export default function AddAssignmentScreen() {
  const [value, setValue] = React.useState('first');
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  return (
    <SafeAreaView>

      <TextInput
        label="Title"
      />
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <RadioButton.Item label="First item" value="first" />
        <RadioButton.Item label="Second item" value="second" />
      </RadioButton.Group>

      <TextInput
        label="Title"        
      />
      <TextInput
        label="Title"
      />
       <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});
