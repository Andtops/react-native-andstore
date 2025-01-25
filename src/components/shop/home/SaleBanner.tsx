import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { push } from '../../../navigations/NavigationUtil';

const SaleBanner = () => {
  const handleButtonPress = () => {
    push('ProductCategoryList', { category: 'sale' });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <Image
        source={require('../../../assets/images/banner/banner1.png')}
        style={styles.image}
        resizeMode="cover" // Ensures the image covers the container without stretching
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '99%', // SaleBanner takes 100% of the parent container's height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative', // Ensure children can be positioned absolutely
  },
  image: {
    width: '100%', // Cover the full width of the container
    height: '100%', // Cover the full height of the container
    resizeMode: 'contain', // Ensures the image covers the container without stretching
    aspectRatio: 9/16, // Adjust this based on your image's aspect ratio
  },
});

export default SaleBanner;