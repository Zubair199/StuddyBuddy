import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { AuthContext } from '../utils/AuthContext';
import { ThemeContext } from "../context/ThemeContext";

export default function Footer(props) {
    const navigation = useNavigation();
    const { currentScreen, setCurrentScreen, width } = React.useContext(ThemeContext);
    return (
        <View style={{ backgroundColor: '#3878ee', height: 60, width: width - 40, marginLeft: 20, marginBottom: 10, borderRadius: 15, justifyContent: 'center' }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: "100%",
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Classes');
                    }}
                >
                    <IconFontAwesome name='briefcase' size={30} color={currentScreen === 'Classes' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // navigation.navigate('ScheduleScreen');
                        setCurrentScreen('Messages');
                    }}
                >
                    <Icon name='message1' size={30} color={currentScreen === 'Messages' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // navigation.navigate('NotificationScreen');
                        setCurrentScreen('Payments');
                    }}
                >
                    <IconFontAwesome name='diamond' size={30} color={currentScreen === 'Payments' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Profile');
                        // navigation.navigate('SearchScreen');
                    }}
                >
                    <IconFontAwesome name='user-circle-o' size={30} color={currentScreen === 'Profile' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Settings');
                        // navigation.navigate('SearchScreen');
                    }}
                >
                    <IconFontAwesome name='gear' size={30} color={currentScreen === 'Settings' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
            </View>
        </View >
    )
}
