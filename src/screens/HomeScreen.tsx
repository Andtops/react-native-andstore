import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import Banner from '../components/shop/SaleBanner';
import CategoryCarousel from '../components/shop/CategoryCarousel';
import ProductList from '../components/shop/ProductList';
import NewProductBanner from '../components/shop/NewProductBanner';

const { height } = Dimensions.get('window'); // Get screen height

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      {/* Banner with 100% height */}
      <View style={{ height }}>
        <Banner />
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