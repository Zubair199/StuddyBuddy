import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Divider, Input, TextArea } from 'native-base';
import { Button } from 'react-native-elements';

export default function AddAssignmentQuestions({ route }) {
    const { questionCount } = route.params;

    let [data, setData] = React.useState([])
    React.useEffect(() => {
        console.log(questionCount)
        let arr = Array.from({length: questionCount}, (_, i) => i + 1)
        console.log(arr)
        setData(arr)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ padding: 15, marginBottom: '28%' }}>

                <Text style={styles.title}>Add Questions</Text>
                {
                    data.map((item, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontWeight: '400' }}>Enter Question {index + 1}</Text>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <TextArea h={20} placeholder="Question" autoCompleteType={undefined} />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Option 1" />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Option 2" />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Option 3" />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Option 4" />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Input variant="outline" placeholder="Enter Answer" />
                            </View>
                            <Divider my="2" _light={{
                                bg: "muted.300"
                            }} />
                        </View>
                    ))
                }

                <View style={{ marginBottom: 40 }}>
                    <Button title={"Submit"} />
                </View>
            </ScrollView>
        </View>
    )
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
