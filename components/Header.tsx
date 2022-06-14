import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { AuthContext } from '../utils/AuthContext';
import { ThemeContext } from "../context/ThemeContext";

export default function Header(props) {
    const navigation = useNavigation();
    const { currentScreen, setCurrentScreen } = React.useContext(ThemeContext);
    return (
        <View style={{ backgroundColor: '#3878ee', height: 50, justifyContent: 'center' }}>
            <View style={{
                // paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: "100%",
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('HomeScreen');
                        navigation.navigate('HomeScreen');
                    }}
                >
                    <Icon name='home' size={30} color={currentScreen === 'HomeScreen' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('ScheduleScreen');
                        navigation.navigate('ScheduleScreen');
                    }}
                >
                    <Icon name='calendar' size={30} color={currentScreen === 'ScheduleScreen' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('NotificationScreen');
                        navigation.navigate('NotificationScreen');
                    }}
                >
                    <Icon name='bells' size={30} color={currentScreen === 'NotificationScreen' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('SearchScreen');
                        navigation.navigate('SearchScreen');
                    }}
                >
                    <Icon name='search1' size={30} color={currentScreen === 'SearchScreen' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
            </View>
        </View >
    )
}
