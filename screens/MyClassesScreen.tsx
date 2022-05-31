import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import ClassSlider from '../components/ClassSlider';
import Icon from 'react-native-vector-icons/AntDesign';

import { FAB } from 'react-native-elements';
import AssignmentSlider from '../components/AssignmentSlider';
import ExamSlider from '../components/ExamSlider';
import AddAssignmentScreen from './AddAssignment';
import { FormControl, Modal, Button, Divider } from 'native-base';
export default function MyClassesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);
  return (
    <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
      {/* <AddAssignmentScreen/> */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>What do you want to add?</Modal.Header>
          <Modal.Body>
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AddClass' }],
                  })
                }
              >
                <Text style={styles.title}>
                  Class
                </Text>
                <Icon name="right" size={20} />
              </TouchableOpacity>
            </View>
            <Divider my="2" _light={{
              bg: "muted.300"
            }} />
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AddAssignment' }],
                  })
                }
              >
                <Text style={styles.title}>
                  Assignment
                </Text>
                <Icon name="right" size={20} />
              </TouchableOpacity>
            </View>
            <Divider my="2" _light={{
              bg: "muted.300"
            }} />
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AddExam' }],
                  })
                }
              >
                <Text style={styles.title}>
                  Exam
                </Text>
                <Icon name="right" size={20} />
              </TouchableOpacity>

            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <ScrollView style={{ marginBottom: '25%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginVertical: 10 }}>
          <TextInput placeholder='Search...' style={{ width: '70%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, height: 45 }} />
          <TouchableOpacity>
            <Icon name="search1" size={20} style={{ marginLeft: -35 }} />
          </TouchableOpacity>
          <Button style={{ backgroundColor: '#3878ee' }} onPress={() => setShowModal(true)} >
            Add New...
          </Button>
        </View>
        <View style={{ marginVertical: 10 }}>
          <ClassSlider data={[0, 1, 2, 3, 4]} categoryText={"My Upcoming Classes"} screen={"ClassDetails"} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <AssignmentSlider data={[0, 1, 2, 3]} categoryText={"My Assignments"} screen={"AssignmentDetails"} />
        </View>
        <View style={{ marginVertical: 10 }}>
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
