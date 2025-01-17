import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import SaleBanner from '../components/shop/home/SaleBanner';
import CategoryCarousel from '../components/shop/home/CategoryCarousel';
import ProductList from '../components/shop/home/YouMightBeInterested';
import NewProductBanner from '../components/shop/home/NewProductBanner';
import { GETALLPRODUCTS } from '../api/fetchProducts';

const { height } = Dimensions.get('window'); // Get screen height

const HomeScreen = () => {
// console.log(GETALLPRODUCTS);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      {/* Banner with 100% height */}
      <View style={{ height }}>
        <SaleBanner />
      </View>
      {/* Categories carousel */}
      <CategoryCarousel />
      {/* Product list */}
      <View style={{ height }}>
        <NewProductBanner />
      </View>
      <ProductList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;