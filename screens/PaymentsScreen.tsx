import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Text } from 'native-base';
import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { AUTHENTICATIONS, STRIPE } from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';
import MainLayout from './MainLayout';

export default function PaymentsScreen() {
  const { userToken, userType, userEmail } = React.useContext(AuthContext);

  const [subscriptions, setSubscriptions] = React.useState([])

  React.useEffect(() => {
    fetch(AUTHENTICATIONS.API_URL + STRIPE.GET_SUBSCRIPTIONS + userToken)
      .then(response => response.json())
      .then(responseJson => {
        console.log('PAYMENTS : = ', responseJson.subscriptions);
        let classes = responseJson.classes
        let res = responseJson.subscriptions.subscriptions.map(item => {
          if (item.metadata) {
            let _class = item.metadata.class
            // console.log(_class)
            // console.log(classes.filter(x => x._id === _class))
            let re = classes.find(x => x._id === _class)
            return {
              class: re,
              subscription: item.subscription
            }
          }
          return null
        })
        console.log(res)
        setSubscriptions(res)
      })
      .catch(err => {
        console.log(err);
      });
  }, [])
  function component() {
    return (
      <SafeAreaView>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {
            subscriptions.map((subscription, index) => {
              if (subscription) {
                let _class = subscription.class;
                let sub = subscription.subscription
                let startDate = new Date(sub.start_date*1000).toString()
                console.log(sub.start_date, startDate)
                let endDate = new Date(sub.current_period_end*1000).toString()
                return (
                  <View key={index} style={{ marginBottom: 20 }}>
                    <Text>Class: {_class.name}</Text>
                    <Text>Subject: {_class.Subject.name}</Text>
                    <Text>Teacher: {_class.Teacher.username}</Text>
                    <Text>Subscription Start Date: {startDate}</Text>
                    <Text>Subscription Last Date: {endDate}</Text>

                  </View>
                )

              }
            })
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <MainLayout Component={component()} />
  )
}

const styles = StyleSheet.create({
  scrollView: {
    // marginTop: 10,
    marginBottom: '20%',
    paddingHorizontal: 15,
  },

});
