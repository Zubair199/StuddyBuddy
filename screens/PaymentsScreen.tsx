import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Text } from 'native-base';
import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import { VStack, Box, Divider } from 'native-base';
import { AUTHENTICATIONS, STRIPE } from '../services/api.constants';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

import { AuthContext } from '../utils/AuthContext';
import MainLayout from './MainLayout';

export default function PaymentsScreen() {
  const { userToken, userType, userEmail } = React.useContext(AuthContext);

  const [platformPayments, setPlatformPayments] = React.useState([])
  const [classPayments, setClassPayments] = React.useState([])
  const [classList, setClassList] = React.useState([])
  const [payment, setPayment] = React.useState(null)
  const [classDetails, setClassDetails] = React.useState(null)

  React.useEffect(() => {
    fetch(AUTHENTICATIONS.API_URL + STRIPE.GET_SUBSCRIPTIONS + userToken)
      .then(response => response.json())
      .then(responseJson => {
        setPlatformPayments(responseJson.platformPayments)
        setClassPayments(responseJson.classPayments)
        setClassList(responseJson.classes)
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  function showPaymentDetails(paymentDetail) {
    console.log(paymentDetail)
    let _class = classList.find(item => item._id === paymentDetail.class)
    console.log('_class', _class)
    setClassDetails(_class)
    fetch(AUTHENTICATIONS.API_URL + STRIPE.GET_PAYMENT_DETAILS + userToken + '/' + paymentDetail.paymentIntentId)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('PAYMENTS : = ', responseJson);
        setPayment(responseJson.payment)

        toggleModal()
      })
      .catch(err => {
        console.log(err);
      });
  }
  const [isModal, setIsModal] = React.useState(false);
  function toggleModal() {
    console.log('modal');
    setIsModal(!isModal);
  }
  function getDate(d) {
    let date = new Date(d * 1000)
    return formatDate(date.toString())
  }
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#ffffff",
    }}>
      <Modal
        animationType="slide"
        visible={isModal}
        onRequestClose={() => {
          toggleModal();
        }}>
        {payment !== null &&
          <View
            style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}>
                <AntDesignIcon name="close" size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
                justifyContent: 'center',
              }}>
              <Text style={styles.heading}>Payment Details</Text>
            </View>


            <View style={{ marginVertical: 20 }}>

              <View>
                <MaterialIconsIcon name="payments" size={24} />
                <Text style={styles.title1} >Payment</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>${(payment.amount / 100)} USD</Text>
                <Text>{payment.status}</Text>
              </View>
              <View>
                <Text>Paid on {getDate(payment.created)}</Text>
              </View>
            </View>
            <Divider />
            <View style={{ marginVertical: 20 }}>
              <View>
                <Text>{classDetails.name}</Text>
                <Text>{classDetails.Subject.name}</Text>
                <Text>{classDetails.Teacher.username}</Text>
              </View>

            </View>

          </View>

        }
      </Modal>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {
          classPayments.map((classPay, index) => {
            let _class = classList.find(item => item._id === classPay.class)
            if (_class) {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 5,
                    elevation: 4,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    padding: 15
                  }}
                >
                  <TouchableOpacity onPress={() => showPaymentDetails(classPay)}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                      <View>
                        <Text style={styles.title}>{_class.name}</Text>
                        <Text style={styles.subtitle} >{_class.Teacher.username}</Text>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                          <View>
                            <Text style={styles.title}> {_class.price} USD</Text>
                          </View>
                          <View>
                            <Icon name='chevron-right' size={20} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  scrollView: {
    // marginTop: 10,
    // marginBottom: '20%',
    paddingHorizontal: 15,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  title1: {
    color: '#000',
    fontSize: 20,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    color: '#000',
    fontSize: 13
  },
  heading: {
    fontSize: 25,
    padding: 10,
    textTransform: 'uppercase',
    fontFamily: 'roboto-light',
  },
});
