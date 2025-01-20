import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface CategoryListProps {
  categories: string[] | any; // Array of categories (including "See all")
  selectedCategory: string; // Currently selected category
  setSelectedCategory: (category: string) => void; // Function to update selected category
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const flatListRef = useRef<FlatList>(null); // Ref for FlatList

  // Find the index of the selected category
  const selectedIndex = categories.findIndex(
    (item : any) => item === selectedCategory,
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
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === item && styles.activeCategoryChip, // Apply active style if selected
          ]}
          onPress={() => setSelectedCategory(item)} // Handle category selection
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item && styles.activeCategoryText, // Apply active text style if selected
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item} // Use the category name as the key
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