import * as React from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Platform,
    Alert,
    Modal,
    TouchableOpacity,
    Text,
    View
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";


import { AuthContext } from "../utils/AuthContext";

// import EditProfileModal from "../components/editProfileModal";
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

// import ChallengeSlider from "../components/ChallengeSlider";
// import UserListComponent from "../components/UserListComponent";

interface dataTypes {
    skillsType: any;
}

interface FormDataValue {
    uri: string;
    name: string;
    type: string;
}


const useUserAuth = () => React.useContext(AuthContext);


export default function ProfileScreen(dataType: dataTypes) {
    const navigation = useNavigation();
    // const onClose = () => navigation.navigate("ClassesScreen");
    const { userType } = useUserAuth()!;
    let isStudent = userType == "student";
    let isTeacher = userType == "teacher";
    const isFocused = useIsFocused();

    // const onPressProfile = (id: string) =>
    //     navigation.navigate("ViewProfileScreen", { id: id });

    const [userName, setUserName] = React.useState("");
    const [noShowCount, setNoShowCount] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);
    const [lateCancellation, setLateCancellation] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [skills, setSkills] = React.useState([]); //teachers/students skills/class preferences api
    const [imageModal, setImageModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);
    const [editSkill, setEditSkill] = React.useState(dataType.skillsType); //teachers/students skills/class preferences api
    const [editing, setEditing] = React.useState(false);
    const [query, setQuery] = React.useState(dataType.skillsType);
    // const [searchText, setSearchText] = React.useState("");
    // const [isSkillEdit, setIsSkillEdit] = React.useState(false);
    const [allSkills, setAllSkills] = React.useState(dataType.skillsType);
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginBottom: '40%' }}>
                <View style={styles.sticky}>
                    <Text style={styles.title}>My Profile</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.closeIconBox}>
                        <Image
                            style={styles.pencilIcon}
                            source={require("../assets/images/icons/Edit-Icon.png")}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.scrollView}
                    keyboardShouldPersistTaps={"handled"}
                >
                    {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
                    <View style={styles.basicInfo}>
                        {/* instructor name and image will be replaced by api's data on integration of apis */}
                        <View style={styles.profileImageBox}>
                            {/* {imageLoader && <Image
                  style={{width:100, height:54}}
                  source={require('../assets/images/Deep-Move-Spinner-v3.gif')}
                />} */}
                            <TouchableOpacity onPress={() => setImageModal(true)}>
                                <Image
                                    style={styles.profileImage}
                                    // onLoadStart={()=>setImageLoader(true)}
                                    // onLoadEnd={()=>setImageLoader(false)}
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

                    {/* Divider */}
                    <View style={styles.lineStyle} />
                    {/* Following loads friends slider */}
                    {/* <UserListComponent userId={undefined} headerText="Friends" listType="friends" /> */}

                    {/* {isTeacher && (
                    <>
                        <View style={styles.lineStyle} /> */}
                    {/* Following loads mentor list */}
                    {/* <UserListComponent userId={undefined} headerText="Mentors" listType="mentor" /> */}
                    {/* </>
                )} */}

                    <View style={styles.lineStyle} />
                    {/* <View style={{ marginTop: 20 }}>
                    <ChallengeSlider
                        categoryText="Shared Challenges"
                        searchEmpty={emptySearch}
                        isGlobal={false}
                        isShare={false}
                        isProfile={true}
                    />
                </View> */}

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
                    {/* Toggle button for available options ends here */}

                    {/* <StudentContactComponent
                    parentEditing={editing}
                    editEnable={() => setEditing(true)}
                    editDisable={() => setEditing(false)}
                    loadingTrue={() => setLoader(true)}
                    loadingFalse={() => setLoader(false)}
                    data={self}
                    reRun={() => setReRun(!reRun)}
                /> */}

                    {/* Divider */}
                    <View style={styles.lineStyle} />

                    {/* {!isStudent && (
                    <SubscribersListComponent subscribersList={fakeSubscribers} />
                )} */}

                    {/* image modal starts here */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={imageModal}
                        onRequestClose={() => setImageModal(false)}
                    >
                        <View style={styles.centeredView}>
                            <TouchableOpacity
                                style={{ position: "absolute", width: "100%", height: "100%" }}
                                onPress={() => setImageModal(false)}
                            ></TouchableOpacity>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.imageModal}>
                                    <Icon name="camera" size={30} />
                                    <Text>Take Picture</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.imageModal}>
                                    <Icon name="upload" size={30} />
                                    <Text>Upload Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* {editProfile && <EditProfileModal
                    editProfileModal={editProfile}
                    closeEditModal={() => setEditProfile(false)}
                    isStudent={isStudent}
                    allSkills={allSkills}
                    skills={skills}
                    certifications={certifications}
                    bio={inputBio.bio}
                    social={self}
                    loadingTrue={() => setLoader(true)}
                    loadingFalse={() => setLoader(false)}
                    reRun={() => setReRun(!reRun)}
                />} */}
                </ScrollView>
            </View>
        </SafeAreaView>
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
