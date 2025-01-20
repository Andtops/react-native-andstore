import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface CategoryListProps {
  categories: string[] | any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const flatListRef = useRef<FlatList>(null);

  const selectedIndex = categories.findIndex(
    (item: any) => item === selectedCategory,
  );

  useEffect(() => {
    if (flatListRef.current && selectedIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selectedCategory, selectedIndex]);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === item && styles.activeCategoryChip,
          ]}
          onPress={() => setSelectedCategory(item)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item && styles.activeCategoryText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      onScrollToIndexFailed={() => {
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
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
    fontSize: moderateScale(12),
    fontFamily: 'SFUIDisplay-Semibold',
  },
  activeCategoryText: {
    color: '#fff',
  },
});

export default CategoryList;