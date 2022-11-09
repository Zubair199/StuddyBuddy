/* ===================================== AUDIT LOG ========================================= *
* title: Loader                                                                              *
* Author: Abdul Zahir                                                                        *
* Created on: 08/16/2020                                                                     *
* Version: 0.1                                                                               *
* Description: custom deep move activity indicator                                           *
*=========================================================================================== *
* Last Modified by: NAMEHERE                                                                 *
* Changes: *
* Last Modified on: DATEGOESHERE                                                             *
 ========================================================================================== */

import * as React from "react";
import { View, Image, StyleSheet } from "react-native";

function Loader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Deep-Move-Spinner-v3.gif")}
        style={styles.spinner}
      />
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    height: 109,
    width: 200,
  },
});
