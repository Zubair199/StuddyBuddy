import * as React from 'react';
import { View, useWindowDimensions, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { app } from '../constants/themeColors';
import AssignmentsTab from './AssignmentsTab';
import ClassesTab from './ClassesTab';
import ExamsTab from './ExamsTab';
const windowWidth = Dimensions.get('window').width;



export default function Tab() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Classes' },
        { key: 'second', title: 'Assignments' },
        { key: 'third', title: 'Exams' },
    ]);
    const [fontSize, setFontSize] = React.useState(14)
    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <ClassesTab />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <AssignmentsTab />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <ExamsTab />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    React.useEffect(() => {
        console.log("windowWidth=> ", windowWidth);
        if (windowWidth < 390) {
            setFontSize(12)
        }
    }, [])

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{ backgroundColor: app.lightBlue }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ fontSize: fontSize, color: "#ffffff" }}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}