import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ASSIGNMENT,
  AUTHENTICATIONS,
  CLASS,
  EXAM,
} from '../services/api.constants';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../utils/AuthContext';
import { Button } from 'native-base';
const { width, height } = Dimensions.get('screen');

export default function AssignmentsTab() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [assignments, setAssignments] = React.useState([]);
  const { userToken, userType } = React.useContext(AuthContext);
  const [limit, setLimit] = React.useState(5);
  const [assignmentsCount, setAssignmentCount] = React.useState(0);

  let [user, setUser] = React.useState(userToken);
  const { currentScreen, height, containerHeight } =
    React.useContext(ThemeContext);

  function getData(pageLimit) {
    if (userType.toLowerCase() === 'user') {
      studentApiCall(pageLimit);
    } else {
      teacherApiCall(pageLimit);
    }
  }
  React.useEffect(() => {
    console.log(user);
    getData(limit);
  }, []);
  function teacherApiCall(pageLimit) {
    fetch(
      AUTHENTICATIONS.API_URL +
      ASSIGNMENT.GET_ALL_ASSIGNMENTS_BY_TEACHER_ID +
      user +
      '/' +
      pageLimit,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('assignments ', responseJson.data);
        setAssignments(responseJson.data);
        setAssignmentCount(responseJson.count);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function studentApiCall(pageLimit) {
    fetch(
      AUTHENTICATIONS.API_URL +
      ASSIGNMENT.GET_ALL_COMPLETED_STUDENT_ASSIGNMENTS +
      user +
      '/' +
      pageLimit,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('assignments ', responseJson.data);
        setAssignments(responseJson.data);
        setAssignmentCount(responseJson.count);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function loadMore() {
    let x = limit + 5;
    console.log(x);
    setLimit(x);
    getData(x);
  }
  function formatDate(date) {
    console.log(new Date(date))
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  function formatTime(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  if (userType.toLowerCase() === 'user') {
    return (
      <View style={styles.container}>
        <View style={{ height: containerHeight }}>
          {!assignments || assignments.length == 0 ? (
            <View style={styles.contentBox}>
              <Text style={styles.emptySearchText}>
                No Assignments Has Been Found
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 15 }}>
                {assignments.map((assignmentItem, index) => (
                  <TouchableOpacity
                    style={[styles.groupBox, styles.segment]}
                    key={index}
                    onPress={() => {
                      navigation.navigate('AssignmentDetails', {
                        assignmentID: assignmentItem.assignment._id,
                      });
                    }}>
                    <Image
                      source={require('../assets/images/bg.jpg')}
                      style={styles.classImg}
                    />
                    <View style={styles.classInfo}>
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                          width: '80%',
                        }}>
                        <Text style={styles.className}>
                          {assignmentItem.assignment.title}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.studio}>
                          {assignmentItem.teacher.username}
                        </Text>
                      </View>
                      <Text style={styles.dayTime}>
                        Monday &nbsp; 12:00 &nbsp;-&nbsp; 14:00
                      </Text>
                      <Text style={styles.statusMsg}>
                        {assignmentItem.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginVertical: 15 }}>
                {assignmentsCount < limit ? (
                  <></>
                ) : (
                  <Button onPress={() => loadMore()}>Load More</Button>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: containerHeight }}>
          {!assignments || assignments.length == 0 ? (
            <View style={styles.contentBox}>
              <Text style={styles.emptySearchText}>
                No Assignments Has Been Found
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 15 }}>
                {assignments.map((assignmentItem, index) => (
                  <TouchableOpacity
                    style={[styles.groupBox, styles.segment]}
                    key={index}
                    onPress={() => {
                      navigation.navigate('AssignmentDetails', {
                        assignmentID: assignmentItem._id,
                      });
                    }}>
                    <Image
                      source={require('../assets/images/bg.jpg')}
                      style={styles.classImg}
                    />
                    <View style={styles.classInfo}>
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.className}>
                          {assignmentItem.title}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.studio}>
                          {assignmentItem.teacher.username}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.dayTime}>
                          Deadline: Monday 12:00
                        </Text>
                      </View>
                      <Text style={styles.statusMsg}>
                        {assignmentItem.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginVertical: 15 }}>
                {assignmentsCount < limit ? (
                  <></>
                ) : (
                  <Button onPress={() => loadMore()}>Load More</Button>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingHorizontal:15
  },
  scrollView: {
  },

  closeIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    width: 14,
    height: 14,
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'roboto-light',
    marginTop: 20,
    fontWeight: '300',
  },

  levelIntermediate: {
    width: 4,
    height: 13,
    backgroundColor: '#FFEB00',
    marginTop: 2,
  },

  groupTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
    marginTop: 25,
    fontWeight: '300',
  },

  groupBox: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },

  classImg: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginTop: -20
  },

  classInfo: {
    // marginLeft: 20,
    paddingHorizontal: 20,
  },

  levelBox: {
    flexDirection: 'row',
  },

  levelAdvance: {
    width: 4,
    height: 14,
    backgroundColor: '#FF6565',
    marginTop: 4,
  },

  levelBeginner: {
    width: 4,
    height: 14,
    backgroundColor: '#01C75D',
    marginTop: 4,
  },

  levelText: {
    fontSize: 14,
    marginLeft: 5,
    textTransform: 'uppercase',
  },

  className: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    marginTop: 5,
  },
  dot: {
    height: 3,
    width: 3,
    backgroundColor: 'black',
    borderRadius: 100,
    margin: 5,
    marginTop: 10,
  },

  studio: {
    fontSize: 14,
    fontWeight: '300',
  },

  dayTime: {
    fontSize: 14,
    fontWeight: '200',
  },
  statusMsg: {
    fontSize: 14,
    fontWeight: '200',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptySearchText: {
    fontSize: 24,
    fontFamily: 'roboto-regular',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 62,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  segmentButtons: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
    // marginVertical: 5,    
    width: width / 2.3
  },
  segment: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    borderRadius: 15,
    // marginVertical: 5,    
  }
});