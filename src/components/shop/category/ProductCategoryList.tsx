import React, { useRef, useState } from 'react';
import { FlatList, Animated, StyleSheet, Text } from 'react-native';
import { goBack } from '../../../navigations/NavigationUtil';
import ProductItem from '../../global/ProductItem';
import FilterModal from './FilterModal';
import Header from '../../shop/category/Header';
import CategoryList from '../../shop/category/CategoryList';
import ViewToggle from '../../shop/category/ViewToggle';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { DRESSES_AND_JUMPSUITS_COLLECTIONS, JACKET_AND_COAT_COLLECTIONS, KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS, NEW_COLLECTIONS, SALEPRODUCTS, SHOE_COLLECTIONS, TROUSERS_AND_JEANS_COLLECTIONS, TSHIRTS_AND_TOPS_COLLECTIONS } from "../../../api/fetchProducts";
import { useRoute } from '@react-navigation/native';

const ProductCategoryList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // State for selected category (lifted up)
  const [selectedCategory, setSelectedCategory] = useState('See all');

  // Get the category from route params
  const route = useRoute();
  const { category } = route.params; 

  // Dynamically select the query based on the category using && operator
  const query =
    (category === 'sale' && SALEPRODUCTS) ||
    (category === 'new' && NEW_COLLECTIONS) ||
    (category === 'jacket-coat' && JACKET_AND_COAT_COLLECTIONS) ||
    (category === 'shoes' && SHOE_COLLECTIONS)||
    (category === 'knitwear-sweaters' && KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS) ||
    (category === 'trousers-jeans' && TROUSERS_AND_JEANS_COLLECTIONS) ||
    (category === 't-shirts-tops' && TSHIRTS_AND_TOPS_COLLECTIONS)||
    (category === 'dresses-jumpsuits' && DRESSES_AND_JUMPSUITS_COLLECTIONS);

  // Fetch data using the selected query
  const { loading, error, data } = useQuery(query);

  // Handle loading and error states
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const collection = data?.collection;
  const products = collection?.products?.edges || [];

  const renderHeader = () => (
    <>
      <CategoryList
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
        keyExtractor={item => item.node.id}
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
        setSelectedCategory={setSelectedCategory} // Pass setter function
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