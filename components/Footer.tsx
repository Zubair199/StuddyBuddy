import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';

export default function Footer(props) {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#3878ee', height: 50 }}>
            <View style={{
                paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: "100%",
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        });
                    }}
                >
                    <Icon name='home' size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ScheduleScreen' }],
                        });
                    }}
                >
                    <Icon name='calendar' size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'NotificationScreen' }],
                        });
                    }}
                >
                    <Icon name='bells' size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SearchScreen' }],
                        });
                    }}
                >
                    <Icon name='search1' size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
