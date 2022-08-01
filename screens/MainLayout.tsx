import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {ThemeContext} from '../context/ThemeContext';
import Footer from '../components/Footer';

const screenHeight = Dimensions.get('screen').height;

export default function MainLayout(props) {
  const {Component} = props;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {currentScreen, height, containerHeight} =
    React.useContext(ThemeContext);
  const controller = new AbortController();
  const signal = controller.signal;
  React.useEffect(() => {
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{height: 50}}>
        <Header />
      </View>
      <View style={styles.container}>
        <View style={{height: containerHeight, backgroundColor: '#ffffff'}}>
          {Component}
        </View>
      </View>
      <View style={{height: 60}}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: screenHeight - 110,
    // paddingHorizontal: 15,
    // paddingBottom: 10,
  },
});
