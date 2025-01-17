import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { push } from '../../../navigations/NavigationUtil';
import { GETALL_COLLECTIONS } from '../../../api/fetchProducts'; // Updated query

interface Collection {
  id: string;
  title: string;
  handle: string;
  image: {
    url: string;
  };
}

interface AllCollectionsData {
  jackets: Collection;
  trousers: Collection;
  shoes: Collection;
  knitwear: Collection;
  tshirts: Collection;
  dresses: Collection;
}

const CategoryCarousel = () => {
  // Fetch all collections using a single query
  const { data, loading, error } = useQuery<AllCollectionsData>(GETALL_COLLECTIONS);

  // Handle errors
  if (error) {
    console.error('Error fetching collections:', error);
    return <Text>Failed to load collections.</Text>;
  }

  // Handle loading state
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Combine all collections into a single array
  const collections = [
    data?.jackets,
    data?.trousers,
    data?.shoes,
    data?.knitwear,
    data?.tshirts,
    data?.dresses
  ].filter((collection) => collection?.image?.url); // Skip collections without an image

  // Handle no collections found
  if (!collections.length) {
    return <Text>No collections found.</Text>;
  }

  // Handle button press for a category
  const handleButtonPress = (handle: string) => {
    push('ProductCategoryList', { category: handle });
  };

  return (
    <View style={styles.listHeaderContainer}>
      <View style={styles.listCategoriesBox}>
        <ScrollView horizontal>
          {collections.map((collection : any) => (
            <TouchableOpacity
              key={collection.id}
              onPress={() => handleButtonPress(collection.handle)}
            >
              <View style={styles.categoryCarousel}>
                <Image
                  source={{ uri: collection.image.url }}
                  resizeMode="cover"
                  style={styles.categoryCarouselImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.categoryText}>{collection.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    width: 200,
    marginRight: 0,
    backgroundColor: 'transparent',
    padding: 3,
    height: 240,
    position: 'relative',
  },
  categoryCarouselImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    aspectRatio: 2 / 3,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Bold',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default CategoryCarousel;