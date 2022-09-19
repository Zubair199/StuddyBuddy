/***
 * SettingsScreen
 * Author: Sarath Ambegoda
 * Created on: 2020/07/17
 */
/*
================
Modified by: Abdul Zahir
Changes: Schedule Screen ui added
Modified on: 2020/07/20
*/
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AUTHENTICATIONS, CLASS } from "../services/api.constants";
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker'
import { Select, Input, TextArea, IconButton } from "native-base";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import MainLayout from "./MainLayout";
import Tab from "../components/Tab";
import { AuthContext } from "../utils/AuthContext";

export default function MyClassesScreen() {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [classes, setClasses] = React.useState([])
    const { userToken } = React.useContext(AuthContext);
    let [user, setUser] = React.useState(userToken)
    const { currentScreen, height, containerHeight } = React.useContext(ThemeContext);


    React.useEffect(() => {
        console.log(user)

    }, [])


    function component() {

        return (
            <View style={styles.container}>
                <View style={{ height: containerHeight }}>
                </View>
            </View >
        );
    }

    return (
        <Tab />
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
