import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { dummyProducts } from '../../../utils/dummyData';

const RecommendationsSection = () => {
  return (
    <ScrollView style={styles.productsContainer}>
      <Text style={styles.sectionTitle}>You might be interested in</Text>
      <View style={styles.productGrid}>
        {dummyProducts.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    flex: 1,
    marginTop: 42,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "SFUIDisplay-Medium",
    paddingHorizontal: 16,
    color: "#444"
  }
});

export default RecommendationsSection;