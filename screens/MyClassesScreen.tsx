import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View, Modal } from 'react-native';
import { ListItem, Button, BottomSheet, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

import ClassSlider from '../components/ClassSlider';

import { FAB } from 'react-native-elements';
import AssignmentSlider from '../components/AssignmentSlider';
import ExamSlider from '../components/ExamSlider';
export default function MyClassesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
      <ScrollView style={{ marginBottom: '25%' }}>
        <View>
          <ClassSlider data={[0, 1, 2, 3, 4]} categoryText={"My Upcoming Classes"} screen={"ClassDetails"} />
        </View>
        <View>
          <AssignmentSlider data={[0, 1, 2, 3]} categoryText={"My Assignments"} screen={"AssignmentDetails"} />
        </View>
        <View>
          <ExamSlider data={[0, 1, 2, 3, 4, 5]} categoryText={"My Exams"} screen={"ExamDetails"} />
        </View>
      </ScrollView>
      <FAB title="+" color='#3878ee' placement='right' style={{ marginBottom: '25%' }} onPress={()=>{}}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
