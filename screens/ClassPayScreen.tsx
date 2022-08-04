/*
title: ClassPayScreen
Author: Sarath Ambegoda
Created on: 25/09/2020
Description: Pay for class
================
/* ==================================== MODIFICATION ======================================== *
* Author: Bilal Ahmed
* Modified On: 2021/05/18
* Description: Added promotion param in makePaymentView routes. 
* ========================================================================================== */

import * as React from 'react';
import {View} from '../components/Themed';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useNavigation,
  useIsFocused,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {AuthContext} from '../utils/AuthContext';
import WebView from 'react-native-webview';

export default function ClassPayScreen({route}) {
  const useUserAuth = () => React.useContext(AuthContext);
  const {userToken} = useUserAuth()!;

  const isFocused = useIsFocused();

  const {classID} = route.params;
  let webview = null;

  const [loader, setLoader] = React.useState(true);

  const navigation = useNavigation();
  const previousScreen = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={previousScreen} style={styles.titleIconBox}>
        <Text style={styles.title}>Payment</Text>
      </TouchableOpacity>

      {/* header starts here */}
      {/* <ScrollView> */}
      {/* <View style={{ flex: 1 }}> */}
      {/* {loader && <Loader />} */}
      <WebView
        ref={ref => {
          webview = ref;
        }}
        style={{width: '100%', height: 1000}}
        scalesPageToFit={true}
        startInLoadingState={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        saveFormDataDisabled={false}
        originWhitelist={['*']}
        allowFileAccess
        onMessage={event => {}}
        onLoadEnd={() => {
          setTimeout(function () {
            setLoader(false);
          }, 1000);
        }}
        source={{
          uri: 'https://buy.stripe.com/test_4gw16VaRuf5i5sQ144',
        }}
      />
      {/* </View> */}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingBottom: 30,
  },

  title: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 5,
    textTransform: 'uppercase',
    fontFamily: 'roboto-light',
  },
  titleIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginTop: 20,
    paddingHorizontal: 15,
  },
  backIconIPhone: {
    marginTop: 14,
    height: 17,
    width: 10,
  },
  backIcon: {
    marginTop: 18,
    height: 17,
    width: 10,
  },
  scrollView: {
    marginTop: 10,
    // marginHorizontal: -1,
  },
});