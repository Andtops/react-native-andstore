import React, { FC, useRef, useState, useMemo } from 'react';
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

interface RouteParams {
  category: string;
}

interface ProductCategoryListProps {
  route: RouteProp<{ params: RouteParams }, 'params'>;
}

const ProductCategoryList: FC<ProductCategoryListProps> = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('See all');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);

  const { category } = route.params;

  const query =
    (category === 'sale' && SALEPRODUCTS) ||
    (category === 'new' && NEW_COLLECTIONS) ||
    (category === 'jacket-coat' && JACKET_AND_COAT_COLLECTIONS) ||
    (category === 'shoes' && SHOE_COLLECTIONS) ||
    (category === 'knitwear-sweaters' && KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS) ||
    (category === 'trousers-jeans' && TROUSERS_AND_JEANS_COLLECTIONS) ||
    (category === 't-shirts-tops' && TSHIRTS_AND_TOPS_COLLECTIONS) ||
    (category === 'dresses-jumpsuits' && DRESSES_AND_JUMPSUITS_COLLECTIONS);

  const { loading, error, data } = useQuery(query as any);

  const products = data?.collection?.products?.edges || [];
  const productTypes = [
    'See all',
    ...new Set(products.map((edge: any) => edge.node.productType)),
  ];

  const uniqueColors = [
    ...new Set(
      products.flatMap((edge: any) =>
        edge.node.options
          .find((opt: any) => opt.name === 'Color')
          ?.values || []
      )
    ),
  ];

  const uniqueSizes = [
    ...new Set(
      products.flatMap((edge: any) =>
        edge.node.options
          .find((opt: any) => opt.name === 'Size')
          ?.values || []
      )
    ),
  ];

  const allPrices = products.map((edge: any) =>
    parseFloat(edge.node.variants.edges[0].node.price.amount)
  ).sort((a: any, b: any) => a - b);

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRanges = [
    {
      label: 'Low to High',
      type: 'sort',
      value: 'asc'
    },
    {
      label: 'High to Low',
      type: 'sort',
      value: 'desc'
    },
    {
      label: `Under ₹${Math.ceil(minPrice + 1000)}`,
      type: 'range',
      min: 0,
      max: Math.ceil(minPrice + 1000)
    },
    {
      label: `₹${Math.ceil(minPrice + 1000)} - ₹${Math.ceil(minPrice + 2000)}`,
      type: 'range',
      min: Math.ceil(minPrice + 1000),
      max: Math.ceil(minPrice + 2000)
    },
    {
      label: `₹${Math.ceil(minPrice + 2000)} - ₹${Math.ceil(maxPrice)}`,
      type: 'range',
      min: Math.ceil(minPrice + 2000),
      max: Math.ceil(maxPrice)
    },
    {
      label: `Above ₹${Math.ceil(maxPrice)}`,
      type: 'range',
      min: Math.ceil(maxPrice),
      max: Infinity
    }
  ];

  // Use useMemo to compute filtered products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (selectedCategory && selectedCategory !== 'See all') {
      filtered = filtered.filter((item: any) =>
        item.node.productType === selectedCategory
      );
    }

    if (selectedColor) {
      filtered = filtered.filter((item: any) => {
        const colorOption = item.node.options.find((opt: any) => opt.name === 'Color');
        return colorOption?.values.includes(selectedColor);
      });
    }

    if (selectedSize) {
      filtered = filtered.filter((item: any) => {
        const sizeOption = item.node.options.find((opt: any) => opt.name === 'Size');
        return sizeOption?.values.includes(selectedSize);
      });
    }

    if (selectedPriceRange) {
      filtered = filtered.filter((item: any) => {
        const price = parseFloat(item.node.variants.edges[0].node.price.amount);
        if (selectedPriceRange.type === 'sort') {
          return true;
        }
        return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      });

      if (selectedPriceRange.type === 'sort') {
        filtered.sort((a: any, b: any) => {
          const priceA = parseFloat(a.node.variants.edges[0].node.price.amount);
          const priceB = parseFloat(b.node.variants.edges[0].node.price.amount);
          return selectedPriceRange.value === 'asc' ? priceA - priceB : priceB - priceA;
        });
      }
    }

    return filtered;
  }, [products, selectedCategory, selectedColor, selectedSize, selectedPriceRange]);

  const handleApplyFilters = (
    category: string,
    color: string,
    size: string,
    priceRange: any
  ) => {
    setSelectedCategory(category);
    setSelectedColor(color);
    setSelectedSize(size);
    setSelectedPriceRange(priceRange);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory('See all');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedPriceRange(null);
  };

  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  const collection = data?.collection;

  return (
    <SafeAreaView style={styles.container}>
      <Header collection={collection} scrollY={scrollY} goBack={goBack} />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            isGridView={isGridView}
            onColorSelect={setSelectedColor}
            selectedColor={selectedColor}
          />
        )}
        keyExtractor={(item) => item.node.id}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={
          <>
            <CategoryList
              categories={productTypes}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ViewToggle
              isGridView={isGridView}
              setIsGridView={setIsGridView}
              setIsFilterOpen={setIsFilterOpen}
              resultsCount={filteredProducts.length}
            />
          </>
        }
        key={isGridView ? 'grid' : 'list'}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategory={selectedCategory}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedPriceRange={selectedPriceRange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        productTypes={productTypes}
        colors={uniqueColors}
        sizes={uniqueSizes}
        priceRanges={priceRanges}
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