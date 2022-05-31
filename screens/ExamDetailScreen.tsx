import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'native-base';

export default function ExamDetailScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useEffect(() => { }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingLeft: 15, marginVertical: 15 }}>
        <TouchableOpacity style={{ marginTop: 5 }}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Classes' }],
          })}>
          <Icon color={'black'} name="leftcircleo" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Exam Details</Text>
      </View>
      <ScrollView style={{ marginBottom: '25%', padding: 15 }}>
        <View >
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
              <Text style={styles.challengeBoxName}>Exam 1</Text>
              <Text style={styles.challengeBoxDate}>
                28-05-2022
              </Text>
            </View>
          </ImageBackground>
          <Text style={styles.heading}>Details</Text>
          <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </View>

        <View style={{marginVertical: 15}}>
          <Divider />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.title}>Exam Questions</Text>
        </View>
        {[0, 1, 2, 3, 4].map((item, index) => (
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
    </View>
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