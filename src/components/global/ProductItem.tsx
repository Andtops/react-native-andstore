import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProductItem = ({ item, isGridView } : any) => {
  const [selectedColor, setSelectedColor] = useState(item.attributes.color || '');
  const [selectedSize, setSelectedSize] = useState(item.attributes.size || '');

  return (
    <View style={[styles.productCard, { width: isGridView ? '48.3%' : '100%' }]}>
      <Image
        source={{ uri: item.images[0].file.url }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          )}
          <Text style={styles.discountedPrice}>₹{item.price}</Text>
        </View>

        {/* Color Selection */}
        <View style={styles.selectionContainer}>
          <View style={styles.colorOptions}>
            {(item.colors || []).map((color: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorOption,
                ]}
                onPress={() => setSelectedColor(color)}
              />
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
      aspectRatio: 2/3,
      backgroundColor: '#F5F5F5',
    },
    productInfo: {
      padding: moderateScale(8),
    },
    productName: {
      fontSize: moderateScale(13),
      marginBottom: verticalScale(8),
      fontFamily: "SFUIDisplay-Medium",
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
      marginBottom: verticalScale(8),
    },
    originalPrice: {
      fontSize: moderateScale(12),
      textDecorationLine: 'line-through',
      color: '#666',
    },
    discountedPrice: {
      fontSize: moderateScale(13),
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
      borderRadius: "100%",
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
      bottom: verticalScale(8),
      padding: moderateScale(5),
    },
    bagIcon: {
      width: moderateScale(18),
      height: verticalScale(18),
    },
  });

export default ProductItem;