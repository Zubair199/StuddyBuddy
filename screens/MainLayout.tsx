import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
} from "react-native";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function MainLayout(props) {
    const { Component } = props
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { currentScreen, height, containerHeight } = React.useContext(ThemeContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <Header />
            <View style={styles.container}>
                <View style={{ height: containerHeight, backgroundColor:'green' }}>
                    {Component}
                </View>
            </View>
            <Footer />
        </SafeAreaView>
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
