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
import { View } from '../components/Themed';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useNavigation,
  useIsFocused,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { AuthContext } from '../utils/AuthContext';
import WebView from 'react-native-webview';
import { AUTHENTICATIONS, STRIPE } from '../services/api.constants';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
export default function PlatformPayScreen({ route }) {
  const { email ,userToken, userType } = React.useContext(AuthContext);
  let [user, setUser] = React.useState(userToken)

  const isFocused = useIsFocused();

  const [uri, setURI] = React.useState('');

  const [loader, setLoader] = React.useState(true);

  const navigation = useNavigation();
  const previousScreen = () => navigation.goBack();

  const [card, setCard] = React.useState(null)
  const fetchPaymentIntentClientSecret = async () => {
    console.log( AUTHENTICATIONS.API_URL + STRIPE.CREATE_PAYMENT_INTENT_PLATFORM )
    const response = await fetch( AUTHENTICATIONS.API_URL + STRIPE.CREATE_PAYMENT_INTENT_PLATFORM , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
        user: user,
      }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const { confirmPayment, loading } = useConfirmPayment();
  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    if(!card){
      Alert.alert("Error", "Card Details are required.")
      return
    }
    const billingDetails = {
      email: email,
    };

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      card
    });

    if (error) {
      console.log('Payment confirmation error', error);
      Alert.alert("Error", error.localizedMessage)
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
      Alert.alert("Success", "Your Payment is Successful!")
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={previousScreen} style={styles.titleIconBox}>
        <Text style={styles.title}>Payment</Text>
      </TouchableOpacity>
      <View>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            setCard(cardDetails)
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
      <View>
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      </View>
      {/* header starts here */}
      {/* <ScrollView> */}
      {/* <View style={{ flex: 1 }}> */}
      {/* {loader && <Loader />} */}
      {/* <WebView
        ref={ref => {
          webview = ref;
        }}
        style={{ width: '100%', height: 1000 }}
        scalesPageToFit={true}
        startInLoadingState={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        saveFormDataDisabled={false}
        originWhitelist={['*']}
        allowFileAccess
        onMessage={event => { }}
        onLoadEnd={() => {
          setTimeout(function () {
            setLoader(false);
          }, 1000);
        }}
        source={{
          uri: AUTHENTICATIONS.API_URL + STRIPE.CLASS_CHECHKOUT + userToken + "/" + classID + "/" + teacherID,
        }}
      /> */}
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
