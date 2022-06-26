import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Divider, View } from 'native-base';
import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { AUTH, AUTHENTICATIONS } from '../services/api.constants';
import { AuthContext } from '../utils/AuthContext';
import MainLayout from './MainLayout';
import Icon from 'react-native-vector-icons/AntDesign';

export default function NetworkScreen() {
    const { userToken, userType } = React.useContext(AuthContext);

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    let [user, setUser] = React.useState(userToken)
    let [users, setUsers] = React.useState([])

    React.useEffect(() => {
        console.log("NetworkScreen", userType)
        apiCall()

    }, [isFocused])
    function apiCall() {
        fetch(AUTHENTICATIONS.API_URL + AUTH.USERS)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('users ', responseJson.data)
                setUsers(responseJson.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    function component() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ScrollView >
                    {
                        users.map((item, index) => {
                            return (
                                <View>
                                    <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                        <View>
                                            <View>
                                                <Text>{item.username}</Text>
                                                <View>
                                                    <Text>{item.roles.name}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => { }}>
                                                <Icon name="message1" size={25} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Divider />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
    return (
        <MainLayout Component={component()} />
    )
}

const styles = StyleSheet.create({});
