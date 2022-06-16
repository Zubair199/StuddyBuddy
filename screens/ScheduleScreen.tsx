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
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AUTHENTICATIONS, CLASS } from "../services/api.constants";
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker'
import { Select, Input, TextArea, IconButton } from "native-base";
import MainLayout from "./MainLayout";
import { AuthContext } from "../utils/AuthContext";

export default function SchedulesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // const onClose = () => navigation.navigate("ClassesScreen");
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState<any>();
  // const [grouped, setGrouped] = React.useState<any>();
  const [groupList, setGroupList] = React.useState<any>();
  const [classes, setClasses] = React.useState([])
  const [search, setSearch] = React.useState([])
  const { userToken, userType } = React.useContext(AuthContext);


  let [user, setUser] = React.useState(userToken)

  let [prevDate, setPrevDate] = React.useState(new Date())
  let [nextDate, setNextDate] = React.useState(new Date())

  let [date, setDate] = React.useState(new Date())
  let [stringDate, setStringDate] = React.useState("")
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  React.useEffect(() => {
    console.log(user)
    if (userType.toLowerCase() === "user") {
      studentApiCall(date);
    }
    else {
      teacherApiCall(date)
    }
  }, [])
  const [open, setOpen] = React.useState(false)
  let [_startdate, _setStartdate] = React.useState(new Date())
  let [datePicketDate, setDatePicketDate] = React.useState(new Date())

  function openDatePicker() {
    setOpen(true)
  }
  // function makeDate(text) {
  //   let _date = new Date(text)
  //   const _dateString = days[_date.getDay()] + ', ' + monthNames[_date.getMonth()] + " " + _date.getDate();
  //   setStringDate(_dateString);
  // }

  const teacherApiCall = (text) => {
    let _Date = new Date(text)
    const month = (_Date.getMonth() + 1)
    const year = _Date.getFullYear()
    const day = _Date.getDate()
    const _date = month + '/' + day + '/' + year
    const _dateString = days[_Date.getDay()] + ', ' + monthNames[_Date.getMonth()] + " " + day;
    setStringDate(_dateString)

    try {
      let body = {
        teacher: user,
        date: text,
      }
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(AUTHENTICATIONS.API_URL + CLASS.GET_TEACHER_SCHEDULE, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('classes ', responseJson.data)
          setClasses(responseJson.data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch (err) {
      console.log(err)
    }
  }
  const studentApiCall = (text) => {
    let _Date = new Date(text)
    const month = (_Date.getMonth() + 1)
    const year = _Date.getFullYear()
    const day = _Date.getDate()
    const _date = month + '/' + day + '/' + year
    const _dateString = days[_Date.getDay()] + ', ' + monthNames[_Date.getMonth()] + " " + day;
    setStringDate(_dateString)

    try {
      let body = {
        student: user,
        date: text,
      }
      let requestObj = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(AUTHENTICATIONS.API_URL + CLASS.GET_STUDENT_SCHEDULE, requestObj)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('classes ', responseJson.data)
          setClasses(responseJson.data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch (err) {
      console.log(err)
    }
  }

  function component() {
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

        <View>
          <Text style={styles.title}>My Schedule</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: '400', fontSize: 20 }}>{stringDate}</Text>
          </View>
          <View>
            <IconButton
              icon={
                <Icon
                  name="calendar"
                  style={{ marginRight: 15 }}
                  size={25}
                  onPress={() => { console.log("preess"); openDatePicker() }}
                />
              }
            />
            <DatePicker
              modal
              open={open}
              date={_startdate}
              onConfirm={(text) => {
                _setStartdate(text);
                setOpen(false);
                studentApiCall(text);
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
        </View>
        {/* {!groupList || groupList.length == 0 ? (
        <View style={styles.contentBox}>
          <Text style={styles.emptySearchText}>
            No Class Has Been Added Yet
          </Text>
        </View>
      ) : ( */}
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
              {classes.map((classItem, index) => (
                <TouchableOpacity
                  style={styles.groupBox}
                  key={index}
                  onPress={() => {
                    navigation.navigate('ClassDetails', { classID: classItem.class._id })
                  }}
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
                      <Text style={styles.levelText}>{classItem.class.level}</Text>
                    </View>
                    <View
                      style={{
                        flexWrap: "wrap",
                        flexDirection: "row",
                        width: "80%",
                      }}
                    >
                      <Text style={styles.className}>{classItem.class.name}</Text>
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
                      {classItem.class.status}
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
  return (
    <MainLayout Component={component()} />
  )
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
