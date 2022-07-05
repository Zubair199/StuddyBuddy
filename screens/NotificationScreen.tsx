import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import { Text, View } from "../components/Themed";
import { Portal, Button, Provider, Modal } from "react-native-paper";
import { AuthContext } from "../utils/AuthContext";
// import { FontAwesome } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import api from "../services/api.services";
//import Loader from "../components/loader";
import {
  checkNetwork,
  logError,
  storeLocalData,
} from "../utils/HelperFunctions";
import { useRef } from "react";
import MainLayout from "./MainLayout";

const useUserAuth = () => React.useContext(AuthContext);

interface dataTypes {
  data: any;
}

export default function NotificationsScreen(dataType: dataTypes) {
  const { userType } = useUserAuth()!;
  let isStudent: boolean = userType == "Student";
  const [activeTab, setActiveTab] = React.useState(
    isStudent ? "NEWS" : "NOTIFICATION"
  );
  const [selectedItemDate, setSelectedItemDate] = React.useState("");
  const [selectedItemTitle, setSelectedItemTitle] = React.useState("");
  const [selectedItemDescription, setSelectedItemDescription] = React.useState(
    ""
  );
  const [loader, setLoader] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(dataType.data);
  const [newsEvenets, setNewsEvenets] = React.useState<any>();
  const [notifications, setNotifications] = React.useState([]);
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigation = useNavigation();

  function onClose() {
    navigation.navigate("HomeScreen");
  }
  let isMounted = useRef(false);

  // async function networkAsync() {
  //   let network = await checkNetwork();
  //   if (!network) {
  //     Alert.alert("Error", "Please Connect To Internet");
  //     return;
  //   }
  // }

  const redirectDetail = (selectedItem: any) => {
    if (selectedItem) {
      if (selectedItem.screenName == "ProfileScreen") {
        navigation.navigate("Profile");
      } else {
        if (selectedItem && selectedItem.props && selectedItem.props.key) {
          switch (selectedItem.props.key) {
            case "NOTF_NEW_CLASS_PROMO_PUBLISHED":
              // console.log("promoId from notif. ", selectedItem.props.promoId)
              navigation.navigate("ViewPromoModal", {
                promoId: selectedItem.props.promoId,
              });
              break;

            case "NOTF_ONE_MONTH_AVAILED_HEADING":
              if (isStudent) {
                navigation.navigate("ViewPromoModal", {
                  promoId: selectedItem.props.promoId,
                });
              } else {
                navigation.navigate("ViewProfileScreen", {
                  promoId: selectedItem.props.studentId,
                });
              }
              break;

            case "NOTF_NEW_PROMO_PUBLISHED_APPROVED":
              navigation.navigate("ViewPromoModal", {
                promoId: selectedItem.props.promoId,
              });
              break;
            case "NOTF_NEW_FRIEND_REQUEST":
              navigation.navigate("ViewProfileScreen", {
                id: selectedItem.props.userId,
                action: selectedItem.props.action,
                notificationId: selectedItem._id,
              });
              break;

            case "NOTF_TEACHER_PROFILE_UPDATE_APPROVED":
              navigation.navigate("Profile");
              break;
            case "NOTF_STUDENT_SUBSCRIBED":
              navigation.navigate("ViewProfileScreen", {
                id: selectedItem.props.studentId,
                previousScreen: "NotificationsScreen"
              });
              break;
            case "NOTF_NEW_CLASS_SHARED":
              navigation.navigate('ClassDetailScreen', { id: selectedItem.props.classId })
              break;
            case "NOTF_NEW_CLASS_PUBLISHED_APPROVED":
            case "NOTF_NEW_CLASS_PUBLISHED":
            case "NOTF_CLASS_UPDATE_APPROVED":
            case "NOTF_CLASS_UPDATED":
            case "NOTF_JOIN_CLASS":
            case "NOTF_UNJOIN_CLASS":
            case "NOTF_JOIN_CLASS_AUTO_APPROVED_2STUDENT":
            case "NOTF_JOIN_CLASS_AUTO_APPROVED_2TEACHER":
            case "NOTF_JOIN_CLASS_REQUEST_N_APPROVED":
            case "NOTF_JOIN_CLASS_REQUEST":
            case "NOTF_UNJOIN_CLASS_REQUEST":
            case "NOTF_JOIN_CLASS_APPROVED":
            case "NOTF_CLASS_AMOUNT_REFUNDED_NO_SHOW":
              if (isStudent) {
                navigation.navigate("ClassDetailScreen", {
                  id: selectedItem.props.classId,
                });
                return;
              }
              navigation.navigate("ClassRosterScreen", {
                id: selectedItem.props.classId,
              });
              break;
            default:
              break;
          }
        }
      }
    }
  };
  const deleteNotification = (id: any) => {
    api.readNotification(id, true).then((response) => {
      if (response) {
        Alert.alert("Alert", "Successfully Deleted");
        const notificationsTemp = notifications.filter((item: any) => item._id !== id);
        setNotifications(notificationsTemp);
      }
    });
  };
  const deleteAllNotifications = () => {
    api.deleteAllNotifications().then(async (response) => {
      if (response) {
        await storeLocalData(
          "@unread_notification_count",
          "" + response.unreadCount
        );
        Alert.alert("Alert", "Successfully cleared");
        setNotifications([]);
      }
    });
  };

  const [moreInfoModalVisible, setMoreInfoModalVisible] = React.useState(false);
  const openModalForSelectedItem = (selectedItem: any) => {
    let formattedDate = formatDate(selectedItem.createdAt);
    setSelectedItemDate(formattedDate);
    setSelectedItemTitle(selectedItem.heading);
    setSelectedItemDescription(
      activeTab == "NEWS" && isStudent ? selectedItem.body : selectedItem.text
    );
    setSelectedData(selectedItem);
    // if (activeTab === "NEWS") {
    //   setMoreInfoModalVisible(true);
    //   if (!selectedItem.isRead) {
    //     //   setLoader(true)
    //     api.getNewsById(selectedItem._id).then((response) => {
    //       if (response && response.success) {
    //         api.getAllNews().then((response) => {
    //           if (response) {
    //             setNewsEvenets(response);
    //           } else {
    //             // Alert.alert("Error", "Server Error");
    //             let description = "error occured while fetching all news";
    //             let error = response.message
    //               ? Error(response.message)
    //               : Error("Couldn't fetch news");
    //             logError(description, error, "NotificationScreen");
    //           }
    //         });
    //       }
    //     });
    //   }
    // }
    if (activeTab === "NOTIFICATION") {
      // setMoreInfoModalVisible(true);
      if (selectedItem.props.key == "ADMIN_NOTF") {
        setMoreInfoModalVisible(true)
      } else {
        redirectDetail(selectedItem);
      }
      if (selectedItem.isRead) {
        return
      }
      // networkAsync();
      api.readNotification(selectedItem._id).then((response) => {
        if (response) {
          api.getNotifications().then(async (response) => {
            if (response) {
              await storeLocalData(
                "@unread_notification_count",
                "" + response.unreadCount
              );
              setNotifications(response.meta.result);
            } else {
              // Alert.alert("Error", "Server Error");
              let description =
                "error occured while fetching all notifications";
              let error = response.message
                ? Error(response.message)
                : Error("Couldn't fetch notifications");
              logError(description, error, "NotificationScreen");
            }
          });
        } else {
          // Alert.alert("Error", "Server Error");
          let description = "error occured while marking notification as read";
          let error = response.message
            ? Error(response.message)
            : Error("Couldn't mark notification as read");
          logError(description, error, "NotificationScreen");
        }
      });
    }
  };

  // formate the date

  function formatDate(apiDate: string) {
    let date = new Date(apiDate);
    let month = monthList[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let formattedDate = [month + " " + day, year].join(", ");
    return formattedDate;
  }

  React.useEffect(() => {
    setActiveTab("NOTIFICATION");
    let mounted = true;
    // networkAsync();
    isMounted.current = true;
    setLoader(true);
    // if (isStudent) {
    //   api
    //     .getAllNews()
    //     .then((response) => {
    //       if (response) {
    //         setNewsEvenets(response);
    //       } else {
    //         // Alert.alert("Error", "Server Error");
    //         let description = "error occured while fetching all news";
    //         let error = response.message
    //           ? Error(response.message)
    //           : Error("Couldn't fetch news");
    //         logError(description, error, "NotificationScreen");
    //       }
    //     })
    //     .then(() => setLoader(false));
    // }

    api
      .getNotifications()
      .then((response) => {
        if (response) {
          console.log(" in **************************")
          console.log(response.data)
          console.log(" in **************************")
          setNotifications(response.data.meta.result);
        } else {
          // Alert.alert("Error", "Server Error");
          let description = "error occured while fetching all notifications";
          let error = response.data.message
            ? Error(response.data.message)
            : Error("Couldn't fetch notifications");
          logError(description, error, "NotificationScreen");
        }
      })
      .then(() => setLoader(false));
    api
      .getUnreadCounts()
      .then(async (resp) => {
        console.log("in12 **************************")
        console.log(resp.data)
        console.log("in12 **************************")
        if (resp) {
          if (resp.data) {
            if (resp.data.messageCount) {
              await storeLocalData('@unread_message_count', "" + resp.data.messageCount);
            }
            if (resp.data.notificationCount) {
              await storeLocalData('@unread_notification_count', "" + resp.data.notificationCount);
            }
          } else {
            await storeLocalData('@unread_message_count', "0");
            await storeLocalData('@unread_notification_count', "0");
          }
        }
      });
    return () => {
      isMounted.current = false;
      mounted = false;
    };
  }, []);

  function component() {
    if (loader) {
      // return <Loader />;
      return <></>
    }
    return (
      <Provider>
        {isStudent ? (
          <View style={styles.container}>
            <View style={styles.tabBtnsContainer}>
              <Button
                style={
                  activeTab == "NOTIFICATION"
                    ? styles.tabBtnActive
                    : styles.tabBtn
                }
                mode={activeTab == "NOTIFICATION" ? "contained" : "outlined"}
                labelStyle={
                  activeTab == "NOTIFICATION"
                    ? styles.labelTopActive
                    : styles.labelTop
                }
                onPress={() => setActiveTab("NOTIFICATION")}
              >
                Notifications
              </Button>
              <Button
                style={activeTab == "NEWS" ? styles.tabBtnActive : styles.tabBtn}
                labelStyle={
                  activeTab == "NEWS" ? styles.labelTopActive : styles.labelTop
                }
                mode={activeTab == "NEWS" ? "contained" : "outlined"}
                onPress={() => setActiveTab("NEWS")}
              >
                News & Events
              </Button>
            </View>
            {activeTab == "NEWS" && newsEvenets !== undefined ? (
              newsEvenets.meta.result.length === 0 ? (
                <View style={styles.contentBox}>
                  <Text style={styles.emptySearchText}>
                    No News and Events Received Yet
                  </Text>
                </View>
              ) : (
                <ScrollView style={styles.scrollView}>
                  {newsEvenets.meta.result.map((news: any, index: number) => (
                    <View key={index} style={styles.messageBoxWrapperRead}>
                      <TouchableOpacity
                        onPress={() => {
                          openModalForSelectedItem(news);
                        }}
                        style={styles.messageBox}
                      >
                        <View style={styles.newsInfo}>
                          <Text style={styles.newsDate}>
                            {formatDate(news.createdAt)}
                          </Text>
                          <Text style={styles.newsTitle}>{news.heading}</Text>
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={styles.newsDescription}
                          >
                            {news.body}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )
            ) : notifications.length === 0 ? (
              <View style={styles.contentBox}>
                <Text style={styles.emptySearchText}>
                  No Notifications Received Yet
                </Text>
              </View>
            ) : (
              <>
                {notifications.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Deleting All Notifications",
                        "Are you sure you want to clear all notifications?",
                        [
                          {
                            text: "NO",
                            style: "cancel"
                          },
                          {
                            text: "YES",
                            onPress: () => deleteAllNotifications()
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    <Text style={styles.clearAll}>Clear all notifications</Text>
                  </TouchableOpacity>
                )}
                <ScrollView>
                  {notifications.map((notification: any) => (
                    <View
                      key={notification._id}
                      style={
                        notification.isRead
                          ? styles.messageBoxWrapperRead
                          : styles.messageBoxWrapperNew
                      }
                    >
                      <TouchableOpacity
                        onPress={() => {
                          openModalForSelectedItem(notification);
                        }}
                        style={styles.messageBox}
                      >
                        <View style={styles.messageInfo}>
                          {!notification.isRead && (
                            <Image
                              style={styles.newMessageIcon}
                              source={require("../assets/images/icons/new-message.png")}
                            />
                          )}
                          {notification.isRead && (
                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert(
                                  "Deleting Notification",
                                  "Are you sure you want to delete this notification?",
                                  [
                                    {
                                      text: "NO",
                                      style: "cancel"
                                    },
                                    {
                                      text: "YES",
                                      onPress: () => deleteNotification(notification._id)
                                    }
                                  ],
                                  { cancelable: false }
                                );
                              }}
                              style={styles.trashIcon}
                            >
                              <Icon name="trash-o" size={20} />
                            </TouchableOpacity>
                          )}
                          <Text style={styles.messageName}>
                            {notification.heading}
                          </Text>
                          <Text
                            numberOfLines={5}
                            ellipsizeMode="tail"
                            style={styles.messageDescription}
                          >
                            {notification.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            {/* <TouchableOpacity onPress={onClose} style={styles.closeIconBoxTop}>
              <Image
                style={styles.closeIconTop}
                source={require("../assets/images/icons/x.png")}
              />
            </TouchableOpacity> */}
            <Text style={styles.title}>Notifications</Text>
            {notifications.length === 0 && (
              <View style={styles.contentBox}>
                <Text style={styles.emptySearchText}>
                  No Notifications Received Yet
                </Text>
              </View>
            )}
            {notifications.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Deleting All Notifications",
                    "Are you sure you want to clear all notifications?",
                    [
                      {
                        text: "NO",
                        style: "cancel"
                      },
                      {
                        text: "YES",
                        onPress: () => deleteAllNotifications()
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text style={styles.clearAll}>Clear all notifications</Text>
              </TouchableOpacity>
            )}
            <ScrollView>
              {notifications.map((notification: any) => (
                <View
                  key={notification._id}
                  style={
                    notification.isRead
                      ? styles.messageBoxWrapperRead
                      : styles.messageBoxWrapperNew
                  }
                >
                  <TouchableOpacity
                    onPress={() => {
                      openModalForSelectedItem(notification);
                    }}
                    style={styles.messageBox}
                  >
                    <View style={styles.messageInfo}>
                      {!notification.isRead && (
                        <Image
                          style={styles.newMessageIcon}
                          source={require("../assets/images/icons/new-message.png")}
                        />
                      )}
                      {notification.isRead && (
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              "Deleting Notification",
                              "Are you sure you want to delete this notification?",
                              [
                                {
                                  text: "NO",
                                  style: "cancel"
                                },
                                {
                                  text: "YES",
                                  onPress: () => deleteNotification(notification._id)
                                }
                              ],
                              { cancelable: false }
                            );
                          }}
                          style={styles.trashIcon}
                        >
                          <Icon name="trash-o" size={20} />
                        </TouchableOpacity>
                      )}
                      <Text style={styles.messageName}>
                        {notification.heading}
                      </Text>
                      <Text
                        numberOfLines={5}
                        ellipsizeMode="tail"
                        style={styles.messageDescription}
                      >
                        {notification.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <Portal>
          <Modal
            dismissable={true}
            visible={moreInfoModalVisible}
            onDismiss={() => {
              setMoreInfoModalVisible(false);
            }}
            contentContainerStyle={styles.modalView}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  setMoreInfoModalVisible(!moreInfoModalVisible);
                }}
                style={styles.closeIconBox}
              >
                <Icon name="close" style={styles.closeIcon} size={32} />
              </TouchableOpacity>
              <View style={styles.newsInfo}>
                <Text style={styles.newsTitle}>{selectedItemTitle}</Text>
                {activeTab === "NEWS" && isStudent ? (
                  <Text style={styles.newsDate}>{selectedItemDate}</Text>
                ) : (
                  <></>
                )}
                <Text style={styles.newsDescription}>
                  {selectedItemDescription}
                </Text>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    );
  }

  return(
    <MainLayout Component={component()} />
  )
}

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    marginTop: 80,
    alignSelf: "center",
  },

  container: {
    flex: 1,
    paddingTop: 20
  },
  scrollView: {
    marginTop: 40
  },
  closeIconBoxTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 15,
  },
  closeIconTop: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 20,
    fontFamily: "roboto-light",
    textTransform: "uppercase",
    // marginTop: 8,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  tabBtnsContainer: {
    flexDirection: "row",
    marginTop: 40,
    alignSelf: "center",
  },
  tabBtn: {
    marginRight: 8,
    // backgroundColor: 'green'
  },
  tabBtnActive: {
    marginRight: 8,
    backgroundColor: "#4B5F79",
  },

  labelTop: {
    fontFamily: "roboto-light",
    color: "#4B5F79",
  },

  labelTopActive: {
    color: "#FFFFFF",
    fontFamily: "roboto-light",
  },
  messageBoxWrapperNew: {
    backgroundColor: "#4B5F7925",
    width: "100%",
  },
  messageBoxWrapperRead: {
    width: "100%",
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "transparent",
    padding: 15,
  },
  messageInfo: {
    width: "100%",
    backgroundColor: "transparent",
  },
  messageName: {
    fontSize: 18,
    color: "#231F20",
    width: "95%",
    textTransform: "uppercase",
    fontFamily: "roboto-regular",
  },
  messageDescription: {
    fontSize: 15,
    color: "#000000",
    flex: 1,
    marginEnd: 20,
    lineHeight: 20,
  },
  newMessageIcon: {
    position: "absolute",
    top: 5,
    right: 0,
    width: 15,
    height: 15,
  },
  trashIcon: {
    position: "absolute",
    top: 0,
    right: 0
  },
  newsInfo: {
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: -10,
  },
  newsDate: {
    fontSize: 13,
    fontFamily: "roboto-regular",
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 15,
    fontFamily: "roboto-bold",
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: "roboto-light",
  },
  modalView: {
    padding: 30,
    margin: 30,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },
  closeIconBox: {
    position: "absolute",
    top: -58,
    right: -53,
  },
  closeIcon: {
    color: "#FFFFFF",
  },
  contentBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySearchText: {
    fontSize: 24,
    fontFamily: "roboto-regular",
    color: "#949599",
    textTransform: "uppercase",
    textAlign: "center",
  },
  clearAll: {
    fontSize: 15,
    fontFamily: "roboto-regular",
    color: "#949599",
    textTransform: "uppercase",
    textAlign: "right",
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 20
  }
});

