import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/NavigationUtil';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigations/BottomTabNavigator'; // Import the BottomTabNavigator
import ProductCategoryList from './src/components/shop/category/ProductCategoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen"
      screenOptions={{
        headerTransparent: true,
        headerShown: true
      }}
      >
        {/* Splash Screen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
        name='ProductCategoryList'
        component={ProductCategoryList}
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
    </GestureHandlerRootView>
  );
};

export default App;