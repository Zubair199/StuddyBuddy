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
    const controller = new AbortController();
    const signal = controller.signal;
    React.useEffect(() => {
        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <Header />
            <View style={styles.container}>
                <View style={{ height: containerHeight, backgroundColor: '#ffffff' }}>
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
});
