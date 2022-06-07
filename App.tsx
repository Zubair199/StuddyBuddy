/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './navigation';
import { Node } from 'react';
import { NativeBaseProvider, extendTheme } from "native-base";
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import store from './store/store'

const App: () => Node = () => {
  const theme = extendTheme({
    components: {
      Button: {
        variants: {
          rounded: ({
            colorScheme
          }) => {
            return {
              bg: `${colorScheme}.500`,
              rounded: "full"
            };
          }
        }
      }
    }
  });
  // const isDarkMode = useColorScheme() === "dark";
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
