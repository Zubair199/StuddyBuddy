import { Alert, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider, Input, TextArea } from 'native-base';
import { Button } from 'react-native-elements';
import { AUTHENTICATIONS, EXAM } from '../services/api.constants';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Stepper from "react-native-stepper-ui";
import { useNavigation } from '@react-navigation/native';

export default function AddExamQuestions({ route }) {
    const navigation = useNavigation();

    const { examID } = route.params;
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

    let [exam, setExam] = React.useState(examID)

    React.useEffect(() => {
        fetch(AUTHENTICATIONS.API_URL + EXAM.GET_EXAM_BY_EXAM_ID + examID)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('exam details ', responseJson.data)
                setTotalSteps(responseJson.data.questioncount)
                setLoader(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    function addQuestions() {
        if (question !== "" || answer1 !== "" || answer2 !== "" || answer3 !== "" || answer4 !== "" || answer !== "") {
            let arr = data
            arr.push({
                id: currentStep,
                question: question,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer: answer,
                exam: exam,
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
                fetch(AUTHENTICATIONS.API_URL + EXAM.CREATE_QUESTIONS, requestObj)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        navigation.navigate("HomeScreen")
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
        if (question !== "" || answer1 !== "" || answer2 !== "" || answer3 !== "" || answer4 !== "" || answer !== "") {
            if (currentStep !== totalSteps) {
                console.log("onNext => ", currentStep + 1)
                let arr = data
                let res = arr.filter(item => item.id === currentStep)
                console.log("res=> ", res)
                if (res.length > 0) {
                    setQuestion(res[0].question)
                    setAnswer1(res[0].answer1)
                    setAnswer2(res[0].answer2)
                    setAnswer3(res[0].answer3)
                    setAnswer4(res[0].answer4)
                    setAnswer(res[0].answer)
                    arr = arr.filter(item => item.id !== currentStep)
                    arr.push({
                        id: currentStep,
                        question: question,
                        answer1: answer1,
                        answer2: answer2,
                        answer3: answer3,
                        answer4: answer4,
                        answer: answer,
                        exam: exam,
                    })
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
                        exam: exam,
                    })
                }
                setData(arr)
                setCurrentStep(currentStep + 1)
                setQuestion("")
                setAnswer1("")
                setAnswer2("")
                setAnswer3("")
                setAnswer4("")
                setAnswer("")
            }
        }
        else {
            Alert.alert("All Fields are required.")
        }
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
            <View style={{ marginBottom: 20 }}>
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
                    {/* <Input variant="outline" placeholder="Enter Answer" defaultValue={answer} onChangeText={(text) => setAnswer(text)} /> */}
                    <Select accessibilityLabel="Choose Right Answer"
                        placeholder="Choose Right Answer"
                        onValueChange={itemValue => {
                            setAnswer(itemValue)
                        }}
                    >
                        <Select.Item label={answer1} value={answer1} />
                        <Select.Item label={answer2} value={answer2} />
                        <Select.Item label={answer3} value={answer3} />
                        <Select.Item label={answer4} value={answer4} />
                    </Select>
                </View>

                <View style={{ marginVertical: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        {/* {
                            currentStep !== 0 &&
                            <TouchableOpacity onPress={() => onPrevious()}>
                                <Text> Previous</Text>
                            </TouchableOpacity>
                        } */}
                    </View>
                    <View>
                        {
                            currentStep === (totalSteps - 1) ?
                                <TouchableOpacity onPress={() => addQuestions()}>
                                    <Text> Submit</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => onNext()}>
                                    <Text> Next</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    if (loader) {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ padding: 15 }}>

                    <Text style={styles.title}>Add Questions</Text>
                    <Text style={styles.label}>totalSteps: {totalSteps}</Text>
                    {
                        renderStep()
                    }
                </ScrollView>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textTransform: "uppercase",
        textAlign: "center",
        fontFamily: "roboto-light",
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "300",
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
    }
});
