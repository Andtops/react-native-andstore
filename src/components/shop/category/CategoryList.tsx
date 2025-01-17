import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { dummyCategories } from '../../../utils/dummyData';

const CategoryList = ({ selectedCategory, setSelectedCategory }: any) => {
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList

  // Add "See all" as the first item in the categories list
  const categoriesWithSeeAll = [
    { id: 'see_all', title: 'See all' }, // Add "See all" as the first item
    ...dummyCategories.categories, // Spread the rest of the categories
  ];

  // Find the index of the selected category
  const selectedIndex = categoriesWithSeeAll.findIndex(
    (item) => item.title === selectedCategory,
  );

  // Scroll to the selected category when it changes
  useEffect(() => {
    if (flatListRef.current && selectedIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
        viewPosition: 0.5, // Center the selected item
      });
    }
  }, [selectedCategory, selectedIndex]);

  return (
    <FlatList
      ref={flatListRef} // Attach the ref to FlatList
      horizontal
      data={categoriesWithSeeAll}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === item.title && styles.activeCategoryChip, // Apply active style if selected
          ]}
          onPress={() => setSelectedCategory(item.title)} // Handle category selection
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.title && styles.activeCategoryText, // Apply active text style if selected
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id} // Use the `id` field as the key
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      onScrollToIndexFailed={() => {
        // Fallback in case scrollToIndex fails
        setTimeout(() => {
          if (flatListRef.current && selectedIndex !== -1) {
            flatListRef.current.scrollToIndex({
              index: selectedIndex,
              animated: true,
              viewPosition: 0.5,
            });
          }
        }, 500);
      }}
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
    backgroundColor: '#000', // Background color for the selected category
  },
  categoryText: {
    color: '#000', // Text color for unselected categories
    fontSize: moderateScale(12),
    fontFamily: 'SFUIDisplay-Semibold',
  },
  activeCategoryText: {
    color: '#fff', // Text color for the selected category
  },
});

export default CategoryList;