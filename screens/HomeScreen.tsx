/***
 * SettingsScreen
 * Author: Sarath Ambegoda
 * Created on: 2020/07/17
 */
/*
================
Modified by: Abdul Zahir
Changes: Schedule Screen ui added
Modified on: 2020/07/20
*/
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';
import { AUTHENTICATIONS, CLASS } from "../services/api.constants";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // const onClose = () => navigation.navigate("ClassesScreen");
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState<any>();
  // const [grouped, setGrouped] = React.useState<any>();
  const [groupList, setGroupList] = React.useState<any>();

  const [classes, setClasses] = React.useState([])
  const [search, setSearch] = React.useState([])

  let [user, setUser] = React.useState("")

  React.useEffect(() => {
    setUser('6295cc2b7d505307388d58fd')
    fetch(AUTHENTICATIONS.API_URL + CLASS.GET_ALL_ACTIVE_CLASSES_BY_TEACHER_ID + '6295cc2b7d505307388d58fd')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('classes ', responseJson.data)
        setClasses(responseJson.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  function searchClasses(text) {
    let backup = classes;
    let backup1 = classes;
    backup = backup.filter(val => {
      return val.name.toString().toLowerCase().includes(text.toLowerCase())
    })
    console.log(backup.length)
    if (backup.length !== 0) {
      setClasses(backup)
    }
    else {
      setClasses(backup1)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.closeIconBox}>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={styles.closeIcon}
            source={require("../assets/images/icons/x.png")}
          />
        </TouchableOpacity>
      </View> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginTop: 15 }}>
        <TextInput
          placeholder='Search...' style={{
            width: '100%', borderWidth: 1,
            borderColor: 'lightgray', borderRadius: 10, height: 40
          }}
          onChangeText={(text) => { searchClasses(text) }}
        />
        <TouchableOpacity>
          <Icon name="search1" size={20} style={{ marginLeft: -35 }} />
        </TouchableOpacity>
      </View>

      {!classes || classes.length == 0 ? (
        <View style={styles.contentBox}>
          <Text style={styles.emptySearchText}>
            No Class Has Been Found
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View >
            {classes.map((classItem) => (
              <TouchableOpacity
                style={styles.groupBox}
                key={classItem._id}
              >
                <Image source={require("../assets/images/bg.jpg")}
                  style={styles.classImg}
                />
                <View style={styles.classInfo}>
                  <View style={styles.levelBox}>
                    <View
                      style={
                        styles.levelIntermediate
                      }
                    ></View>
                    <Text style={styles.levelText}>{classItem.level}</Text>
                  </View>
                  <View
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      width: "80%",
                    }}
                  >
                    <Text style={styles.className}>{classItem.name}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.studio}>{classItem.teacher.username}</Text>
                    {/* <View style={styles.dot}></View>
                    <Text style={styles.studio}>{classItem.studio}</Text> */}
                  </View>
                  <Text style={styles.dayTime}>
                    Monday &nbsp;
                    12:00 &nbsp;-&nbsp; 14:00
                  </Text>
                  {/* {classItem.myJoinStatus &&
                    classItem.myJoinStatus === "pending" && ( */}
                  <Text style={styles.statusMsg}>
                    {classItem.status}
                  </Text>
                  {/* )}
                  {classItem.status &&
                    !classItem.myJoinStatus &&
                    classItem.status === "pending" && (
                      <Text style={styles.statusMsg}>
                        Waiting For Admin Approval
                      </Text>
                    )} */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  scrollView: {
    // marginTop: 10,
    marginBottom: '28%',
  },

  closeIconBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIcon: {
    width: 14,
    height: 14,
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "roboto-light",
    marginTop: 20,
    fontWeight: "300",
  },

  levelIntermediate: {
    width: 4,
    height: 13,
    backgroundColor: "#FFEB00",
    marginTop: 2,
  },

  groupTitle: {
    fontSize: 20,
    textTransform: "uppercase",
    marginTop: 25,
    fontWeight: "300",
  },

  groupBox: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  classImg: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },

  classInfo: {
    // marginLeft: 20,
    paddingHorizontal: 20,
  },

  levelBox: {
    flexDirection: "row",
  },

  levelAdvance: {
    width: 4,
    height: 14,
    backgroundColor: "#FF6565",
    marginTop: 4,
  },

  levelBeginner: {
    width: 4,
    height: 14,
    backgroundColor: "#01C75D",
    marginTop: 4,
  },

  levelText: {
    fontSize: 14,
    marginLeft: 5,
    textTransform: "uppercase",
  },

  className: {
    fontSize: 16,
    fontFamily: "roboto-regular",
    marginTop: 5,
  },
  dot: {
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },

  studio: {
    fontSize: 14,
    fontWeight: "300",
  },

  dayTime: {
    fontSize: 14,
    fontWeight: "200",
  },
  statusMsg: {
    fontSize: 14,
    fontWeight: "200",
  },
  contentBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptySearchText: {
    fontSize: 24,
    fontFamily: "roboto-regular",
    color: "#949599",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
