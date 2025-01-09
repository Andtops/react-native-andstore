import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/NavigationUtil';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigations/BottomTabNavigator'; // Import the BottomTabNavigator

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* Splash Screen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Bottom Tab Navigator */}
        <Stack.Screen
          name="MainApp"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;