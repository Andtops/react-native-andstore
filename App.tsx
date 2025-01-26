import React, { useEffect } from 'react';
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
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';

const bundleId = DeviceInfo.getBundleId();
console.log('Bundle ID:', bundleId);

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const Stack = createNativeStackNavigator();

// Define deep linking configuration
const linking = {
  prefixes: ['andstore://', 'https://andstoreee.myshopify.com'], // Add both custom scheme and Shopify URL
  config: {
    screens: {
      SplashScreen: 'splash', // Optional: Splash screen route
      ProductDetails: 'products/:handle', // Deep link for product details
      MainApp: {
        screens: {
          Home: 'home', // Example: Deep link for home tab
          Cart: 'cart', // Example: Deep link for cart tab
        },
      },
    },
  },
};

const App = () => {
  // Handle deep links when the app is opened
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      if (url) {
        const route = url.replace(/.*?:\/\//g, ''); // Remove the scheme from the URL
        const [path, handle] = route.split('/'); // Extract the path and handle
        if (path === 'products' && handle) {
          // Navigate to the ProductDetails screen with the product handle
          //@ts-ignore
          navigationRef.current?.navigate('ProductDetails', { productHandle: handle });
        }
      }
    };

    // Handle deep links when the app is opened
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // Handle deep links when the app is in the background
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove(); // Properly remove the event listener
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationContainer ref={navigationRef} linking={linking}>
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

            {/* Product Category List */}
            <Stack.Screen
              name="ProductCategoryList"
              //@ts-ignore
              component={ProductCategoryList}
              options={{ headerShown: false }}
            />

            {/* Product Details */}
            <Stack.Screen
              name="ProductDetails"
              //@ts-ignore
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