// components/CategoryList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const categories = [
  'See all',
  'Trousers and jeans',
  'Jackets & Coats',
  'Knitwear & sweater',
];

const CategoryList = () => {
  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            styles.categoryChip,
            index === 0 && styles.activeCategoryChip,
          ]}>
          <Text
            style={[
              styles.categoryText,
              index === 0 && styles.activeCategoryText,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    />
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: scale(12),
    marginVertical: verticalScale(13),
  },
  categoryChip: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: scale(8),
  },
  activeCategoryChip: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
    fontSize: moderateScale(14),
  },
  activeCategoryText: {
    color: '#fff',
  },
});

export default CategoryList;