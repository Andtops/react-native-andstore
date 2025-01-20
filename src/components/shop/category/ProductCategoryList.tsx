import React, { FC, useRef, useState, useEffect } from 'react';
import { FlatList, Animated, StyleSheet, Text, View } from 'react-native';
import { goBack } from '../../../navigations/NavigationUtil';
import ProductItem from '../../global/ProductItem';
import FilterModal from './FilterModal';
import Header from '../../shop/category/Header';
import CategoryList from '../../shop/category/CategoryList';
import ViewToggle from '../../shop/category/ViewToggle';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import {
  DRESSES_AND_JUMPSUITS_COLLECTIONS,
  JACKET_AND_COAT_COLLECTIONS,
  KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS,
  NEW_COLLECTIONS,
  SALEPRODUCTS,
  SHOE_COLLECTIONS,
  TROUSERS_AND_JEANS_COLLECTIONS,
  TSHIRTS_AND_TOPS_COLLECTIONS,
} from '../../../api/fetchCollections';
import { RouteProp } from '@react-navigation/native';
import Loader from '../../global/Loader';

// Define the type for route.params
interface RouteParams {
  category: string;
}

// Define the props for the component
interface ProductCategoryListProps {
  route: RouteProp<{ params: RouteParams }, 'params'>; // Use RouteProp to type the route
}

const ProductCategoryList: FC<ProductCategoryListProps> = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for selected category (lifted up)
  const [selectedCategory, setSelectedCategory] = useState('See all');

  // Get the category from route params
  const { category } = route.params;

  // Dynamically select the query based on the category
  const query =
    (category === 'sale' && SALEPRODUCTS) ||
    (category === 'new' && NEW_COLLECTIONS) ||
    (category === 'jacket-coat' && JACKET_AND_COAT_COLLECTIONS) ||
    (category === 'shoes' && SHOE_COLLECTIONS) ||
    (category === 'knitwear-sweaters' && KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS) ||
    (category === 'trousers-jeans' && TROUSERS_AND_JEANS_COLLECTIONS) ||
    (category === 't-shirts-tops' && TSHIRTS_AND_TOPS_COLLECTIONS) ||
    (category === 'dresses-jumpsuits' && DRESSES_AND_JUMPSUITS_COLLECTIONS);

  // Fetch data using the selected query
  const { loading, error, data } = useQuery(query as any);

  // Extract product types from the current collection
  const products = data?.collection?.products?.edges || [];
  const productTypes = [
    'See all',
    ...new Set(products.map((edge: any) => edge.node.productType)),
  ];

  // Handle loading and error states
  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  const collection = data?.collection;

  const renderHeader = () => (
    <>
      <CategoryList
        categories={productTypes} // Pass product types as categories
        selectedCategory={selectedCategory} // Pass selected category
        setSelectedCategory={setSelectedCategory} // Pass setter function
      />
      <ViewToggle
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header collection={collection} scrollY={scrollY} goBack={goBack} />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem item={item} isGridView={isGridView} />
        )}
        keyExtractor={(item) => item.node.id}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={renderHeader}
        key={isGridView ? 'grid' : 'list'}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      />

      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategory={selectedCategory} // Pass selected category
        setSelectedCategory={setSelectedCategory}
        productTypes={productTypes} // Pass setter function
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsContainer: {
    paddingHorizontal: moderateScale(1),
  },
});

export default ProductCategoryList;