import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AssignmentsTab from './AssignmentsTab';
import ClassesTab from './ClassesTab';
import ExamsTab from './ExamsTab';

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

export default function Tab() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Classes' },
        { key: 'second', title: 'Assignments' },
        { key: 'third', title: 'Exams' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}