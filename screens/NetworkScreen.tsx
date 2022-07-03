import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Divider, View } from 'native-base';
import * as React from 'react';
import { Image, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH, AUTHENTICATIONS } from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';
import MainLayout from './MainLayout';
import Icon from 'react-native-vector-icons/AntDesign';
import api from "../services/api.services";
export default function NetworkScreen() {
    const { userToken, userType } = React.useContext(AuthContext);

    const navigation = useNavigation();
    let isStudent = userType == "user";
    let isTeacher = userType == "teacher";
    const isFocused = useIsFocused();

    let [user, setUser] = React.useState(userToken)
    let [users, setUsers] = React.useState([])
    let [userProfiles, setUserProfiles] = React.useState([])
    let [profile, setProfile] = React.useState(null)


    const [userName, setUserName] = React.useState("");
    const [noShowCount, setNoShowCount] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);
    const [lateCancellation, setLateCancellation] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [skills, setSkills] = React.useState([]); //teachers/students skills/class preferences api
    const [imageModal, setImageModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);
    const [editSkill, setEditSkill] = React.useState([]); //teachers/students skills/class preferences api
    const [editing, setEditing] = React.useState(false);
    const [query, setQuery] = React.useState([]);
    const [pastExperience, setPastExperience] = React.useState("");
    // const [isSkillEdit, setIsSkillEdit] = React.useState(false);
    const [allSkills, setAllSkills] = React.useState([]);
    const [self, setSelf] = React.useState();
    // const [imageLoader, setImageLoader] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [reRun, setReRun] = React.useState(false);
    const [editProfile, setEditProfile] = React.useState(false);
    const [certifications, setCertifications] = React.useState("");
    const [friendList, setFriendList] = React.useState<Array<object>>([]);
    const [mentorList, setMentorList] = React.useState<Array<object>>([]);
    const [pageFriend, setPageFriend] = React.useState(1);
    const [friends, setFriends] = React.useState<any>();
    const [pageMentors, setPageMentors] = React.useState(1);
    const [mentors, setMentors] = React.useState<any>();
    const [pageLoader, setPageLoader] = React.useState(false);
    const [emptySearch, setEmptySearch] = React.useState(false);
    const [temp, setTemp] = React.useState("");
    const [inputBio, setInputBio] = React.useState({
        style: styles.disableInput,
        editable: false,
        bio: "Lorem Ipsum salt dolor set amet sha.",
    });

    React.useEffect(() => {
        //console.log("NetworkScreen", userType)
        apiCall()

    }, [isFocused])
    function apiCall() {
        fetch(AUTHENTICATIONS.API_URL + AUTH.USERS)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log('users ', responseJson.data)
                setUsers(responseJson.data.filter(item => item._id !== user))
                setUserProfiles(responseJson.profiles)
            })
            .catch(err => {
                console.log(err)
            })
    }
    function handleChat(classId,group) {
        console.log(group)
        if(group === true){
            const requestData = {classId:"62ba40cc2c9acbf79d1b1326" ,flag:group,groupUsers:["62bb70317d78ecbb83bcb7d1","6295cc2b7d505307388d58fd","62a1af738c535a276ca3c3ef"] };
      
            api.createNewMessage(requestData).then((resp) => {
             
              if (resp) {
                const newChatInfo = resp.data;
                if (newChatInfo && newChatInfo.data.chatId) {
                  
                  
                     navigation.navigate("ChatScreen", { chatId: newChatInfo.data.chatId, textMes: "" });
                }
                
              }
            }).catch(e=>{console.log(e)});
        }
        else{
           console.log("here in one to one")
            const requestData = { toUser: classId };
            console.log(classId)
            api.createNewMessage(requestData).then((resp) => {
                console.log("hit ")
              if (resp) {
                const newChatInfo = resp.data;
                if (newChatInfo && newChatInfo.data.chatId) {
                    console.log("bro here in chat")
                    navigation.navigate("ChatScreen", { chatId: newChatInfo.data.chatId, textMes: "" });
                }
                
              }
            }).catch(e=>{console.log(e)});
        }
      
       

    }
      
    const [isModal, setIsModal] = React.useState(false)
    function toggleModal() {
        console.log("modal")
        setIsModal(!isModal)
    }
    function getProfileData(id) {
        let result = userProfiles.filter(item => item.User === id)
        // console.log(result);
        if (result.length > 0) {
            setProfile(result[0])
            setSkills(result[0].skills)
            setCertifications(result[0].certifications)
            setPastExperience(result[0].pastExperience)
        }
        else {
            setProfile(null)
            setSkills([])
            setCertifications("")
            setPastExperience("")
        }
    }
    function component() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Modal
                    animationType="slide"
                    visible={isModal}
                    onRequestClose={() => {
                        toggleModal();
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 15 }}>
                        <View style={{ flexDirection: "row-reverse" }}>
                            <TouchableOpacity
                                onPress={
                                    () => { toggleModal(); }
                                }
                            >
                                <Icon name='close' size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
                            <Text style={styles.title}>Profile Details</Text>
                        </View>
                        <View>
                            <ScrollView
                                style={styles.scrollView}
                                keyboardShouldPersistTaps={"handled"}
                            >
                                <View style={styles.basicInfo}>
                                    <View style={styles.profileImageBox}>
                                        <TouchableOpacity onPress={() => setImageModal(true)}>
                                            <Image
                                                style={styles.profileImage}
                                                source={
                                                    image === ""
                                                        ? require("../assets/images/user.png")
                                                        : { uri: image }
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.nameBox}>
                                        <Text style={styles.name}>{userName}</Text>
                                    </View>
                                    <View style={styles.instructorBox}>
                                        <Text style={styles.instructor}>
                                            {isStudent ? "Student" : "Instructor"}
                                        </Text>
                                    </View>
                                </View>

                                {isStudent ? null :
                                    <View>
                                        {/* Divider */}
                                        <View style={styles.lineStyle} />

                                        <View style={styles.actionBox}>
                                            <Text style={[styles.noShowTitle, { marginRight: 20 }]}>Late Cancellation:{" " + lateCancellation}</Text>
                                            <Text style={[styles.noShowTitle, { marginLeft: 20 }]}>No Show:{" " + noShowCount}</Text>
                                        </View>

                                        {/* Divider */}
                                        <View style={styles.lineStyle} />
                                    </View>
                                }
                                <View style={styles.skillBox}>
                                    <View style={styles.skillsWithIcon}>
                                        <Text style={styles.skillsAttributesHeading}>
                                            {isStudent ? "Class Preferences" : "Skills"}
                                        </Text>
                                    </View>
                                    <View style={styles.skills}>
                                        {skills.map((skill, index, arr) => (
                                            <View
                                                key={index + "_skill_view"}
                                                style={{ flexDirection: "row" }}
                                            >
                                                <Text style={styles.skillsText}>{skill}</Text>
                                                {arr.length - 1 !== index ? (
                                                    <View style={styles.dot}></View>
                                                ) : null}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                {!isStudent && (
                                    <View style={styles.textContent}>
                                        <Text style={styles.contentTitle}>Certifications</Text>
                                        {certifications ? <Text style={styles.actualText}>{certifications}</Text> : <Text style={styles.placeholder}>Your Certifications Here</Text>}
                                    </View>
                                )}
                                <View style={styles.textContent}>
                                    <Text style={styles.contentTitle}>Bio</Text>
                                    {inputBio.bio ? <Text style={styles.actualText}>{inputBio.bio}</Text> : <Text style={styles.placeholder}>Your Short Bio Here</Text>}
                                </View>



                                <View style={styles.lineStyle} />


                                {/* Toggle button for available options starts here */}
                                {isStudent ? null :
                                    <View style={styles.switchBoxWarpper}>
                                        <Text style={styles.switchBoxLebel}>
                                            Mark as available to hire.
                                        </Text>
                                        <TouchableOpacity >
                                            {toggle ? (
                                                <Image
                                                    style={styles.toggleOn}
                                                    source={require("../assets/images/icons/toggle.png")}
                                                />
                                            ) : (
                                                <Image
                                                    style={styles.toggleOn}
                                                    source={require("../assets/images/icons/Toggle-off.png")}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                }

                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <ScrollView >
                    {
                        users.map((item, index) => {
                            // console.log(item)
                            return (
                                <TouchableOpacity key={index} onPress={() => { toggleModal(); getProfileData(item._id) }}>
                                    <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                        <View>
                                            <View>
                                                <Text>{item.username}</Text>
                                                <View>
                                                    <Text>{item.roles.name}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            {/* <TouchableOpacity onPress={() => {handleChat(item._id,)}}> */}
                                            <TouchableOpacity onPress={() => {handleChat(item._id,false)}}>
                                                <Icon name="message1" size={25} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Divider />
                                </TouchableOpacity>
                            )
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
    spinner: {
        position: "absolute",
        marginTop: 80,
        alignSelf: "center",
    },

    lineStyle: {
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        padding: 10,
    },

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        // paddingHorizontal: 15,
    },
    scrollView: {
        paddingHorizontal: 15,
        height: '100%'
    },
    closeIconBox: {
        paddingRight: 15
        // flexDirection: "row",
        // justifyContent: "flex-end",
        // backgroundColor:"blue"
    },
    sticky: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },
    closeIcon: {
        width: 14,
        height: 14,
    },
    title: {
        fontSize: 30,
        textTransform: "uppercase",
        textAlign: "center",
        marginLeft: 24,
        fontFamily: "roboto-light",
        flex: 1
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    basicInfo: {
        marginTop: 40,
        width: "100%",
    },

    profileImageBox: {
        flexDirection: "row",
        justifyContent: "center",
    },
    profileImage: {
        width: 120,
        height: 160,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    nameBox: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 15,
    },
    name: {
        fontSize: 18,
        color: "#4B5F79",
        textTransform: "uppercase",
        fontFamily: "roboto-light",
    },

    instructorBox: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    instructor: {
        fontSize: 14,
        fontFamily: "roboto-light",
    },

    skillBox: {
        marginTop: 50,
        marginBottom: 20,
    },

    skillsWithIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    skillsAttributesHeading: {
        textTransform: "uppercase",
        fontSize: 20,
        fontWeight: "200",
        fontFamily: "roboto-light",
    },
    pencilIcon: {
        width: 24,
        height: 24,
    },
    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    skillsText: {
        fontSize: 15,
        fontFamily: "roboto-light",
    },

    dot: {
        height: 3,
        width: 3,
        backgroundColor: "black",
        borderRadius: 100,
        margin: 5,
        marginTop: 10,
    },

    bottomSpace: {
        marginBottom: 20,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: "rgba(255,255,255,0.5)",
    },

    bioBox: {
        // marginBottom: 5,
    },

    headingAction: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    disableInput: {
        width: "100%",
        fontFamily: "roboto-light",
        fontSize: 16,
    },

    enableInput: {
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        borderRadius: 5,
        borderColor: "#949599",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        padding: 8,
        fontFamily: "roboto-light",
        fontSize: 16,
        color: "black",
    },

    bioActionBox: {
        width: 100,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    actionBox: {
        alignSelf: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: 210,
    },
    modalView: {
        height: 200,
        width: 250,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        paddingBottom: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    imageModal: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
    },

    skillEditBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },

    skillAddRemove: {
        padding: 5,
        borderColor: "#4B5F79",
        borderRadius: 3,
        borderWidth: 1,
        // width:"30%",
        marginRight: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    removeIcon: {
        width: 14,
        height: 4,
        marginLeft: 5,
    },
    addIcon: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },

    addSkillBox: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#4B5F79",
        marginRight: 10,
        marginTop: 10,
        fontSize: 15,
    },

    skillAdded: {
        padding: 5,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "#4B5F79",
        fontSize: 15,
    },

    searchCheck: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
    },

    searchAndIcon: {
        height: 44,
        width: "70%",
        borderColor: "#949599",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginTop: 3,
    },
    textBox: {
        width: "94%",
        color: "black",
        fontSize: 18,
        fontFamily: "roboto-light",
    },

    emptySearchText: {
        fontSize: 28,
        fontFamily: "roboto-regular",
        color: "#949599",
        textTransform: "uppercase",
    },

    addSkill: {
        color: "#4B5F79",
    },

    addedSkill: {
        color: "#ffffff",
    },

    actionBtnBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },

    actionBtn: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "#4B5F79",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },

    times: {
        color: "#FF6565",
    },

    check: {
        color: "#01C75D",
    },

    skillModal: {
        marginTop: 40,
        padding: 15,
    },
    textContent: {
        marginBottom: 20
    },
    contentTitle: {
        textTransform: "uppercase",
        fontSize: 20,
        fontWeight: "200",
        fontFamily: "roboto-light",
        marginBottom: 8
    },
    noShowTitle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "200",
        fontFamily: "roboto-light",
    },
    placeholder: {
        color: "#939598",
        width: "100%",
        fontFamily: "roboto-light",
        fontSize: 16,
    },
    actualText: {
        color: "black",
        width: "100%",
        fontFamily: "roboto-light",
        fontSize: 16,
    },
    noResultView: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    noResultText: {
        textAlign: "center",
        fontFamily: "roboto-light",
        color: "#4b5f79",
    },
    classBoxWrapper: {
        height: "100%",
        width: 120,
        overflow: "hidden",
        // marginBottom: 22,
        borderRadius: 5,
        // marginHorizontal: 5,
        marginRight: 15,
    },
    classBoxImage: {
        width: "100%",
        height: "100%",
        // position: "relative",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    classBoxText: {
        // marginLeft: 7,
        color: "#FFFFFF",
        fontSize: 13,
        textTransform: "uppercase",
        marginLeft: 5,
    },
    classBox: {
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingBottom: 10,
        flex: 1,
    },
    classBoxName: {
        color: "#ffff",
        fontSize: 18,
        fontFamily: "roboto-regular",
    },
    toggleOn: {
        // color: "#4B5F79",
        width: 41,
        height: 27,
    },
    switchBoxWarpper: {
        width: "100%",
        height: 25,
        marginTop: 20,
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "space-between",
    },
    switchBoxLebel: {
        textAlign: "left",
        flex: 0.8,
        alignContent: "flex-start",
        color: "#000000",
        fontSize: 15,
        fontFamily: "roboto-regular",
        marginTop: 2
    },
    profileBox: {
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingBottom: 10,
        flex: 1,
    },
    profileBoxName: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "roboto-regular",
    },
    profileBoxImage: {
        width: "100%",
        height: "100%",
    },
    profileBoxWrapper: {
        height: "100%",
        width: 120,
        overflow: "hidden",
        borderRadius: 5,
        marginRight: 15,
    },
});
