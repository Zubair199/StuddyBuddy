import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Text } from 'react-native-elements';

export default function CatalogScreen() {
    const isFocused = useIsFocused();

    React.useEffect(() => { }, [isFocused]);
    return (
        <ScrollView horizontal={true} style={{ padding: 10 }}>
            <View style={{ width: 170, height: 170, borderRadius: 10 }}>
                <ImageBackground source={require("../assets/images/bg.jpg")} style={{ width: 170, height: 170, borderRadius: 10 }}>
                    <View style={{alignItems: "flex-end", marginRight: 10}}>
                        <Text style={{ color: 'white' }}> Virtual</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> Intermediate</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> ClassName</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> Zubair Aslam</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> Tuesday 2:00pm - 3:00pm</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> Description asdghasdas .....</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}> Pending</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                    return (
                        <View style={{ borderWidth: 1, height:100, width:100}}>
                            <View style={{padding:20}}>
                                <Text>Item {item}</Text>
                            </View>
                        </View>
                    )
                })
            } */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

});
