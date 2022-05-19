import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default function GuestArtsScreen() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  heading: {
    textTransform: 'uppercase',
    marginTop: 15,
    fontSize: 18,
    color: '#3878ee',
    fontWeight: '700',
  },
});
