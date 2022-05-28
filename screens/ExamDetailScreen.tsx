import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Text } from 'react-native-elements';

export default function ExamDetailScreen() {
  const isFocused = useIsFocused();

  React.useEffect(() => { }, [isFocused]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ padding: 10 }}>
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
    fontSize: 30,
    marginLeft: 15,
    marginTop: 20,
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