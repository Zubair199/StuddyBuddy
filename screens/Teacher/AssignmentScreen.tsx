import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function AssignmentScreen() {
  const isFocused = useIsFocused();

  React.useEffect(() => {}, [isFocused]);
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
