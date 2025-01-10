import {View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from 'react-native';

const NewProductBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/new_product_banner/1.png')}
        style={styles.image}
        resizeMode="cover" // Ensure the image covers the container
      />
      <View style={styles.linkView}>
        <Text style={styles.linkText}>NEW</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Discover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%', // NewProductBanner takes 100% of the parent container's height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the container
  },
  linkView: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    gap: 5
  },
  linkText: {
    fontSize: 60,
    color: '#111',
    fontFamily: 'PlayfairDisplay-ExtraBold',
  },
  linkButton: {
    backgroundColor: '#000',
    padding: 13,
    borderRadius: 26,
  },
  linkButtonText:{
    fontSize: 20,
    color: '#fff',
    textAlign: "center",
    fontFamily: "SFUIDisplay-Bold",
  }
});

export default NewProductBanner;
