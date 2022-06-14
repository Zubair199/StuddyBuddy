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
                        navigation.navigate('Classes')
                    }}
                >
                    <IconFontAwesome name='briefcase' size={25} color={currentScreen === 'Classes' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Messages');
                        navigation.navigate('Messages')
                    }}
                >
                    <Icon name='message1' size={25} color={currentScreen === 'Messages' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Payments');
                        navigation.navigate('Payments')
                    }}
                >
                    <IconFontAwesome name='diamond' size={25} color={currentScreen === 'Payments' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Profile');
                        navigation.navigate('Profile')
                    }}
                >
                    <IconFontAwesome name='user-circle-o' size={25} color={currentScreen === 'Profile' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentScreen('Settings');
                        navigation.navigate('Settings')
                    }}
                >
                    <IconFontAwesome name='gear' size={25} color={currentScreen === 'Settings' ? '#ffbb74' : "white"} />
                </TouchableOpacity>
            </View>
        </View >
    )
}
