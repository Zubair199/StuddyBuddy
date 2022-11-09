import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
interface Iprops {
  data: Array<any>;
  screen: string;
  categoryText: string;
}
export default function TeacherAssignmentSlider(props: Iprops) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useEffect(() => { }, [isFocused]);
  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.categoryText}>{props.categoryText}</Text>
      <View style={{ height: 180 }}>
        {!props.data || props.data.length == 0 ? (
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>NO ASSIGNMENTS AVAILABLE !</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView} horizontal={true}>
            {
              props.data.map((item: any, index: number) => (
                <View key={index} style={styles.classBoxWrapper}>
                  <ImageBackground
                    resizeMode='cover'
                    source={require('../assets/images/bg.jpg')}
                    style={styles.classBoxImage}
                  >
                    <View style={styles.overlay}>
                      <View style={styles.classTakenBox}>
                        <View style={styles.classTakenOverLay}>
                          <Text style={styles.classTakenBoxText}>
                            Virtual
                          </Text>
                        </View>
                      </View>
                      <View style={styles.classBox}>
                        <TouchableOpacity
                          // onPress={
                          //   () => navigation.reset({
                          //     index: 0,
                          //     routes: [{ name: props.screen, params: { assignmentID: item._id } }],
                          //   })
                          // }
                          onPress={() => {
                            navigation.navigate(props.screen, { assignmentID: item._id })
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "flex-end",
                          }}
                        >
                          <View style={styles.levelBox}>
                            {/* <View
                            style={styles.levelIntermediate}
                          >
                          </View>
                          <Text style={styles.classBoxText}>
                            Intermediate
                          </Text> */}

                          </View>
                          <Text style={styles.classBoxName}>
                            {/* Class Name */}
                          </Text>
                          <Text style={styles.classBoxInstructor}>
                            {/* Instructor Name */}
                          </Text>
                          <Text style={styles.classBoxDate}>
                            {/* Tuesday 12:00 - 13:00 */}
                          </Text>
                          <Text style={styles.classBoxInstructor}>
                            {item.title}
                          </Text>
                          <Text style={styles.classBoxInstructor}>
                            {item.status}
                          </Text>
                          <Text style={styles.classBoxInstructor}>
                            {item.startdate}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              ))
            }
          </ScrollView>
        )}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  categoryText: {
    textTransform: "uppercase",
    fontSize: 20,
    fontFamily: "roboto-light",
    color: 'gray'
    //marginTop: 10,
  },
  classTakenOverLay: {
    // flex: 1,
    marginLeft: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 30,
    justifyContent: "center"
  },
  classTakenBoxText: {
    color: "#FFFFFF",
    // alignSelf: "center",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 5,
  },

  classTakenBox: {
    marginTop: 15,
    paddingLeft: 0,
    // paddingBottom: 10,
    paddingTop: 0,
    // width: 200,
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.8)",
  },
  scrollView: {
    marginTop: 10,
    // marginHorizontal: -1,
  },

  classBoxWrapper: {
    height: "100%",
    width: 225,
    overflow: "hidden",
    // marginBottom: 22,
    borderRadius: 5,
    // marginHorizontal: 5,
    marginRight: 15,
  },
  classBoxImage: {
    width: "100%",
    height: "100%",
    // position: "relative",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  classBoxText: {
    // marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "uppercase",
    marginLeft: 5,
  },
  classBox: {
    paddingLeft: 15,
    paddingBottom: 10,
    flex: 1,
  },
  levelBox: {
    flexDirection: "row",

    backgroundColor: "transparent",
  },

  levelAdvance: {
    width: 4,
    height: 13,
    backgroundColor: "#FF6565",
    marginTop: 2,
  },

  levelBeginner: {
    width: 4,
    height: 13,
    backgroundColor: "#01C75D",
    marginTop: 2,
  },

  levelIntermediate: {
    width: 4,
    height: 13,
    backgroundColor: "#FFEB00",
    marginTop: 2,
  },

  classBoxName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
  },
  classBoxInstructor: {
    color: "#FFFFFF",
    fontSize: 15,
    textTransform: "capitalize"
  },
  classBoxDate: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  classBoxViews: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "roboto-regular",
  },
  classBoxSubscribers: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  classBoxSubscribersIcon: {
    width: 35,
    height: 38,
  },
  heartBox: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  heartIcon: {
    marginTop: 10,
    marginRight: 10,
    height: 20,
    width: 22,
  },

  pagination: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  paginationIcon: {
    color: "#4B5F79",
  },

  noResultView: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  noResultText: {
    textAlign: "center",
    fontFamily: "roboto-light",
    color: "#4b5f79",
  },
});