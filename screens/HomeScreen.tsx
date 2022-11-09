import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import {  SafeAreaView, ScrollView, StyleSheet,  TouchableOpacity, View,  Dimensions, Image } from 'react-native';
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { AUTH, AUTHENTICATIONS} from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { app, info } from '../constants/themeColors';
const { width, height } = Dimensions.get('screen');
let iconSize = 30
let homeSections = [
  {
    name: "My Schedule",
    colors: ['#ab47bc', '#8e24aa'],
    icon: <MaterialCommunityIcon name="calendar-month" size={iconSize} color={"#fff"} />,
    screenName: 'ScheduleScreen',
  },
  {
    name: "Classes",
    colors: ['rgb(236, 64, 122)', 'rgb(216, 27, 96)'],
    icon: <MaterialCommunityIcon name="human-male-board" size={iconSize} color={"#fff"} />,
    screenName: 'Classes',
  },
  {
    name: "Search",
    colors: ['#ffa726', '#fb8c00'],
    icon: <MaterialCommunityIcon name="layers-search-outline" size={iconSize} color={"#fff"} />,
    screenName: 'SearchScreen',
  },
  {
    name: "Users",
    colors: ['rgb(116, 123, 138)', 'rgb(73, 83, 97)'],
    icon: <MaterialCommunityIcon name="account-group" size={iconSize} color={"#fff"} />,
    screenName: 'NetworkScreen',
  },
  {
    name: "Payments",
    colors: ['rgb(102, 187, 106)', 'rgb(67, 160, 71)'],
    icon: <MaterialIcons name="payments" size={iconSize} color={"#fff"} />,
    screenName: 'Payments',
  },
  {
    name: "Messages",
    colors: ['rgb(73, 163, 241)', 'rgb(26, 115, 232)'],
    icon: <AntDesign name="message1" size={iconSize} color={"#fff"} />,
    screenName: 'Messages',
  },
  // {
  //   name: "Notifications",
  //   colors: ['rgb(239, 83, 80)', 'rgb(229, 57, 53)'],
  //   icon: <Ionicons name="notifications" size={iconSize} color={"#fff"} />,
  //   screenName: 'NotificationScreen',
  // },
  {
    name: "Profile",
    colors: ['rgb(66, 66, 74)', 'rgb(25, 25, 25)'],
    icon: <FontAwesome name="user-circle-o" size={iconSize} color={"#fff"} />,
    screenName: 'Profile',
  },
  {
    name: "Settings",
    colors: ["#35465c", "#2a3749"],
    icon: <FontAwesome name="gear" size={iconSize} color={"#fff"} />,
    screenName: 'Settings',
  },
]

export default function HomeScreen({ route }) {
  const { userToken, userType } = React.useContext(AuthContext);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('')
  const [image, setImage] = React.useState('')
  React.useEffect(() => {
    console.log("Dashboard", userType)
    fetch(AUTHENTICATIONS.API_URL + AUTH.GET_PROFILE + userToken)
        .then(response => response.json())
        .then(responseJson => {
          console.log('profgile =>', responseJson);
          if (responseJson.profile) {
            if (!responseJson.profile.image) {
              setImage('');
            } else {
              setImage(responseJson.profile.image);
            }
          }
          if (responseJson.user) {
            setUsername(responseJson.user.username);
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
          <LinearGradient colors={[app.lightBlue, info.focus]} style={[styles.linearGradient, styles.segment]}>
            <View style={{ paddingVertical: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>

                  <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }} >Hi,</Text>
                  <Text style={{ paddingBottom: 8, color: "white", fontSize: 22, fontWeight: "bold" }}>{ username ? username : "John Doe" }</Text>
                </View>
                <View>
                  <Image
                    source={
                      image === ''
                      ? require('../assets/images/profile.png')
                      : { uri: AUTHENTICATIONS.API_URL + image }
                    }
                    style={styles.avatar}
                  />

                </View>
              </View>
              <View style={{ marginTop: 20, alignSelf: "flex-end", paddingBottom: 10 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Welcome Back</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ paddingVertical: 15, paddingHorizontal: 15, flexDirection: "row", flexWrap: "wrap" }}>
          {
            homeSections.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={{ width: '50%', paddingVertical: 5 }} onPress={() => navigation.navigate(item.screenName)} >
                  <LinearGradient
                    colors={item.colors}
                    style={[styles.linearGradient, styles.segmentButtons]}
                  >
                    <View style={{ paddingVertical: 15 }}>
                      <View style={{ alignItems: "center" }}>
                        {item.icon}
                      </View>
                      <Text style={styles.buttonText}>
                        {item.name}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


// Later on in your styles..
var styles = StyleSheet.create({
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