import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { MoveRight } from 'lucide-react-native';
import { useQuery } from '@apollo/client';
import { YOUMIGHTBEINTERSTED } from '../../../api/fetchCollections'; // Adjust the path to your query file
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { height } = Dimensions.get('window');

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShimmerPlaceholder style={[styles.skeletonText, { width: '60%', height: 35 }]} />
      </View>
      <View style={styles.productCarousel}>
        <FlatList
          data={[1, 2, 3, 4]} // Dummy data for skeleton
          renderItem={() => (
            <View style={styles.productBox}>
              <ShimmerPlaceholder style={[styles.skeletonImage, { width: '100%', height: '100%' }]} />
              <View style={styles.productInfo}>
                <ShimmerPlaceholder style={[styles.skeletonText, { width: '80%', height: 15 }]} />
                <ShimmerPlaceholder style={[styles.skeletonText, { width: '50%', height: 15, marginTop: 5 }]} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const YouMightBeInterested = () => {
  const { loading, error, data } = useQuery(YOUMIGHTBEINTERSTED);

  // Render skeleton loader while loading
  if (loading) {
    return <SkeletonLoader />;
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  // Check if collection and products exist
  const collection = data?.collection;
  if (!collection) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Collection not found.</Text>
      </View>
    );
  }

  const products = collection.products?.edges || [];
  if (products.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No products found in this collection.</Text>
      </View>
    );
  }

  // Render each product item
  const renderItems = ({ item }: any) => {
    const product = item.node;
    const price = product.variants.edges[0]?.node.price?.amount || 'N/A';
    const imageUrl = product.featuredImage?.url || 'https://via.placeholder.com/150';

    return (
      <View style={styles.productBox}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
        <View style={styles.productInfo}>
          <Text style={styles.itemName}>{product.title}</Text>
          <Text style={styles.itemPrice}>₹{price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <MoveRight size={35} color="#000" /> You might be interested
        </Text>
      </View>
      <View style={styles.productCarousel}>
        <FlatList
          data={products}
          renderItem={renderItems}
          keyExtractor={(item) => item.node.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: height * 0.61,
  },
  header: {
    padding: 16,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 33,
    textTransform: 'uppercase',
    fontFamily: 'SFUIDisplay-Bold',
    color: '#000',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  productCarousel: {
    flex: 1, // Use flex to take remaining space
    backgroundColor: '#fff',
  },
  productBox: {
    width: 210, // Set a proper width for each item
    height: 330, // Set a proper height for each item
    backgroundColor: '#fff',
    marginRight: 5, // Add margin between items
  },
  productInfo: {
    padding: 5,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Regular',
    color: 'red',
    textTransform: 'uppercase',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  skeletonText: {
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
  },
  skeletonImage: {
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
  },
});

export default YouMightBeInterested;