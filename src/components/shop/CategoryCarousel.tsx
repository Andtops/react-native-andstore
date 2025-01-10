import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { dummyCategories } from '../../utils/dummyData';

const CategoryCarousel = () => {
  return (
    <View style={styles.listHeaderContainer}>
      <View style={styles.listCategoriesBox}>
        <ScrollView horizontal>
          {dummyCategories.categories.map((category) => (
            <View key={category.id} style={styles.categoryCarousel}>
              <Image
                source={typeof category.image === "string" ? { uri: category.image } : category.image} // Handle both local and online images
                resizeMode="cover"
                style={styles.categoryCarouselImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{category.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 0,
  },
  listCategoriesBox: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  categoryCarousel: {
    width: 180, // Fixed width for each category item
    marginRight: 0, // Add spacing between items
    backgroundColor: 'transparent', // Remove white background
    padding: 3,
    height: 240,
    position: 'relative', // For positioning the text container
  },
  categoryCarouselImage: {
    width: '100%', // Cover the entire container
    height: '100%', // Cover the entire container
    position: 'absolute', // Position the image behind the text
  },
  textContainer: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  categoryText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Bold',
    color: 'red', // Red color
    textTransform: 'uppercase', // Uppercase text
    textAlign: 'center',
  },
});

export default CategoryCarousel;