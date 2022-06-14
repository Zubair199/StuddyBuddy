import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, EXAM } from '../services/api.constants';
import MainLayout from './MainLayout';

export default function ExamDetailScreen({ route }) {
  const { examID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [_class, setClass] = React.useState(null)
  let [data, setData] = React.useState([])

  React.useEffect(() => {

    fetch(AUTHENTICATIONS.API_URL + EXAM.GET_EXAM_BY_EXAM_ID + examID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.data)
        setClass(responseJson.data)
        let arr = Array.from({ length: responseJson.data.questioncount }, (_, i) => i + 1)
        console.log(arr)
        setData(arr)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);


  function component() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15, }}>
          <TouchableOpacity style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}>
            <Icon color={'black'} name="leftcircleo" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>Exam Details</Text>
        </View>
        {
          _class !== null &&
          <ScrollView style={{  padding: 15 }}>
            <View>
              <ImageBackground
                resizeMode='cover'
                source={require('../assets/images/bg.jpg')}
                style={styles.challengeBoxImage}
                imageStyle={{ borderRadius: 5 }}
              >
                <View style={styles.overlay}>
                  <View style={styles.challengeTypeOverLay}>
                    <Text style={styles.challengeBoxText}>
                      Virtual
                    </Text>
                  </View>
                  <Text style={styles.challengeBoxName}>{_class.title}</Text>
                  <Text style={styles.challengeBoxDate}>
                    28-05-2022
                  </Text>
                </View>
              </ImageBackground>
              <Text style={styles.heading}>Details</Text>
              <Text style={styles.text}>{_class.description}</Text>
            </View>


            <View style={{ marginVertical: 15 }}>
              <Divider />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.title}>Exam Questions</Text>
            </View>
            {data.map((item, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <View>
                  <Text style={{ fontSize: 20, marginLeft: 15 }}>Q{index + 1}: What's pencil made of?</Text>
                </View>
                <View style={{ marginVertical: 15 }}>
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
                <Divider />
              </View>
            ))}
          </ScrollView>
        }

      </View>
    )
  }
  return (
    <MainLayout Component={component()} />
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1
  },

  challengeBoxImage: {
    height: 266,
  },

  challengeBoxDate: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  challengeTypeBox: {
    paddingLeft: 0,
    flex: 1,
  },

  challengeTypeOverLay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 30,
    justifyContent: "center"
  },

  challengeBoxText: {
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 5,
  },

  title: {
    fontSize: 25,
    marginLeft: 15,
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    justifyContent: "flex-end",
    padding: 10,
    overflow: "hidden"
  },

  challengeBoxName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
  },

  heading: {
    fontSize: 20,
    fontFamily: "roboto-light",
    marginTop: 40,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 15,
    fontFamily: "roboto-light",
    marginTop: 5,
  },
});