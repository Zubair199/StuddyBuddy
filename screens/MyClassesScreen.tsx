import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from "../context/ThemeContext";
import Tab from "../components/Tab";
import { AuthContext } from "../utils/AuthContext";
import FAB from 'react-native-fab'
import { app, grey } from "../constants/themeColors";
import { BottomSheet, ListItem } from "react-native-elements";

const width = Dimensions.get('screen').width;

export default function MyClassesScreen() {
    const { userToken, userType } = React.useContext(AuthContext);

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [showModal, setShowModal] = React.useState(false);

    const [classes, setClasses] = React.useState([])
    const [exams, setExams] = React.useState([])
    const [assignments, setAssignments] = React.useState([])
    let [user, setUser] = React.useState(userToken)

    const { currentScreen, height, containerHeight } = React.useContext(ThemeContext);
    const controller = new AbortController();
    const signal = controller.signal;
    React.useEffect(() => {
        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, []);


    const [isModal, setIsModal] = React.useState(false);
    function toggleModal() {
        console.log('modal');
        setIsModal(!isModal);
        // clearStates();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Tab />

            <BottomSheet
                isVisible={isModal}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, width: width, backgroundColor: 'white' }}>
                    <View style={{ marginTop: 15, alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17, color: "black" }}>What do you want to add?</Text>
                    </View>
                    <View style={{ marginTop: 15, alignItems: "center" }}>
                        <View style={{ borderWidth: 1.5, borderRadius: 50, borderColor: grey[500], width: width / 4 }} />
                    </View>

                    <View style={{ marginTop: 15 }}>

                        {
                            ["Class", "Assignment", "Exam"].map((item, i) => (
                                <ListItem key={i} onPress={() => { toggleModal(); navigation.navigate("Add" + item); }} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title >{item}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron color={'black'} size={20} />
                                </ListItem>
                            ))
                        }
                        <ListItem onPress={() => toggleModal()}>
                            <ListItem.Content>
                                <ListItem.Title >Cancel</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                </View>
            </BottomSheet>
            {
                userType.toLowerCase() === "teacher" &&                  
            <FAB
            buttonColor={app.lightBlue}
            iconTextColor="#FFFFFF"
            onClickAction={() => { toggleModal() }}
            visible={true}
            iconTextComponent={<Icon name="plus" />}
        />

            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        // paddingHorizontal: 15,
        // paddingBottom: 10,
    },
    scrollView: {
        // marginTop: 10,
        marginBottom: '28%',
        paddingHorizontal: 15,

    },

    closeIconBox: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    closeIcon: {
        width: 14,
        height: 14,
        marginTop: 10,
    },

    title: {
        fontSize: 30,
        textTransform: "uppercase",
        textAlign: "center",
        fontFamily: "roboto-light",
        marginTop: 20,
        fontWeight: "300",
    },

    levelIntermediate: {
        width: 4,
        height: 13,
        backgroundColor: "#FFEB00",
        marginTop: 2,
    },

    groupTitle: {
        fontSize: 20,
        textTransform: "uppercase",
        marginTop: 25,
        fontWeight: "300",
    },

    groupBox: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
    },

    classImg: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },

    classInfo: {
        // marginLeft: 20,
        paddingHorizontal: 20,
    },

    levelBox: {
        flexDirection: "row",
    },

    levelAdvance: {
        width: 4,
        height: 14,
        backgroundColor: "#FF6565",
        marginTop: 4,
    },

    levelBeginner: {
        width: 4,
        height: 14,
        backgroundColor: "#01C75D",
        marginTop: 4,
    },

    levelText: {
        fontSize: 14,
        marginLeft: 5,
        textTransform: "uppercase",
    },

    className: {
        fontSize: 16,
        fontFamily: "roboto-regular",
        marginTop: 5,
    },
    dot: {
        height: 3,
        width: 3,
        backgroundColor: "black",
        borderRadius: 100,
        margin: 5,
        marginTop: 10,
    },

    studio: {
        fontSize: 14,
        fontWeight: "300",
    },

    dayTime: {
        fontSize: 14,
        fontWeight: "200",
    },
    statusMsg: {
        fontSize: 14,
        fontWeight: "200",
    },
    contentBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptySearchText: {
        fontSize: 24,
        fontFamily: "roboto-regular",
        color: "black",
        textTransform: "uppercase",
        textAlign: "center",
    },
});
