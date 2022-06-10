import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Alert, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AUTHENTICATIONS, CLASS } from '../services/api.constants';

export default function ClassDetailScreen({ route }) {
  const { classID } = route.params
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [_class, setClass] = React.useState(null)
  React.useEffect(() => {

    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_CLASS_BY_CLASS_ID + classID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.data)
        setClass(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  function joinClass(props) {
    const body = {
      teacher: props.teacher._id,
      student: '62a1af738c535a276ca3c3ef',
      class: props._id 
    }
    console.log(body)
    try {
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(AUTHENTICATIONS.API_URL + CLASS.JOIN_CLASS, requestObj)
        .then((response: any) => {
          console.log(response)
          Alert.alert(response.data.message)
        })
        .catch((err: any) => {
          console.log(err)
          console.log(err.response)
        })
    }
    catch (exception) {
      console.log('exception ', exception)
    }
  }

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
        <Text style={styles.title}>Class Details</Text>
      </View>
      {
        _class !== null
        &&
        <ScrollView style={{ marginBottom: '25%', padding: 15 }}>
          <View >
            {/* header starts here */}
            <View style={{ marginTop: 10 }}>
              <ImageBackground
                resizeMode='cover'
                source={require("../assets/images/bg.jpg")}
                style={styles.classBoxImage}
                imageStyle={{ borderRadius: 5 }}
              >
                <View style={styles.overlay}>
                  <View style={styles.levelBox}>
                    <View style={styles.levelIntermediate}></View>
                    <Text style={styles.classBoxText}>{_class.level}</Text>
                  </View>
                  <Text style={styles.classBoxName}>{_class.name}</Text>
                  <Text style={styles.classBoxInstructor}>
                    {_class.teacher.username}
                  </Text>
                  <Text style={styles.classBoxDate}>
                    Tuesday 12:00 - 13:00
                  </Text>
                  <Text style={styles.classBoxInstructor}>
                    {_class.subject}
                  </Text>
                  <Text style={styles.classBoxInstructor}>
                    {_class.status}
                  </Text>
                </View>
              </ImageBackground>
              {/* header ends here */}

              {/* price tags start here */}
              {/* this will be render if student has not already joined the class */}
              <View style={styles.joinBox}>
                <TouchableOpacity onPress={() => { joinClass(_class) }} style={{ backgroundColor: '#4B5F79', padding: 10, borderRadius: 5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '300', color: "white" }}>Join Class</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.joinBox}>
                <Text style={styles.cost}>
                  {/* Cost: &#36;{12} */}
                  Max. Students : {_class.maxStudents}
                </Text>
              </View>

              {/* price ends here */}


              {/* Class Location Starts here */}
              {/* <View>
                <Text style={styles.heading}>Class Location</Text>
                <Text style={styles.text}>CR 4 EE Building</Text>
              </View> */}
              {/* Class Location ends here */}


              {/* Language section starts here */}
              <View style={styles.languageBoxLanguage}>
                <View style={styles.languageWithIcon}>
                  <Text style={styles.languageAttributesHeading}>Languages</Text>
                </View>
                <View style={styles.language}>
                  <View
                    style={{ flexDirection: "row" }}
                  >
                    <Text style={styles.languageText}>{_class.language}</Text>
                  </View>
                </View>
              </View>
              {/* Language section ends here */}

              {/* Announcements Starts here */}
              {/* <Text style={styles.heading}>Announcements</Text>
              <Text style={styles.text}>class announcements</Text> */}
              {/* Announcements ends here */}

              {/* Topics & Instructions Starts here */}
              {/* <Text style={styles.heading}>Topics and Instructions</Text>
              <Text style={styles.text}>class topics</Text> */}
              {/* Topics & Instructions ends here */}

              {/* connectivity link for enrolled students Starts here */}
              {/* <Text style={styles.heading}>Pre Recorded Class Link</Text> */}
              {/* <Text style={styles.heading}>Class Link</Text>

              <TouchableOpacity
                onPress={() => Linking.openURL("https://www.google.com/")}
              >
                <Text style={styles.text}>connectivityLink</Text>
              </TouchableOpacity> */}
              {/* connectivity link for enrolled students ends here */}

              {/* Schedule Starts here */}
              {/* <Text style={styles.heading}>Schedule</Text>
              <Text style={styles.text}>
                Day: Tuesday
                Time: 12:00 - 13:00
              </Text> */}
              {/* Schedule ends here */}

              {/* classes starts here */}
              {
        /*classData.documents.length === 0 ? null : (
        //   <>
        //     <Text style={styles.heading}>Instructor Uploads</Text>
        //     <View style={{ height: 180 }}>
        //       <ScrollView style={styles.scrollView} horizontal={true}>
        //         {classData.documents.map((upload: any, index: number) => (
        //           <TouchableOpacity
        //             key={index}
        //             style={styles.classBoxWrapper}
        //             onPress={() => Linking.openURL(upload)}
        //           >
        //             <ImageBackground
        //               source={
        //                 upload
        //                   .substring(upload.lastIndexOf(".") + 1)
        //                   .toLowerCase() == "pdf"
        //                   ? require("../assets/images/icons/document.png")
        //                   : { uri: upload }
        //               }
        //               style={styles.uploadBoxImage}
        //             >
        //               <View style={styles.overlay}>
        //                 <View style={styles.uploadBox}>
        //                   <Text style={styles.uploadName}>{upload.name}</Text>
        //                   <Text style={styles.uploadDate}>Uploaded Today</Text>
        //                 </View>
        //               </View>
        //             </ImageBackground>
        //           </TouchableOpacity>
        //         ))}
        //       </ScrollView>
        //     </View>
        //   </>
        // )
        */}

              {/* classes ends here */}

              {/* Enrolled Students Starts here */}
              {/* <Text style={styles.heading}>Students Enrolled</Text>
              <Text style={styles.text}>{5}</Text> */}
              {/* Enrolled Students ends here */}

            </View>
          </View>
        </ScrollView>

      }

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  bannerImage: {
    width: 129,
    height: 92,
  },

  promoDisplayView: {
    width: "100%",
    marginTop: 30,
    borderRadius: 3,
    height: 110,
    borderColor: "#949599",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    padding: 2,
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },
  titleIconBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  promoNameText: {
    fontSize: 15,
    fontFamily: "roboto-regular"
  },
  backIcon: {
    marginTop: 35,
    height: 17,
    width: 10,
  },

  classBoxImage: {
    // width: "100%",
    height: 266,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    justifyContent: "flex-end",
    padding: 10,
  },
  classBoxText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 13,
    textTransform: "uppercase",
  },
  levelBox: {
    flexDirection: "row",
    // position: "absolute",
    // bottom: 90,
    // left: 14,
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
    // position: "absolute",
    // bottom: 62,
    // left: 14,
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
    // position: "absolute",
    // bottom: 23,
    // left: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },
  classBoxViews: {
    // position: "absolute",
    // bottom: 65,
    // right: 14,
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "roboto-regular",
  },
  classBoxSubscribers: {
    // position: "absolute",
    // bottom: 25,
    // right: 14,
    color: "#FFFFFF",
    fontSize: 18,
  },
  classBoxSubscribersIcon: {
    // position: "absolute",
    // bottom: 23,
    // right: 40,
    width: 35,
    height: 38,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 20,
    width: 23,
  },

  profileBox: {
    marginTop: 20,
    flexDirection: "row",
  },
  profilePic: {
    width: 95,
    height: 114,
    borderRadius: 5,
  },

  info: {
    marginLeft: 20,
    position: "relative",
  },

  name: {
    fontSize: 18,
    color: "#4B5F79",
    width: "100%",
    textTransform: "uppercase",
    fontFamily: "roboto-light",
  },
  languageBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    marginTop: 7,
  },

  languageHeader: {
    fontSize: 14,
    fontFamily: "roboto-regular",
  },

  dot: {
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 50,
    margin: 5,
    marginTop: 10,
  },

  actionBox: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    flex: 1,
  },

  envelopeIcon: {
    width: 21,
    height: 17,
  },

  joinBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },

  cost: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    color: "#4B5F79",
  },

  joinClassBtn: {
    height: 34,
    backgroundColor: "#4B5F79",
    borderRadius: 3,
    width: 113,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },

  joinText: {
    fontFamily: "roboto-light",
    fontSize: 15,
    color: "#FFFFFF",
    textTransform: "uppercase",
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
    marginRight: 15,
  },

  uploadBoxImage: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  uploadBox: {
    position: "absolute",
    backgroundColor: "transparent",
    left: 15,
    bottom: 10,
  },

  uploadName: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 16,
  },
  uploadDate: {
    color: "#FFFFFF",
    fontFamily: "roboto-light",
    fontSize: 14,
  },

  removeBtn: {
    padding: 10,
    borderColor: "#4B5F79",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    height: 44,
    marginBottom: 20,
  },

  removeText: {
    color: "#4B5F79",
    fontFamily: "roboto-light",
    fontSize: 16,
    textTransform: "uppercase",
  },

  removeIcon: {
    width: 19,
    height: 5,
    marginLeft: 5,
  },
  reportBtn: {
    padding: 10,
    // borderColor: "#4B5F79",
    borderRadius: 7,
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 44,
    marginBottom: 20,
    backgroundColor: "#FF6565",
  },
  reportText: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 16,
    textTransform: "uppercase",
  },

  reasonBox: {
    // marginTop: 10,
    // marginBottom: 10,
    width: "100%",
    borderRadius: 5,
    borderColor: "#949599",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    padding: 8,
    fontFamily: "roboto-light",
    fontSize: 16,
    height: 100,
  },
  languageBoxLanguage: {
    marginTop: 30,
  },

  languageWithIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  languageAttributesHeading: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "200",
    fontFamily: "roboto-light",
  },
  language: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  languageText: {
    fontSize: 15,
    fontFamily: "roboto-light",
  },
  dotLanguage: {
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },
});
