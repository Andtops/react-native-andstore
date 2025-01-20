// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Home, Search, ShoppingBag, User} from 'lucide-react-native'; // Example icon
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import MenuScreen from '../screens/MenuScreen';
import {StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          // Customize the icon based on the route name
          let icon;
          if (route.name === 'Home') {
            icon = (
              <Home
                color={focused ? '#3e4b58' : 'gray'}
                strokeWidth={focused ? 2.5 : 2}
                size={scale(20)}
              />
            );
          } else if (route.name === 'Profile') {
            icon = (
              <User
                color={focused ? '#3e4b58' : 'gray'}
                strokeWidth={focused ? 2.5 : 2}
                size={scale(20)}
              />
            );
          } else if (route.name === 'Search') {
            icon = (
              <Search
                color={focused ? '#3e4b58' : 'gray'}
                strokeWidth={focused ? 2.5 : 2}
                size={scale(20)}
              />
            );
          } else if (route.name === 'Bag') {
            icon = (
              <ShoppingBag
                color={focused ? '#3e4b58' : 'gray'}
                strokeWidth={focused ? 2.5 : 2}
                size={scale(20)}
              />
            );
          }

          // Wrap the icon in a View to center it
          return <View style={styles.iconContainer}>{icon}</View>;
        },
        tabBarActiveTintColor: '#3e4b58',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false, // Hide labels for all tabs
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          height: verticalScale(48),
          display: route.name === 'Search' ? 'none' : 'flex', // Adjust height dynamically
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.menuTabIcon}>
              <Text
                style={[
                  styles.menuTabText,
                  focused && styles.menuTabTextFocused,
                ]}>
                MENU
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bag"
        component={WishlistScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: verticalScale(8), // Adjust top position dynamically
  },
  menuTabIcon: {
    marginTop: verticalScale(10), // Adjust margin top dynamically
    alignItems: 'center',
    width: scale(100),
    // backgroundColor: '#000',
    height: "100%",
    justifyContent: "flex-end"
  },
  menuTabText: {
    fontSize: moderateScale(15), // Adjust font size dynamically
    fontWeight: '900',
    color: 'gray', // Inactive color
  },
  menuTabTextFocused: {
    color: '#3e4b58', // Active color
  },
});

export default BottomTabNavigator;
