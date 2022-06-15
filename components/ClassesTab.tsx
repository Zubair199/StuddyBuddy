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
import { ThemeContext } from "../context/ThemeContext";

export default function ClassesTab() {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [classes, setClasses] = React.useState([])
    let [user, setUser] = React.useState("6295cc2b7d505307388d58fd")
    const { currentScreen, height, containerHeight } = React.useContext(ThemeContext);

    React.useEffect(() => {
        setUser('6295cc2b7d505307388d58fd')
        studentApiCall()
    }, [])

    function studentApiCall() {
        fetch(AUTHENTICATIONS.API_URL + CLASS.GET_ALL_ACTIVE_CLASSES)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('classes ', responseJson.data)
                setClasses(responseJson.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <View style={{ height: containerHeight }}>

                {!classes || classes.length == 0 ? (
                    <View style={styles.contentBox}>
                        <Text style={styles.emptySearchText}>
                            No Class Has Been Found
                        </Text>
                    </View>
                ) : (
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <View >
                            {classes.map((classItem, index) => (
                                <TouchableOpacity
                                    style={styles.groupBox}
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate('ClassDetails', { classID: classItem._id })
                                    }}
                                >
                                    <Image source={require("../assets/images/bg.jpg")}
                                        style={styles.classImg}
                                    />
                                    <View style={styles.classInfo}>
                                        <View style={styles.levelBox}>
                                            <View
                                                style={
                                                    styles.levelIntermediate
                                                }
                                            ></View>
                                            <Text style={styles.levelText}>{classItem.level}</Text>
                                        </View>
                                        <View
                                            style={{
                                                flexWrap: "wrap",
                                                flexDirection: "row",
                                                width: "80%",
                                            }}
                                        >
                                            <Text style={styles.className}>{classItem.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.studio}>{classItem.teacher.username}</Text>
                                        </View>
                                        <Text style={styles.dayTime}>
                                            Monday &nbsp;
                                            12:00 &nbsp;-&nbsp; 14:00
                                        </Text>
                                        <Text style={styles.statusMsg}>
                                            {classItem.status}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>


        </View >
    );

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