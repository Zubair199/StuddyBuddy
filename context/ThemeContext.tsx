import React from "react";
// Context has been created
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ThemeContext = React.createContext(false);
// Provider
const ThemeProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = React.useState('HomeScreen');
    const [height, setHeight] = React.useState(screenHeight);
    const [width, setWidth] = React.useState(screenWidth);
    const [containerHeight, setContainerHeight] = React.useState(screenHeight - 110);
    

    return (
        <ThemeContext.Provider value={{ currentScreen, setCurrentScreen, height, width,containerHeight }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeContext, ThemeProvider };