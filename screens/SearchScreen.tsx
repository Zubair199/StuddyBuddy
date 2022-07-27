import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {AUTHENTICATIONS, CLASS} from '../services/api.constants';
import {AuthContext} from '../utils/AuthContext';
import MainLayout from './MainLayout';
import {Button} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {Radio, Select} from 'native-base';

export default function SearchScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // const onClose = () => navigation.navigate("ClassesScreen");
  const {userToken} = React.useContext(AuthContext);

  const [loader, setLoader] = React.useState(false);
  const [data, setData] = React.useState<any>();
  // const [grouped, setGrouped] = React.useState<any>();
  const [groupList, setGroupList] = React.useState<any>();

  const [classes, setClasses] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [status, setStatus] = React.useState('approved');

  let [user, setUser] = React.useState(userToken);

  const [value, setValue] = React.useState('students');
  let [classDuration, setClassDuration] = React.useState('');
  let [subject, setSubject] = React.useState('');
  let [subjectID, setSubjectID] = React.useState('');
  let [subjects, setSubjects] = React.useState([]);
  let [level, setLevel] = React.useState('');
  let [hireFlag, setHireFlag] = React.useState('');

  const [isModal, setIsModal] = React.useState(false);
  function toggleModal() {
    console.log('modal');
    setIsModal(!isModal);
  }

  React.useEffect(() => {
    console.log(user);
    // studentApiCall()
    fetch(AUTHENTICATIONS.API_URL + CLASS.SUBJECTS)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        setSubjects(responseJson.data);

        // Alert.alert(responseJson.data.message)
      })
      .catch((err: any) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  function teacherApiCall() {
    try {
      fetch(
        AUTHENTICATIONS.API_URL +
          CLASS.GET_TEACHER_SEARCH +
          user +
          '/' +
          status,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('classes ', responseJson.data);
          setClasses(responseJson.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function studentApiCall() {
    try {
      fetch(
        AUTHENTICATIONS.API_URL +
          CLASS.GET_TEACHER_SEARCH +
          user +
          '/' +
          status,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('classes ', responseJson.data);
          setClasses(responseJson.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function searchClasses(text) {
    let backup = classes;
    let backup1 = classes;
    backup = backup.filter(val => {
      return val.name.toString().toLowerCase().includes(text.toLowerCase());
    });
    console.log(backup.length);
    if (backup.length !== 0) {
      setClasses(backup);
    } else {
      setClasses(backup1);
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Button
            onPress={() => toggleModal()}
            buttonStyle={{width: '100%'}}
            containerStyle={{width: '100%'}}
            iconRight
            icon={<Icon name="filter" size={15} color="white" />}
            title="Filter"
          />
        </View>

        <Modal
          animationType="slide"
          visible={isModal}
          onRequestClose={() => {
            toggleModal();
          }}>
          <View style={{flex: 1, backgroundColor: '#ffffff', padding: 15}}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}>
                <Icon name="close" size={25} />
              </TouchableOpacity>
            </View>
            <View style={{height: '90%'}}>
              <View style={{marginVertical: 10}}>
                <Radio.Group
                  direction={'row'}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  name="myRadioGroup"
                  value={value}
                  onChange={nextValue => {
                    setValue(nextValue);
                  }}>
                  <Radio value="students" my="1">
                    Students
                  </Radio>
                  <Radio value="teachers" my="1">
                    Teachers
                  </Radio>
                  <Radio value="classes" my="1">
                    Classes
                  </Radio>
                </Radio.Group>
              </View>
              <View style={{marginVertical: 10}}>
                <TextInput
                  placeholder="Enter Name"
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    borderRadius: 5,
                    height: 43,
                  }}
                />
              </View>
              {value === 'classes' && (
                <View>
                  <View style={{marginVertical: 10}}>
                    <Select
                      accessibilityLabel="Choose Subject"
                      selectedValue={subjectID}
                      placeholder="Choose Subject"
                      onValueChange={itemValue => {
                        setSubjectID(itemValue);
                        console.log(
                          subjects.filter(item => item._id === itemValue)[0]
                            .name,
                        );
                        setSubject(
                          subjects.filter(item => item._id === itemValue)[0]
                            .name,
                        );
                      }}>
                      {subjects.map((item, index) => {
                        return (
                          <Select.Item
                            label={item.name}
                            key={index}
                            value={item._id}
                          />
                        );
                      })}
                    </Select>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Select
                      accessibilityLabel="Choose Level"
                      selectedValue={level}
                      placeholder="Choose Level"
                      onValueChange={itemValue => setLevel(itemValue)}>
                      <Select.Item label="Beginner" value="Beginner" />
                      <Select.Item label="Intermediate" value="Intermediate" />
                      <Select.Item label="Advanced" value="Advanced" />
                    </Select>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <Select
                      accessibilityLabel="Choose Class Duration"
                      selectedValue={classDuration}
                      placeholder="Choose Class Duration"
                      onValueChange={itemValue => {
                        setClassDuration(itemValue);
                      }}>
                      <Select.Item label="1 month" value="1" />
                      <Select.Item label="2 month" value="2" />
                      <Select.Item label="3 month" value="3" />
                      <Select.Item label="4 month" value="4" />
                      <Select.Item label="5 month" value="5" />
                      <Select.Item label="6 month" value="6" />
                    </Select>
                  </View>
                </View>
              )}
              {value === 'teachers' && (
                <View>
                  <View style={{marginVertical: 10}}>
                    <Select
                      accessibilityLabel="Available to hire"
                      selectedValue={hireFlag}
                      onValueChange={itemValue => {
                        setHireFlag(itemValue);
                      }}
                      placeholder="Available to hire">
                      <Select.Item label="Yes" value="1" />
                      <Select.Item label="No" value="0" />
                    </Select>
                  </View>
                </View>
              )}
            </View>
            <View style={{height: '10%'}}>
              <Button
                buttonStyle={{width: '100%'}}
                containerStyle={{width: '100%'}}
                title="Search"
              />
            </View>
          </View>
        </Modal>

        {!classes || classes.length == 0 ? (
          <View style={styles.contentBox}>
            <Text style={styles.emptySearchText}>No Class Has Been Found</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View>
              {classes.map(classItem => (
                <TouchableOpacity
                  style={styles.groupBox}
                  key={classItem}
                  onPress={() => {
                    navigation.navigate('ClassDetails', {
                      classID: classItem._id,
                    });
                  }}>
                  <Image
                    source={require('../assets/images/bg.jpg')}
                    style={styles.classImg}
                  />
                  <View style={styles.classInfo}>
                    <View style={styles.levelBox}>
                      <View style={styles.levelIntermediate}></View>
                      <Text style={styles.levelText}>{classItem.level}</Text>
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        width: '80%',
                      }}>
                      <Text style={styles.className}>{classItem.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.studio}>
                        {classItem.teacher.username}
                      </Text>
                      {/* <View style={styles.dot}></View>
                    <Text style={styles.studio}>{classItem.studio}</Text> */}
                    </View>
                    <Text style={styles.dayTime}>
                      Monday &nbsp; 12:00 &nbsp;-&nbsp; 14:00
                    </Text>
                    {/* {classItem.myJoinStatus &&
                    classItem.myJoinStatus === "pending" && ( */}
                    <Text style={styles.statusMsg}>{classItem.status}</Text>
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
  return <MainLayout Component={component()} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  scrollView: {
    // marginTop: 10,
    marginBottom: '28%',
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
    color: '#949599',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
