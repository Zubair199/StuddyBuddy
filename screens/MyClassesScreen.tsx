import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import ClassSlider from '../components/ClassSlider';

export default function MyClassesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10, backgroundColor: 'white', flex:1 }}>
      <ScrollView>
        <View>
          <ClassSlider data={[]} categoryText={"My Upcoming Classes"} screen={"ClassDetails"} />
        </View>
        <View>
          <ClassSlider data={[]} categoryText={"My Assignments"} screen={"AssignmentDetails"} />
        </View>
      </ScrollView>
    </View>
  )
}
