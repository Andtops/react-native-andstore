// ProductCategoryList.js
import React, {useRef, useState} from 'react';
import {View, FlatList, Animated, StyleSheet} from 'react-native';
import {goBack} from '../../../navigations/NavigationUtil';
import {dummyProducts} from '../../../utils/dummyData';
import ProductItem from '../../global/ProductItem';
import FilterModal from './FilterModal';
import Header from '../../shop/category/Header';
import CategoryList from '../../shop/category/CategoryList';
import ViewToggle from '../../shop/category/ViewToggle';
import {moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProductCategoryList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderHeader = () => (
    <>
      <CategoryList />
      <ViewToggle
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header scrollY={scrollY} goBack={goBack} />
      <FlatList
        data={dummyProducts.saleProducts}
        renderItem={({item}) => (
          <ProductItem item={item} isGridView={isGridView} />
        )}
        keyExtractor={item => item.id}
        numColumns={isGridView ? 2 : 1}
        contentContainerStyle={styles.productsContainer}
        ListHeaderComponent={renderHeader}
        key={isGridView ? 'grid' : 'list'}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      <FilterModal
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
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
    paddingHorizontal: moderateScale(5),
  },
});

export default ProductCategoryList;
