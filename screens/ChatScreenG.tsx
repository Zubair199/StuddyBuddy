/* ===================================== AUDIT LOG ========================================= *
* title: Chat Screen                                                                         *
* Author: Zubair Aslam                                                                        *
* Created on: 2020/08/26                                                                     *
* Version: 0.1                                                                               *
* Description: user can see previous chat history and send and receive messages one to one   *
 ========================================================================================== */
/* ==================================== MODIFICATION ======================================== *
* Author: Zubair Aslam
* Modified On: 2020/12/07
* Description: feedback implemented: redirect to other user profile screen on their avatar/profilepicture pressed
* ========================================================================================== */
import * as React from "react";
import {
  GiftedChat,
  IMessage,
  Bubble,
  InputToolbar,
} from "react-native-gifted-chat";
// import io from "socket.io-client";
const io = require('socket.io-client');
import api from "../services/api.services";
import { useIsFocused, useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { ChatScreenParamList } from "../types";
import { AuthContext } from "../utils/AuthContext";
 import {  storeLocalData } from "../utils/HelperFunctions";
import CONSTANTS from "../services/api.constants";
import { Alert, View, Text, TouchableOpacity, Platform, Image, StyleSheet } from "react-native";
import { Menu,MenuDivider, MenuItem } from "react-native-material-menu";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";

export const useUserAuth = () => React.useContext(AuthContext);

export default function ChatScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const [messages, setMessages] = React.useState<any>();
  const [userMe, setUserMe] = React.useState<any>();
  const [toggleChat, setToggleChat] = React.useState(true);
  const [status, setStatus] = React.useState("unblocked");
  const [alertmessage, setAlertMessage] = React.useState("Unblocked");
  const [blocker, setBlocker] = React.useState(false);
  const [userOther, setUserOther] = React.useState<any>();
  const [blockedMessage,setBM ] = React.useState("");
  const socketIo = io(CONSTANTS.AUTHENTICATIONS.CHAT_SERVER_URL, {
    rejectUnauthorized: false,
    jsonp: false,
  });

  let userother1 = ""
  const empyString = ""
  const routes = useRoute<RouteProp<ChatScreenParamList, "ChatScreen">>();
  const chatId = routes.params === undefined ? null : routes.params.chatId;
  const isEnabledChat = routes.params === undefined ? null : routes.params.isEnabledChat;
  const isBanned = routes.params === undefined ? null : routes.params.isBanned;
  const initialText = routes.params === undefined ? "" : routes.params.textMes;
  const [visible, setVisible] = React.useState(false);


  const { userToken } = useUserAuth()!;

  // async function networkAsync() {
  //   let network = await checkNetwork();
  //   if (!network) {
  //     Alert.alert("Error", "Please Connect To Internet");
  //     return;
  //   }
  // }

  const previousScreen = () => {
    socketIo.emit('leaveChat', { "chatId": chatId, "userId": userToken });
    navigation.navigate("NetworkScreen");
  };

  React.useEffect(() => {
   
    console.log("HERE BRO")
    // networkAsync();
    // storeLocalData("@chatId", chatId);
    const ac = new AbortController();
    let chats: IMessage[] = [];
    //Join to chat room

    socketIo.emit(
      "joinChat",
      { chatId: chatId, userId: userToken }
    );
    //Handle received messages
    socketIo.on("messageReceive", async (data:Object) => {
      const newMsg = data.data;
      if (newMsg.unreadCount) {
        await storeLocalData("@unread_message_count", "" + newMsg.unreadCount);
      }
      setBlocker(false)
      setMessages((previousMessages: any) => 
      GiftedChat.append(previousMessages, [newMsg]));
    });
    //Get message history
    let requestData = { chatId: chatId };
    
    api.initiateChat(requestData).then(async (resp) => {
      console.log("+----------------------------------------------asdasd");
     
      //await storeLocalData("@chatId", chatId);
      let userID 
      let otherUID 
      if (resp.data) {
        console.log(resp.data)
         chats = resp.data.data;
         setMessages(chats);
         if (resp.data.userMe) {
          setUserMe(resp.data.userMe);
          userID = resp.data.userMe._id
         }
         if (resp.data.class) {
          setUserOther(resp.data.class);
          otherUID =resp.data.class._id;
          userother1=resp.data.class.name
          
        }
        

        
      }
    });

    api
      .getProfile()
      .then((resp) => {
        
        if (resp) {
          setToggleChat(resp.data.isEnabledChat);
        }
      }).catch(e=>console.log(e));
    
    return () => {
      console.log("sdasdasd")
      socketIo.off("messageReceive");
      ac.abort();
    };

    

  }, [chatId]);

  
  //Send new message
  const onSend = React.useCallback((messages = []) => {
    // networkAsync();
    console.log(messages[0])
    console.log("tracler paksdpaksdpkapsdkpaksdkaskkkkkkkkkkkkkkkkkkkkkkkkkkk")
    const currentMessage = messages[0];
  
    let requestData = {
      chatId: chatId,
      text: currentMessage.text,
    };
    api.createNewMessage(requestData).then((resp) => {
      if (resp) {
       
      
          setMessages((previousMessages: any) =>
          GiftedChat.append(previousMessages, messages));
          const newMsg = resp.data;
          socketIo.emit("messaging", newMsg);
          setBlocker(false)
        
       
      }
    });
  }, []);

  function ChatBubble(messages: any) {
    return (
      <Bubble
        {...messages}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "black",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#E4E4E9",
          },
          right: {
            backgroundColor: "#4B5F79",
          },
        }}
      />
    );
  }

  function renderInput(props: any) {
    // this condition here checks for status if blocked or unblocked and returns a component to be placed in the chat
    if(status==='blocked'&&blocker===true){
      return(
       
        <View style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#939698",
          backgroundColor: "#ffffff",
          marginHorizontal: 5,
        }}>
          <Text style={{
            alignSelf: "center",
            color: "red",
            fontSize: 16,
            paddingVertical: 8,
            fontFamily: "roboto-light"
          }}>You have Blocked This User!</Text>
        </View>
    )
    }
    if(status==='blocked'&&blocker===false){
      return(
       
        <View style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#939698",
          backgroundColor: "#ffffff",
          marginHorizontal: 5,
        }}>
          <Text style={{
            alignSelf: "center",
            color: "red",
            fontSize: 16,
            paddingVertical: 8,
            fontFamily: "roboto-light"
          }}>You have Blocked This User!</Text>
        </View>
    )
    }
    // **********************************************************************
    else{
      
      if (isBanned == true) {
        return (
          <View style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#939698",
            backgroundColor: "#ffffff",
            marginHorizontal: 5,
          }}>
            <Text style={{
              alignSelf: "center",
              color: "red",
              fontSize: 16,
              paddingVertical: 8,
              fontFamily: "roboto-light"
            }}>User Banned By The Admin!</Text>
          </View>
        )
      } 
      else {
        if ((isEnabledChat == undefined || isEnabledChat == true) && !toggleChat == false) {
          return (
            <InputToolbar
              {...props}
              containerStyle={{ borderTopWidth: 0 }}
              primaryStyle={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#939698",
                marginHorizontal: 5,
              }}
            />
          );
        } else {
          return (
            <InputToolbar
              {...props}
              containerStyle={{ borderTopWidth: 0 }}
              primaryStyle={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#939698",
                marginHorizontal: 5,
              }}
            />
            )
        }
    }
    
    }
  }
  // function that capitilizes first letter 
  function capitalizes(str:string){
    //console.log(str.charAt(0)+str.substr(1,str.length-1))
    return str.charAt(0).toUpperCase()+str.substr(1,str.length-1)

  }
  function lowercase(str:string){
    //console.log(str.charAt(0)+str.substr(1,str.length-1))
    return str.charAt(0).toLowerCase()+str.substr(1,str.length-1)

  }

  // function onAvatarPressed(otherUser: any) {
  //   navigation.navigate("ViewProfileScreen", { id: otherUser._id });
  // }

 
    
  return (
   
    <View style={{ flex: 1, paddingBottom: 4 }}>
     
      <View
        style={{ flexDirection: "row", height: 35, backgroundColor: "#4B5F79", justifyContent: "flex-start" }}
      >
       
        <TouchableOpacity onPress={previousScreen} style={styles.titleIconBox}>
          <Image
            source={require("../assets/images/icons/angle-left-white.png")}
            style={Platform.OS == "ios" ? styles.backIconIPhone : styles.backIcon}
          />
        </TouchableOpacity>
       
        <View style={{flexDirection:'row'}}>
        
        <Text style={{ color: "#FFFFFF", fontFamily: "roboto-regular", fontSize: 16, paddingTop: 5 ,textTransform:'capitalize'}}>
          {userOther? userOther.name:"" }
        </Text>
        <Text style={{ color: "red", fontFamily: "roboto-regular", fontSize: 16, paddingTop: 5 }}>
          {status==='blocked'?" (Blocked)":"" }
        </Text>
        </View>
           
            
       
        
      </View>
      
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          renderBubble={(messages) => ChatBubble(messages)}
          onSend={(messages) => onSend(messages,userMe._id,userOther._id)}
          renderInputToolbar={(props) => renderInput(props)}
          listViewProps={{ style: { backgroundColor: "#ffffff" } }}
          placeholder={(blocker===true&&status==='blocked')?"You Have Blocked This User!":(blocker===true&&status==='unblocked')?userOther.name+" has Blocked You !":status==='blocked'?"You Have Blocked This User!":"Say something..."}
          isKeyboardInternallyHandled={false}
          bottomOffset={-20}
          disableComposer = {(blocker===true&&status==='blocked')?true:status==='blocked'?true:blocker===true?false:false}
          initialText={initialText}
          // onPressAvatar={onAvatarPressed}
          
          onLongPress={(e,message)=>{
            if(message.text.split('/')[0] === "Hi I am inviting you to the class" && message.text.split('/')[2].length ===24 &&message.text.split('/')[3]==='Hold Press To View' ){
              navigation.navigate('ClassDetailScreen',{id:message.text.split('/')[2]})
            }
          }}
          user={{
            _id: userToken,
          }}
        />
        
      </View>
    
    </View>
    
    
  );
}
const styles = StyleSheet.create({

  titleIconBox: {
    marginTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  backIconIPhone: {
    height: 17,
    width: 10,
  },
  backIcon: {
    height: 17,
    width: 10,
  },
  
});

