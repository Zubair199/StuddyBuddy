import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
const TimSort = require('timsort');
import {Text, View} from '../components/Themed';
import LottieView from 'lottie-react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import api from '../services/api.services';
//  import Loader from '../components/loader';
import moment from 'moment-timezone';
import {
  storeLocalData,
  getLocalData,
  checkNetwork,
} from '../utils/HelperFunctions';
import {AuthContext} from '../utils/AuthContext';
import MainLayout from './MainLayout';
import {Divider} from 'native-base';

export default function MessagesScreen() {
  const navigation = useNavigation();
  const [messagesList, setMessagesList] = React.useState<any>();
  const [loader, setLoader] = React.useState(false);
  const isFocused = useIsFocused();
  const {userToken, userType} = React.useContext(AuthContext);
  function onClose() {
    navigation.navigate('HomeScreen');
  }

  async function openChat(
    chatId: string,
    isEnabledChat: boolean,
    isBanned: boolean,
    group: Boolean,
    groupUsers: Array<String>,
  ) {
    let unreadCount = parseInt(await getLocalData('@unread_message_count'));
    if (unreadCount > 0) {
      unreadCount = unreadCount - 1;
    }
    await storeLocalData('@unread_message_count', '' + unreadCount);
    if (group) {
      navigation.navigate('ChatScreenG', {
        chatId: chatId,
        isEnabledChat: isEnabledChat,
        isBanned: isBanned,
        groupU: groupUsers,
      });
    } else {
      navigation.navigate('ChatScreen', {
        chatId: chatId,
        isEnabledChat: isEnabledChat,
        isBanned: isBanned,
        history: 'M',
      });
    }
  }

  //  async function networkAsync() {
  //    let network = await checkNetwork()
  //    if (!network) {
  //      Alert.alert("Error", "Please Connect To Internet")
  //      return
  //    }
  //  }

  React.useEffect(() => {
    //  networkAsync()

    setLoader(true);
    let isCancelled = false;
    const fetchMessages = async () => {
      if (!isCancelled) {
        await api
          .getAllMessages()
          .then(async resp => {
            if (resp) {
              await api
                .getGroupMessages()
                .then(resp1 => {
                  //console.log(resp.data.meta.result);
                  const mes = resp.data.meta.result.concat(resp1.data);
                  console.log('GROUP MESSAGES');
                  // console.log(
                  //   moment(mes[0].lastMessageAt).valueOf(),

                  //   mes[0].message,
                  //   moment(mes[1].lastMessageAt).valueOf(),

                  //   mes[1].message,
                  // );
                  TimSort.sort(mes, function (a, b) {
                    return (
                      moment(b.lastMessageAt).valueOf() -
                      moment(a.lastMessageAt).valueOf()
                    );
                  });
                  setMessagesList(mes);
                })
                .catch(e => {
                  console.log(e);
                });
            }
          })
          .then(() => setLoader(false));

        await api.getUnreadCounts().then(async resp => {
          if (resp) {
            if (resp.data) {
              if (resp.data.messageCount) {
                await storeLocalData(
                  '@unread_message_count',
                  '' + resp.data.messageCount,
                );
              }
              if (resp.data.notificationCount) {
                await storeLocalData(
                  '@unread_notification_count',
                  '' + resp.data.notificationCount,
                );
              }
            } else {
              await storeLocalData('@unread_message_count', '0');
              await storeLocalData('@unread_notification_count', '0');
            }
          }
        });
      }
    };
    fetchMessages();
    return () => {
      isCancelled = true;
    };
  }, [isFocused]);

  function component() {
    if (loader || messagesList == undefined) {
      return (
        <LottieView
          source={require('../assets/images/Gifs/study.json')}
          autoPlay
          loop
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        {messagesList.length === 0 ? (
          <View style={styles.contentBox}>
            <Text style={styles.emptySearchText}>No Messages Received Yet</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {messagesList.map((message: any, index: number) => {
              console.log('--------------------------------------------');
              console.log(message.isGroupRead, userToken);

              console.log('--------------------------------------------');
              return (
                <View key={index}>
                  <View
                    key={index}
                    style={
                      message.isGroupRead
                        ? message.isGroupRead.includes(userToken)
                          ? styles.messageBoxWrapperRead
                          : styles.messageBoxWrapperNew
                        : message.isRead
                        ? styles.messageBoxWrapperRead
                        : styles.messageBoxWrapperNew
                    }>
                    {/* condition required when clicked on group chat go to that group chat  */}
                    <TouchableOpacity
                      onPress={() =>
                        openChat(
                          message.chatId,
                          message.isEnabledChat,
                          message.isBanned,
                          message.isGroupChat,
                          message.groupUsers,
                        )
                      }
                      style={styles.messageBox}>
                      <Image
                        source={require('../assets/images/profile-default.jpg')}
                        style={styles.messageImage}
                      />
                      <View style={styles.messageInfo}>
                        {message.isGroupRead ? (
                          message.isGroupRead.includes(userToken) ? (
                            <></>
                          ) : (
                            <Image
                              style={styles.newMessageIcon}
                              source={require('../assets/images/icons/new-message.png')}
                            />
                          )
                        ) : (
                          !message.isRead && (
                            <Image
                              style={styles.newMessageIcon}
                              source={require('../assets/images/icons/new-message.png')}
                            />
                          )
                        )}
                        <Text style={styles.messageDate}>
                          {moment().diff(message.lastMessageAt, 'hours') < 24
                            ? moment(message.lastMessageAt).fromNow(true)
                            : moment().diff(message.lastMessageAt, 'hours') >=
                                24 &&
                              moment().diff(message.lastMessageAt, 'hours') < 48
                            ? 'YESTERDAY'
                            : moment(message.lastMessageAt).format(
                                'MM/DD/YYYY',
                              )}
                        </Text>
                        <Text style={styles.messageName}>
                          {message.isGroupChat
                            ? 'Class: ' + message.classes[0].name
                            : message.username}
                        </Text>
                        <Text
                          numberOfLines={5}
                          ellipsizeMode="tail"
                          style={styles.messageDescription}>
                          {message.isGroupChat
                            ? message.username + ' : ' + message.message
                            : message.message}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Divider />
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
  return <MainLayout Component={component()} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  closeIconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    marginTop: 20,
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 20,
    fontFamily: 'roboto-light',
    textTransform: 'uppercase',
    // marginTop: 8,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    marginTop: 40,
  },
  messageBoxWrapperNew: {
    backgroundColor: '#D3D3D3',
    width: '100%',
  },
  messageBoxWrapperRead: {
    width: '100%',
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
    padding: 15,
  },
  messageImage: {
    width: '15%',
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  messageInfo: {
    width: '65%',
    backgroundColor: 'transparent',
  },
  messageDate: {
    fontSize: 15,
    color: '#000000',
    width: '100%',
    textTransform: 'uppercase',
  },
  messageName: {
    fontSize: 18,
    color: '#4B5F79',
    width: '100%',
    textTransform: 'uppercase',
  },
  messageDescription: {
    fontSize: 15,
    color: '#000000',
    flex: 1,
    marginEnd: 20,
  },
  newMessageIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 15,
    height: 15,
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
