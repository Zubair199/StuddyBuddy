import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function AssignmentDetailScreen() {
  const isFocused = useIsFocused();

  React.useEffect(() => { }, [isFocused]);
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      {/* <ScrollView> */}
      <View>
        <Text style={{ fontSize: 20, marginLeft: 15 }}>Q1: What's pencil made of?</Text>
      </View>
      <View style={{marginTop:15}}>
        <CheckBox
          title='Option 1'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
          title='Option 2'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
          title='Option 3'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
        <CheckBox
          title='Option 4'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
        <View style={{ width: '50%' }}>
          <Button title='Back' />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='Next' />
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
