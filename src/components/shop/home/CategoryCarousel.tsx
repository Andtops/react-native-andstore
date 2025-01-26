import React, { memo, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useApolloClient } from '@apollo/client'; // Use useApolloClient for imperative fetching
import { push } from '../../../navigations/NavigationUtil';
import { GET_COLLECTION_BY_HANDLE } from '../../../api/fetchCollections';

interface Collection {
  id: string;
  title: string;
  handle: string;
  image: {
    url: string;
  };
}

const COLLECTION_HANDLES = [
  'jacket-coat',
  'trousers-jeans',
  'shoes',
  'knitwear-sweaters',
  't-shirts-tops',
  'dresses-jumpsuits',
];

const CategoryCarousel = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const client = useApolloClient(); // Use Apollo Client for imperative fetching

  // Fetch all collections using their handles
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const results = await Promise.all(
          COLLECTION_HANDLES.map((handle) =>
            client.query({
              query: GET_COLLECTION_BY_HANDLE,
              variables: { handle },
            })
          )
        );

        const fetchedCollections = results
          .map((result) => result.data?.collection)
          .filter((collection): collection is Collection => !!collection?.image?.url);

        setCollections(fetchedCollections);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [client]);

  // Handle errors
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Handle no collections found
  if (!collections.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No collections found.</Text>
      </View>
    );
  }

  // Handle button press for a category
  const handleButtonPress = (handle: string) => {
    push('ProductCategoryList', { category: handle });
  };


  return (
    <View style={styles.listHeaderContainer}>
      <View style={styles.listCategoriesBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {collections.map((collection) => (
            <TouchableOpacity
              key={collection.id}
              onPress={() => handleButtonPress(collection.handle)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryCarousel}>
                <Image
                  source={{ uri: collection.image.url }}
                  resizeMode="cover"
                  style={styles.categoryCarouselImage}
                  defaultSource={{uri:"https://via.placeholder.com/150"}}
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
    marginRight: 10, // Added margin for spacing between items
    backgroundColor: 'transparent',
    padding: 3,
    height: 240,
    position: 'relative',
    borderRadius: 10, // Added border radius for better UI
    overflow: 'hidden', // Ensure the image respects the border radius
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay for better text visibility
  },
  categoryText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Bold',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 240, // Match the height of the carousel
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default memo(CategoryCarousel);