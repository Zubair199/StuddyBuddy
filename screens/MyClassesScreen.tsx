import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View, TextInput } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import ClassSlider from '../components/ClassSlider';
import Icon from 'react-native-vector-icons/AntDesign';

import { FAB } from 'react-native-elements';
import AssignmentSlider from '../components/AssignmentSlider';
import ExamSlider from '../components/ExamSlider';
import AddAssignmentScreen from './AddAssignment';
export default function MyClassesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
      {/* <AddAssignmentScreen/> */}
      <Modal isVisible={isModalVisible} >
        <View style={{ padding: 30, borderRadius: 25, backgroundColor: 'white' }}>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.heading}>
              What do you want to add?
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddClass')}>
              <Text style={styles.title}>
                Class
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate('AddAssignment')}>
              <Text style={styles.title}>
                Assignment
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={()=>navigation.navigate('AddExam')}>
              <Text style={styles.title}>
                Exam
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity>
              <Text style={styles.cancel}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ marginBottom: '25%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
          <TextInput placeholder='Search...' style={{ width: '70%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, height: 40 }} />
          <TouchableOpacity>
            <Icon name="search1" size={20} style={{ marginLeft: -35 }} />
          </TouchableOpacity>
          <Button title="Add New..." onPress={()=>toggleModal()} />
        </View>
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
      {/* <FAB title={<Icon name="plus" size={20} color={'white'} style={{fontWeight: 'bold'}}/>} color='#3878ee' placement='right' style={{ marginBottom: '25%' }} onPress={()=>{toggleModal()}}/> */}

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
