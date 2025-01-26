import React, { FC, useRef, useState, useMemo, useCallback } from 'react';
import { FlatList, Animated, StyleSheet, Text, View, Image } from 'react-native';
import { goBack } from '../../../navigations/NavigationUtil';
import ProductItem from '../../global/ProductItem';
import FilterModal from './FilterModal';
import Header from '../../shop/category/Header';
import CategoryList from '../../shop/category/CategoryList';
import ViewToggle from '../../shop/category/ViewToggle';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_BY_HANDLE } from '../../../api/fetchCollections'; // Dynamic query
import { RouteProp } from '@react-navigation/native';
import Loader from '../../global/Loader';

// Define types for GraphQL data
interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  featuredImage: {
    url: string;
  };
  options: {
    name: string;
    values: string[];
  }[];
  images: {
    edges: {
      node: {
        url: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        compareAtPrice: {
          amount: string;
        };
        price: {
          amount: string;
        };
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
}

interface Collection {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
  products: {
    edges: {
      node: Product;
    }[];
  };
}

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

  // Validate the category prop
  if (!category || typeof category !== 'string') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid category.</Text>
      </View>
    );
  }

  // Debug the category prop

  // Fetch collection data using a dynamic query
  const { loading, error, data } = useQuery<{ collection: Collection }>(GET_COLLECTION_BY_HANDLE, {
    variables: { handle: category },
  });

  const products = data?.collection?.products?.edges || [];
  const productTypes = useMemo(() => [
    'See all',
    ...new Set(products.map((edge) => edge.node.productType)),
  ], [products]);

  const uniqueColors = useMemo(() => [
    ...new Set(
      products.flatMap((edge) =>
        edge.node.options.find((opt) => opt.name === 'Color')?.values || []
      )
    ),
  ], [products]);

  const uniqueSizes = useMemo(() => [
    ...new Set(
      products.flatMap((edge) =>
        edge.node.options.find((opt) => opt.name === 'Size')?.values || []
      )
    ),
  ], [products]);

  const priceRanges = useMemo(() => {
    const allPrices = products.map((edge) =>
      parseFloat(edge.node.variants.edges[0].node.price.amount)
    ).sort((a, b) => a - b);

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    return [
      { label: 'Low to High', type: 'sort', value: 'asc' },
      { label: 'High to Low', type: 'sort', value: 'desc' },
      { label: `Under ₹${Math.ceil(minPrice + 1000)}`, type: 'range', min: 0, max: Math.ceil(minPrice + 1000) },
      { label: `₹${Math.ceil(minPrice + 1000)} - ₹${Math.ceil(minPrice + 2000)}`, type: 'range', min: Math.ceil(minPrice + 1000), max: Math.ceil(minPrice + 2000) },
      { label: `₹${Math.ceil(minPrice + 2000)} - ₹${Math.ceil(maxPrice)}`, type: 'range', min: Math.ceil(minPrice + 2000), max: Math.ceil(maxPrice) },
      { label: `Above ₹${Math.ceil(maxPrice)}`, type: 'range', min: Math.ceil(maxPrice), max: Infinity },
    ];
  }, [products]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let filtered = [...products];

    if (selectedCategory !== 'See all') {
      filtered = filtered.filter((item) => item.node.productType === selectedCategory);
    }

    if (selectedColor) {
      filtered = filtered.filter((item) => {
        const colorOption = item.node.options.find((opt) => opt.name === 'Color');
        return colorOption?.values.includes(selectedColor);
      });
    }

    if (selectedSize) {
      filtered = filtered.filter((item) => {
        const sizeOption = item.node.options.find((opt) => opt.name === 'Size');
        return sizeOption?.values.includes(selectedSize);
      });
    }

    if (selectedPriceRange) {
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.node.variants.edges[0].node.price.amount);
        if (selectedPriceRange.type === 'sort') return true;
        return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      });

      if (selectedPriceRange.type === 'sort') {
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.node.variants.edges[0].node.price.amount);
          const priceB = parseFloat(b.node.variants.edges[0].node.price.amount);
          return selectedPriceRange.value === 'asc' ? priceA - priceB : priceB - priceA;
        });
      }
    }

    return filtered;
  }, [products, selectedCategory, selectedColor, selectedSize, selectedPriceRange]);

  const handleApplyFilters = useCallback((
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
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory('See all');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedPriceRange(null);
  }, []);

  if (loading) return <Loader />;
  if (error) return <Text style={{color: "red", textAlign: "center", width:"50%", margin: "auto"}}>Error: {error.message}</Text>;

  const collection = data?.collection;

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../../assets/images/no-product.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No Products Found</Text>
      <Text style={styles.emptySubText}>
        Try adjusting your filters or check back later for new arrivals.
      </Text>
    </View>
  );

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
        ListEmptyComponent={renderEmptyComponent}
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
        //@ts-ignore
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  emptyImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: moderateScale(20),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: moderateScale(10),
  },
  emptySubText: {
    fontSize: moderateScale(14),
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductCategoryList;