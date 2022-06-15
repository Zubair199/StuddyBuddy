import React, { useEffect, useState } from 'react'
import { Button, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Modal, TouchableOpacity, TouchableOpacityBase, View, Pressable } from 'react-native';
import { Divider, Radio } from 'native-base';
import { CheckBox, Text } from 'react-native-elements';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { ASSIGNMENT, AUTHENTICATIONS, CLASS } from '../services/api.constants'
import { AuthContext } from '../utils/AuthContext';

export default function AssignmentStartScreen({ route }) {
    const { assignmentID, studentAssignmentID } = route.params
    const navigation = useNavigation();
    const { userToken } = React.useContext(AuthContext);
    let [user, setUser] = React.useState(userToken)
    const [assignmentQuestions, setAssignmentQuestions] = useState([])
    const [assignmentQuestionsAnswers, setAssignmentQuestionsAnswers] = useState([])
    const [report, setReport] = useState([])
    useEffect(() => {
        console.log(route.params, user)
        fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.GET_ASSIGNMENT_QUESTIONS_BY_ASSIGNEMNT_ID + assignmentID)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('assignment questions ', responseJson.data)
                setAssignmentQuestions(responseJson.data)
                let x = responseJson.data.map((item, index) => {
                    return (
                        {
                            id: item._id,
                            question: item,
                            studentAnswer: null,
                        }
                    )
                })
                // console.log(x)
                setAssignmentQuestionsAnswers(x)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function storeAnswers(assignmentQuestion, value) {
        console.log('data => ', assignmentQuestionsAnswers)
        // console.log(assignmentQuestion)
        // console.log(value)
        let obj = {
            id: assignmentQuestion._id,
            question: assignmentQuestion,
            studentAnswer: value,
        }
        // console.log(obj)
        let existingValues = assignmentQuestionsAnswers.filter((item, index) => item.id !== assignmentQuestion._id)
        existingValues.push(obj)
        console.log(existingValues.length)
        setAssignmentQuestionsAnswers(existingValues)

    }
    function onSubmit() {
        try {
            let score = 0;
            let answers = new Array()
            assignmentQuestionsAnswers.forEach((item, index) => {
                if (item.studentAnswer === item.question.answer) {
                    answers.push(
                        {
                            answer: item.studentAnswer,
                            color: '#42ba96'
                        }
                    )
                    score = score + 1
                }
                else {
                    answers.push(
                        {
                            answer: item.studentAnswer,
                            color: '#df4759'
                        }
                    )
                }

            })
            let requestObj = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: "Completed", score: score })
            }
            fetch(AUTHENTICATIONS.API_URL + CLASS.START_ASSIGNMENT + studentAssignmentID, requestObj)
                .then((response: any) => {
                    console.log(response)
                    console.log("submitted")

                    console.log(answers)
                    setReport(answers)
                    setIsOpen(true)

                })
                .catch((err: any) => {
                    console.log(err)
                    console.log(err.response)
                })
        }
        catch (exception) {
            console.log('exception ', exception)
        }

    }
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
                    <Text style={styles.title}>Assignment Questions {assignmentQuestionsAnswers.length}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: "center" }}> */}
                {/* <Text style={styles.subtitle}>Remaining Time : 60 mins</Text> */}
                {/* </View> */}
            </View>
            <Modal
                animationType="slide"
                visible={isOpen}
                onRequestClose={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
                    <View style={{ flexDirection: "row-reverse" }}>
                        <Pressable
                            onPress={() =>
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'HomeScreen' },
                                    ]
                                })
                            }

                        >
                            <Icon
                                size={20}
                                name="close"
                            />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: "center" }}>
                        <Text style={styles.title}>Assignment Result</Text>
                    </View>
                    <View>
                        {
                            report.map((item, index) => (
                                <View key={index} style={{ borderRadius: 5, marginVertical: 5, backgroundColor: `${item.color}`, padding: 10 }}>
                                    <Text>{item.answer}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </Modal>

            {
                assignmentQuestions.length > 0 &&
                <ProgressSteps>
                    {
                        assignmentQuestions.map((assignmentQuestion, index) => (
                            <ProgressStep label="" key={index} onSubmit={() => { onSubmit() }}>
                                <View style={{ flex: 1, paddingLeft: 20 }}>
                                    <Text style={{ fontSize: 20 }}>Q{index + 1}: {assignmentQuestion.question}</Text>
                                    <View style={{ marginVertical: 15 }}>
                                        <Radio.Group
                                            name="myRadioGroup"
                                            onChange={(value) => {
                                                storeAnswers(assignmentQuestion, value);
                                            }}
                                        >
                                            <Radio value={assignmentQuestion.option1} my="1">
                                                {assignmentQuestion.option1}
                                            </Radio>
                                            <Radio value={assignmentQuestion.option2} my="1">
                                                {assignmentQuestion.option2}
                                            </Radio>
                                            <Radio value={assignmentQuestion.option3} my="1">
                                                {assignmentQuestion.option3}
                                            </Radio>
                                            <Radio value={assignmentQuestion.option4} my="1">
                                                {assignmentQuestion.option4}
                                            </Radio>
                                        </Radio.Group>
                                    </View>
                                </View>
                            </ProgressStep>
                        ))
                    }
                </ProgressSteps>
                // <ScrollView style={{ padding: 15 }}>
                //     {
                //         assignmentQuestions.map((assignmentQuestion, index) => (
                //             <View key={index} style={{ marginVertical: 10 }}>
                //                 <View>
                //                     <Text style={{ fontSize: 20, marginLeft: 15 }}>Q{index + 1}: {assignmentQuestion.question}</Text>
                //                 </View>
                //                 <View style={{ marginVertical: 15 }}>

                //                     <Radio.Group
                //                         name="myRadioGroup"
                //                         onChange={(value) => {
                //                             storeAnswers(assignmentQuestion, value);
                //                         }}
                //                     >
                //                         <Radio value={assignmentQuestion.option1} my="1">
                //                             {assignmentQuestion.option1}
                //                         </Radio>
                //                         <Radio value={assignmentQuestion.option2} my="1">
                //                             {assignmentQuestion.option2}
                //                         </Radio>
                //                         <Radio value={assignmentQuestion.option3} my="1">
                //                             {assignmentQuestion.option3}
                //                         </Radio>
                //                         <Radio value={assignmentQuestion.option4} my="1">
                //                             {assignmentQuestion.option4}
                //                         </Radio>
                //                     </Radio.Group>
                //                 </View>
                //                 <Divider />
                //             </View>
                //         ))
                //     }
                //     <View style={{marginVertical:10, marginBottom: 20}}>
                //         <Button title="Submit" onPress={() => onSubmit()} />
                //     </View>
                // </ScrollView>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1
    },

    challengeBoxImage: {
        height: 266,
    },

    challengeBoxDate: {
        color: "#FFFFFF",
        fontSize: 15,
    },

    challengeTypeBox: {
        paddingLeft: 0,
        flex: 1,
    },

    challengeTypeOverLay: {
        backgroundColor: "rgba(0,0,0,0.3)",
        height: 30,
        justifyContent: "center"
    },

    challengeBoxText: {
        color: "#FFFFFF",
        fontSize: 13,
        textTransform: "uppercase",
        marginLeft: 5,
    },

    title: {
        fontSize: 25,
        textTransform: "uppercase",
        fontFamily: "roboto-light",
    },
    subtitle: {
        fontSize: 20,
        textTransform: "uppercase",
        fontFamily: "roboto-light",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 5,
        justifyContent: "flex-end",
        padding: 10,
        overflow: "hidden"
    },

    challengeBoxName: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "roboto-regular",
    },

    heading: {
        fontSize: 20,
        fontFamily: "roboto-light",
        marginTop: 40,
        textTransform: "uppercase",
    },
    text: {
        fontSize: 15,
        fontFamily: "roboto-light",
        marginTop: 5,
    },
});