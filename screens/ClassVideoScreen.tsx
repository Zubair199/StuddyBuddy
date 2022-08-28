import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View, TextInput } from 'react-native';
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import ClassSlider from '../components/ClassSlider';
import Icon from 'react-native-vector-icons/AntDesign';

import { FAB } from 'react-native-elements';
import AssignmentSlider from '../components/AssignmentSlider';
import ExamSlider from '../components/ExamSlider';
import AddAssignmentScreen from './AddAssignment';
import { FormControl, Modal, Button, Divider } from 'native-base';
import { ASSIGNMENT, AUTHENTICATIONS, CLASS, EXAM } from '../services/api.constants';
import MainLayout from './MainLayout';
import { AuthContext } from '../utils/AuthContext';

import {
    TwilioVideo,
    TwilioVideoLocalView,
    TwilioVideoParticipantView
} from 'react-native-twilio-video-webrtc'

export default function ClassVideoScreen() {
    const { userToken, userType } = React.useContext(AuthContext);

    const isFocused = useIsFocused();
    let [user, setUser] = React.useState(userToken)

    const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
    const [status, setStatus] = React.useState('disconnected');
    const [participants, setParticipants] = React.useState(new Map());
    const [videoTracks, setVideoTracks] = React.useState(new Map());
    const [token, setToken] = React.useState('');
    const twilioRef = React.useRef(null);
    const _onConnectButtonPress = () => {
        twilioRef.current.connect({ accessToken: token });
        setStatus('connecting');
    }

    const _onEndButtonPress = () => {
        twilioRef.current.disconnect();
    };

    const _onMuteButtonPress = () => {
        twilioRef.current
            .setLocalAudioEnabled(!isAudioEnabled)
            .then(isEnabled => setIsAudioEnabled(isEnabled));
    };

    const _onFlipButtonPress = () => {
        twilioRef.current.flipCamera();
    };

    const _onRoomDidConnect = ({ roomName, error }) => {
        console.log('onRoomDidConnect: ', roomName);

        setStatus('connected');
    };

    const _onRoomDidDisconnect = ({ roomName, error }) => {
        console.log('[Disconnect]ERROR: ', error);

        setStatus('disconnected');
    };

    const _onRoomDidFailToConnect = error => {
        console.log('[FailToConnect]ERROR: ', error);

        setStatus('disconnected');
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log('onParticipantAddedVideoTrack: ', participant, track);

        setVideoTracks(
            new Map([
                ...videoTracks,
                [
                    track.trackSid,
                    { participantSid: participant.sid, videoTrackSid: track.trackSid },
                ],
            ]),
        );
    };

    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log('onParticipantRemovedVideoTrack: ', participant, track);

        const videoTracksLocal = videoTracks;
        videoTracksLocal.delete(track.trackSid);

        setVideoTracks(videoTracksLocal);
    };
    function component() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View >
                    {
                        status === 'disconnected' &&
                        <View>
                            <Text >
                                React Native Twilio Video
                            </Text>
                            <TextInput
                               
                                autoCapitalize='none'
                                value={token}
                                onChangeText={(text) => setToken(text)}>
                            </TextInput>
                            <Button
                                title="Connect"
                                onPress={_onConnectButtonPress}>
                            </Button>
                        </View>
                    }

                    {
                        (status === 'connected' || status === 'connecting') &&
                        <View>
                            {
                                status === 'connected' &&
                                <View>
                                    {
                                        Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                                            return (
                                                <TwilioVideoParticipantView
                                                    
                                                    key={trackSid}
                                                    trackIdentifier={trackIdentifier}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            }
                            <View>
                                <TouchableOpacity
                                    onPress={_onEndButtonPress}>
                                    <Text style={{ fontSize: 12 }}>End</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={_onMuteButtonPress}>
                                    <Text style={{ fontSize: 12 }}>{isAudioEnabled ? "Mute" : "Unmute"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={_onFlipButtonPress}>
                                    <Text style={{ fontSize: 12 }}>Flip</Text>
                                </TouchableOpacity>
                                <TwilioVideoLocalView
                                    enabled={true}
                                />
                            </View>
                        </View>
                    }

                    <TwilioVideo
                        ref={twilioRef}
                        onRoomDidConnect={_onRoomDidConnect}
                        onRoomDidDisconnect={_onRoomDidDisconnect}
                        onRoomDidFailToConnect={_onRoomDidFailToConnect}
                        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
                        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
                    />
                </View>
            </View>
        )
    }

    return (
        <MainLayout Component={component()} />
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    title: {
        fontWeight: '300',
        textTransform: "uppercase",
    },
    cancel: {
        fontWeight: '400',
        color: 'red',
        textTransform: "uppercase",
    },
    heading: {
        fontSize: 15,
        fontWeight: '500',
        textTransform: "uppercase",
    }
})
