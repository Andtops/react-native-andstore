import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProductItem = ({ item, isGridView, onColorSelect, selectedColor }: any) => {
  const product = item.node;

  const handleColorSelect = (color: string) => {
    onColorSelect(color === selectedColor ? '' : color);
  };

  const imageUrl = product.featuredImage?.url || 'https://via.placeholder.com/150';
  const price = product.variants.edges[0]?.node.price?.amount || 'N/A';
  const compareAtPrice = product.variants.edges[0]?.node.compareAtPrice?.amount || null;

  return (
    <View style={[styles.productCard, { width: isGridView ? '48.3%' : '100%' }]}>
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

        <View style={styles.selectionContainer}>
          <View style={styles.colorOptions}>
            {product.options?.map((option: any) => (
              option.name === 'Color' && option.values.map((color: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.toLowerCase() },
                    selectedColor === color && styles.selectedColorOption,
                  ]}
                  onPress={() => handleColorSelect(color)}
                />
              ))
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartButton}>
          <ShoppingBag style={styles.bagIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: moderateScale(3),
    marginBottom: verticalScale(16),
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
    marginBottom: verticalScale(8),
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
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  addToCartButton: {
    position: 'absolute',
    right: moderateScale(8),
    bottom: verticalScale(10),
    padding: moderateScale(5),
  },
  bagIcon: {
    width: moderateScale(14),
    height: verticalScale(14),
  },
});

export default ProductItem;