import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import {Text, Badge, Icon, withBadge} from 'react-native-elements';
import {AuthContext} from '../utils/AuthContext';
import {ThemeContext} from '../context/ThemeContext';
import sizes from 'native-base/lib/typescript/theme/base/sizes';
import api from '../services/api.services';
import {
  storeLocalData,
  getLocalData,
  checkNetwork,
} from '../utils/HelperFunctions';
export default function Footer(props) {
  const [messageCount, setMessageCount] = React.useState(0);
  const navigation = useNavigation();
  const BadgedIcon = withBadge(messageCount)(Icon1);
  React.useState(async () => {
    await api.getUnreadCounts().then(async resp => {
      if (resp) {
        console.log('************************* badge');
        console.log(resp.data.data);
        if (resp.data) {
          if (resp.data.data.messageCount || resp.data.data.messageCountGroup) {
            await storeLocalData(
              '@unread_message_count',
              '' + resp.data.data.messageCount,
            );
            setMessageCount(
              resp.data.data.messageCount + resp.data.data.messageCountGroup,
            );
          }
          if (resp.data.data.notificationCount) {
            await storeLocalData(
              '@unread_notification_count',
              '' + resp.data.notificationCount,
            );
          }
        } else {
          await storeLocalData('@unread_message_count', '0');
          setMessageCount(0);
          await storeLocalData('@unread_notification_count', '0');
        }
      }
    });
  }, []);
  const {currentScreen, setCurrentScreen, width} =
    React.useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: '#3878ee',
        height: 60,
        width: width - 40,
        marginLeft: 20,
        marginBottom: 10,
        borderRadius: 15,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen('Classes');
            navigation.navigate('Classes');
          }}
          style={{alignItems: 'center'}}>
          <IconFontAwesome
            name="briefcase"
            size={25}
            color={currentScreen === 'Classes' ? '#ffbb74' : 'white'}
          />
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Classes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen('Messages');
            navigation.navigate('Messages');
          }}
          style={{alignItems: 'center'}}>
          <View
            style={{
              position: 'relative',
              left: 15,
              top: -8,
              width: 0,
              height: 0,
            }}>
            {messageCount !== 0 ? <BadgedIcon /> : <></>}
          </View>
          <Icon1
            name="message1"
            size={25}
            color={currentScreen === 'Messages' ? '#ffbb74' : 'white'}
          />
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen('Payments');
            navigation.navigate('Payments');
          }}
          style={{alignItems: 'center'}}>
          <IconFontAwesome
            name="diamond"
            size={25}
            color={currentScreen === 'Payments' ? '#ffbb74' : 'white'}
          />
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Payments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen('Profile');
            navigation.navigate('Profile');
          }}
          style={{alignItems: 'center'}}>
          <IconFontAwesome
            name="user-circle-o"
            size={25}
            color={currentScreen === 'Profile' ? '#ffbb74' : 'white'}
          />
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentScreen('Settings');
            navigation.navigate('Settings');
          }}
          style={{alignItems: 'center'}}>
          <IconFontAwesome
            name="gear"
            size={25}
            color={currentScreen === 'Settings' ? '#ffbb74' : 'white'}
          />
          <Text style={{color: 'white', fontSize: 13, fontWeight: '400'}}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
