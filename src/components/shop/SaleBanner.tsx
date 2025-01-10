import { View, StyleSheet, Image } from 'react-native';
import React from 'react';

const SaleBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/banner/banner1.jpeg')}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%', // SaleBanner takes 100% of the parent container's height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the container
  },
});

export default SaleBanner;