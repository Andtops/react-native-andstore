// src/screens/SplashScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { resetAndNavigate } from '../navigations/NavigationUtil';

const SplashScreen = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (showLoader) {
      console.log('Loader shown, starting navigation timer'); // Debugging
      const timer = setTimeout(() => {
        console.log('Navigating to MainApp'); // Debugging
        resetAndNavigate('MainApp'); // Navigate to MainApp (BottomTabNavigator)
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Splash Screen Animation */}
      <LottieView
        source={require('../assets/splash/splash-icon.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          console.log('Splash animation finished'); // Debugging
          setShowLoader(true);
        }}
        style={styles.animation}
      />

      {/* Loader Animation */}
      {showLoader && (
        <LottieView
          source={require('../assets/splash/loader.json')}
          autoPlay
          loop={true}
          style={styles.loader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 600,
    height: 600,
  },
  loader: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: '52%',
  },
});

export default SplashScreen;