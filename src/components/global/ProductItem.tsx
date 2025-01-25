import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient'; // For gradient background
import { push } from '../../navigations/NavigationUtil';

const handlePressButton = () => {
  push('ProductDetails')
}

const ProductItem = ({ item, isGridView }: any) => {
  const product = item.node;

  const imageUrl = product.featuredImage?.url || 'https://via.placeholder.com/150';
  const price = product.variants.edges[0]?.node.price?.amount || 'N/A';
  const compareAtPrice = product.variants.edges[0]?.node.compareAtPrice?.amount || null;

  // Check if the product has a MultiColor option
  const hasMultiColor = product.options?.some(
    (option: any) => option.name === 'Color' && option.values.includes('Multicolor')
  );

  return (
    <TouchableOpacity style={[styles.productCard, { width: isGridView ? '48.3%' : '100%' }]}
    onPress={handlePressButton}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productName}>{product.title}</Text>
        <View style={styles.priceContainer}>
          {compareAtPrice && (
            <Text style={styles.originalPrice}>₹{compareAtPrice}</Text>
          )}
          <Text style={styles.discountedPrice}>₹{price}</Text>
        </View>

        {/* Display available colors or gradient for MultiColor */}
        <View style={styles.selectionContainer}>
          <View style={styles.colorOptions}>
            {hasMultiColor ? (
              // Render gradient for MultiColor as a circle
              <LinearGradient
                colors={['#FF0000', '#00FF00', '#0000FF']} // Example gradient colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientColorOption}
              />
            ) : (
              // Render individual color circles
              product.options?.map((option: any) => (
                option.name === 'Color' && option.values.map((color: string, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color.toLowerCase() },
                    ]}
                  />
                ))
              ))
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingBag size={scale(18)} style={styles.bagIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: moderateScale(3),
  },
  productImage: {
    width: '100%',
    aspectRatio: 4 / 6,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    padding: moderateScale(8),
  },
  productName: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(3),
    fontFamily: 'SFUIDisplay-Medium',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  originalPrice: {
    fontSize: moderateScale(11),
    textDecorationLine: 'line-through',
    color: '#666',
  },
  discountedPrice: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: '#FF0000',
  },
  selectionContainer: {
    marginBottom: verticalScale(0),
  },
  selectionLabel: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  colorOptions: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  colorOption: {
    width: moderateScale(13),
    height: verticalScale(13),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  gradientColorOption: {
    width: moderateScale(13), // Same as colorOption
    height: verticalScale(13), // Same as colorOption
    borderRadius: moderateScale(13) / 2, // Half of width/height to make it circular
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  addToCartButton: {
    position: 'absolute',
    right: moderateScale(8),
    top: verticalScale(20),
    padding: moderateScale(5),
  },
  bagIcon: {
    width: moderateScale(1),
    height: verticalScale(1),
  },
});

export default ProductItem