import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { AuthContext } from '../utils/AuthContext';

const routes = [
    {
        screen: 'HomeScreen',
        icon: 'home'
    },
    {
        screen: 'ScheduleScreen',
        icon: 'calendar'
    },
    {
        screen: 'NotificationScreen',
        icon: 'bells'
    },
    {
        screen: 'SearchScreen',
        icon: 'search1'
    }
]
export default function Header(props) {
    const navigation = useNavigation();
    const { currentScreen } = React.useContext(AuthContext)

    return (
        <View style={{ backgroundColor: '#3878ee', height: 50 }}>
            <View style={{
                paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: "100%",
            }}>
                {
                    routes.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate('Root', { screen: item.screen });
                            }}
                        >
                            {/* props.screenName === "HomeScreen" ? '#ffbb74' :  */}
                            <Icon
                                name={item.icon} size={30}
                                color={props.screenName === currentScreen ? '#ffbb74' : "white"}
                            />
                        </TouchableOpacity>

                    ))
                }

                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ScheduleScreen');
                    }}
                >
                    <Icon name='calendar' size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('NotificationScreen');                        
                    }}
                >
                    <Icon name='bells' size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SearchScreen');
                    }}
                >
                    <Icon name='search1' size={30} color="white" />
                </TouchableOpacity> */}
            </View>
            <View>
                <Text style={{ fontSize: 30 }}>{currentScreen} </Text>
            </View>
        </View >
    )
}
