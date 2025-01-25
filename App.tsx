import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigations/NavigationUtil';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import ProductCategoryList from './src/components/shop/category/ProductCategoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import client from './src/utils/apolloClient';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import ProductDetails from './src/components/shop/productDetail';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
              headerTransparent: true,
              headerShown: true,
            }}>
            {/* Splash Screen */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductCategoryList"
              component={ProductCategoryList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
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
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export default App;