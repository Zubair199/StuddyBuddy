import * as React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useUserAuth} from '../navigation';

import genericStyle from '../assets/styles/styleSheet';

export default function SettingsScreen() {
  const {setUserToken, setUserName} = useUserAuth()!;

  const logout = () => {
    setUserToken('');
    setUserName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={logout}
        style={{marginTop: 15, marginBottom: 65, alignSelf: 'center'}}>
        <Text style={[genericStyle.heading, {alignSelf: 'center'}]}>
          Logout
        </Text>
        <View style={[genericStyle.underline]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  paymentInfoAlert: {
    width: '100%',
    padding: 15,
    borderColor: '#FFCCCB',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  infoHeader: {
    width: '70%',
    color: '#3878ee',
    fontSize: 22,
  },
  arrow: {
    width: 40,
    height: 40,
    tintColor: '#3878ee',
  },
  tabIcon: {
    width: 35,
    height: 'auto',
    marginRight: 10,
    tintColor: '#3878ee',
  },
  accountInfo: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 0,
  },
  toggleContainer: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    paddingVertical: 0,
    justifyContent: 'space-between',
  },
  infoEdit: {
    color: '#3878ee',
    fontSize: 18,
  },
  infoDetails: {
    color: '#3878ee',
    marginTop: 10,
    fontSize: 20,
  },
  header: {
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  actionBox: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
