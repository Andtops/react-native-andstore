import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SaleBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/banner/banner1.jpeg')}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
      {/* Transparent Black Overlay */}
      <View style={styles.overlay} />
      {/* Buy Button */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
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
    position: 'relative', // Ensure children can be positioned absolutely
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the container
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Transparent black color
  },
  buyButton: {
    position: 'absolute',
    backgroundColor: 'red', // Red background color
    paddingHorizontal: 50,
    paddingVertical: 11,
    borderRadius: 22, // Rounded corners
  },
  buyButtonText: {
    color: 'white', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaleBanner;