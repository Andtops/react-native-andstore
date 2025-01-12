import { ChevronLeft, Filter, Grid, List, ShoppingBag } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goBack } from '../../../navigations/NavigationUtil';
import { dummyProducts } from '../../../utils/dummyData';

const categories = ['See all', 'Trousers and jeans', 'Jackets & Coats', 'Knitwear'];

const ProductCategoryList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isGridView, setIsGridView] = useState(true);

  // Animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [150, 60],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const condensedHeaderOpacity = scrollY.interpolate({
    inputRange: [0, 35, 50],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const renderProductItem = ({ item } : any) => (
    <View style={[styles.productCard, { width: isGridView ? '48.3%' : '100%' }]}>
      <Image
        source={{ uri: item.images[0].file.url }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingBag style={styles.bagIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              index === 0 && styles.activeCategoryChip,
            ]}
          >
            <Text style={[
              styles.categoryText,
              index === 0 && styles.activeCategoryText,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      />

      {/* View Toggle and Results */}
      <View style={styles.viewToggleContainer}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            onPress={() => setIsGridView(true)}
            style={[styles.toggleButton, isGridView && styles.activeToggle]}
          >
            <Grid style={styles.toggleIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsGridView(false)}
            style={[styles.toggleButton, !isGridView && styles.activeToggle]}
          >
            <List style={styles.toggleIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.resultsText}>950 results</Text>
        <TouchableOpacity>
          <Filter style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <ChevronLeft style={styles.backIcon} />
        </TouchableOpacity>
        
        {/* Regular Header */}
        <Animated.View style={[styles.headerContent, { opacity: headerTitleOpacity }]}>
          <Text style={styles.headerTitle}>Sale up to 60% off</Text>
          <Text style={styles.promotionText}>
            Promotion available from 25/12/2024 until 14/02/2025 on selected items.
          </Text>
        </Animated.View>

        {/* Condensed Header */}
        <Animated.View 
          style={[
            styles.condensedHeader,
            { opacity: condensedHeaderOpacity }
          ]}
        >
          <Text style={styles.condensedTitle}>Sale up to 60% off</Text>
        </Animated.View>
      </Animated.View>

      {/* Main Content */}
      <FlatList
        data={dummyProducts.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={renderHeader}
        key={isGridView ? 'grid' : 'list'} // Force re-render when numColumns changes
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerContent: {
    marginTop: 50,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "SFUIDisplay-Medium",
  },
  promotionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontFamily: "PlayfairDisplay-Medium",
  },
  condensedHeader: {
    position: 'absolute',
    left: 56,
    top: 20,
  },
  condensedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
  },
  toggleButton: {
    padding: 8,
  },
  activeToggle: {
    backgroundColor: '#F5F5F5',
  },
  toggleIcon: {
    width: 20,
    height: 20,
  },
  resultsText: {
    color: '#666',
    fontWeight: 'bold',
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  productsContainer: {
    paddingHorizontal: 5,
    gap: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
  },
  productImage: {
    width: '100%',
    aspectRatio: 2/3,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    padding: 8,
  },
  exclusiveTag: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  discount: {
    fontSize: 14,
    color: '#FF0000',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  addToCartButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    padding: 8,
  },
  bagIcon: {
    width: 24,
    height: 24,
  },
});

export default ProductCategoryList;