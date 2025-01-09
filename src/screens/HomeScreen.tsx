import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Banner from '../components/shop/Banner';
import { dummyProducts, dummyCategories } from '../utils/dummyData'; // Import dummyCategories

const { height } = Dimensions.get('window'); // Get screen height

const HomeScreen = () => {
  // Render each item in the product list
  const renderItems = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  // Categories carousel
  const flatListHeaderComponents = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View style={styles.listCategoriesBox}>
          <ScrollView horizontal>
            {dummyCategories.categories.map((category) => (
              <View key={category.id} style={styles.categoryCarousel}>
                <Image
                  source={{ uri: category.image }} // Use online image URL
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
      {flatListHeaderComponents()}
      {/* Product list */}
      {/* <View>
        {dummyProducts.products.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
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

export default HomeScreen;