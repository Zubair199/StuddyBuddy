import { Alert, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider, Input, Select, TextArea } from 'native-base';
import { Button } from 'react-native-elements';
import { ASSIGNMENT, AUTHENTICATIONS, EXAM } from '../services/api.constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Stepper from "react-native-stepper-ui";
import { useNavigation } from '@react-navigation/native';
import { app, grey } from '../constants/themeColors';
import Icon from 'react-native-vector-icons/AntDesign';

export default function AddAssignmentQuestions({ route }) {
    const navigation = useNavigation();

    const { assignmentID } = route.params;
    let [loader, setLoader] = React.useState(true)

    let [data, setData] = React.useState([])
    let [currentStep, setCurrentStep] = React.useState(0)
    let [totalSteps, setTotalSteps] = React.useState(0)

    let [question, setQuestion] = React.useState("")
    let [answer1, setAnswer1] = React.useState("")
    let [answer2, setAnswer2] = React.useState("")
    let [answer3, setAnswer3] = React.useState("")
    let [answer4, setAnswer4] = React.useState("")
    let [answer, setAnswer] = React.useState("")

    let [assignment, setAssignment] = React.useState(assignmentID)

    React.useEffect(() => {
        fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.GET_ASSIGNMENT_BY_ASSIGNMENT_ID + assignmentID)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('assignment details ', responseJson.data.assignment)
                setAssignment(responseJson.data.assignment)
                setTotalSteps(responseJson.data.assignment.questioncount)
                setLoader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    function addQuestions() {
        if (question !== "" && answer1 !== "" && answer2 !== "" && answer3 !== "" && answer4 !== "" && answer !== "") {
            let arr = data
            arr.push({
                id: currentStep,
                question: question,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer: answer,
                assignment: assignment,
            })
            console.log(arr)
            setData(arr)
            console.log(data)
            try {
                let requestObj = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                fetch(AUTHENTICATIONS.API_URL + ASSIGNMENT.CREATE_QUESTIONS, requestObj)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        navigation.navigate("Classes")
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
        else {
            Alert.alert("All Fields are required.")
        }
    }
    function onNext() {
        if (question !== "" && answer1 !== "" && answer2 !== "" && answer3 !== "" && answer4 !== "" && answer !== "") {
            if (currentStep !== totalSteps) {
                console.log("onNext => ", currentStep)
                let arr = data
                let res = arr.filter(item => item.id === currentStep)
                console.log("res=> ", res)

                if (res.length > 0) {

                    arr = arr.filter(item => item.id !== currentStep)
                    arr.push({
                        id: currentStep,
                        question: question,
                        answer1: answer1,
                        answer2: answer2,
                        answer3: answer3,
                        answer4: answer4,
                        answer: answer,
                        assignment: assignment,
                    })
                    let res1 = arr.filter(item => item.id === currentStep + 1)
                    if (res1.length > 0) {
                        setQuestion(res1[0].question)
                        setAnswer1(res1[0].answer1)
                        setAnswer2(res1[0].answer2)
                        setAnswer3(res1[0].answer3)
                        setAnswer4(res1[0].answer4)
                        setAnswer(res1[0].answer)
                    } else {
                        clearState()
                    }

                }
                else {
                    arr.push({
                        id: currentStep,
                        question: question,
                        answer1: answer1,
                        answer2: answer2,
                        answer3: answer3,
                        answer4: answer4,
                        answer: answer,
                        assignment: assignment,
                    })
                    clearState()
                }
                setData(arr)
                setCurrentStep(currentStep + 1)
            }
        }
        else {
            Alert.alert("All Fields are required.")
        }
    }
    function clearState() {
        setQuestion("")
        setAnswer1("")
        setAnswer2("")
        setAnswer3("")
        setAnswer4("")
        setAnswer("")
    }
    function onPrevious() {
        let arr = data
        let res = arr.filter(item => item.id === currentStep - 1)
        console.log(res)
        if (res.length > 0) {
            setQuestion(res[0].question)
            setAnswer1(res[0].answer1)
            setAnswer2(res[0].answer2)
            setAnswer3(res[0].answer3)
            setAnswer4(res[0].answer4)
            setAnswer(res[0].answer)
        }
        if (currentStep > 0) {
            console.log("onPrevious => ", currentStep - 1)
            setCurrentStep(currentStep - 1)
            // console.log(data[currentStep - 1])
        }
    }
    function renderStep() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: '400' }}>Enter Question {currentStep + 1}</Text>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <TextArea h={20} placeholder="Question" defaultValue={question} autoCompleteType={undefined} onChangeText={(text) => setQuestion(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input variant="outline" placeholder="Answer 1" defaultValue={answer1} onChangeText={(text) => setAnswer1(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input variant="outline" placeholder="Answer 2" defaultValue={answer2} onChangeText={(text) => setAnswer2(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input variant="outline" placeholder="Answer 3" defaultValue={answer3} onChangeText={(text) => setAnswer3(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input variant="outline" placeholder="Answer 4" defaultValue={answer4} onChangeText={(text) => setAnswer4(text)} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    {
                        (answer1 !== "" && answer2 !== "" && answer3 !== "" && answer4 !== "")
                        &&
                        <Select accessibilityLabel="Choose Right Answer"
                            placeholder="Choose Right Answer"
                            onValueChange={itemValue => {
                                setAnswer(itemValue)
                            }}
                            selectedValue={answer}
                        >
                            <Select.Item label={answer1} value={answer1} />
                            <Select.Item label={answer2} value={answer2} />
                            <Select.Item label={answer3} value={answer3} />
                            <Select.Item label={answer4} value={answer4} />
                        </Select>
                    }
                </View>

                <View style={{ marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        {
                            currentStep !== 0 &&
                            <TouchableOpacity style={[styles.segmentButtons, { backgroundColor: grey[500] }]} onPress={() => { clearState(); onPrevious(); }}>
                                <Text style={styles.buttonText}> Previous</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View>
                        {
                            currentStep === (totalSteps - 1) ?
                                <TouchableOpacity style={[styles.segmentButtons, { backgroundColor: app.lightBlue }]} onPress={() => addQuestions()}>
                                    <Text style={styles.buttonText}> Submit</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.segmentButtons, { backgroundColor: app.lightBlue }]} onPress={() => { clearState(); onNext(); }}>
                                    <Text style={styles.buttonText}> Save & Next </Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    if (loader) {
        return (
            <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
                <Text style={styles.title}>Loading...</Text>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Add Questions</Text>
                    {/* <Text style={styles.label}>totalSteps: {totalSteps}</Text> */}
                    {
                        renderStep()
                    }
                </ScrollView>
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create({
    title: {
        color: "black",
        fontSize: 25,
        textTransform: "uppercase",
        textAlign: "center",
        fontFamily: "roboto-light",
        fontWeight: "300",
        marginTop: 15
    },
    label: {
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 15,
        fontWeight: "300",
    },
    input: {
        height: 45,
        backgroundColor: 'white'
    },
    multilineInput: {
        backgroundColor: 'white'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        // margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    segmentButtons: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        padding: 10,
        borderRadius: 15,
        // marginVertical: 5,    
        width: 150
    },
});
