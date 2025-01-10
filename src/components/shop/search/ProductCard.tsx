import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';

const ProductCard = ({ product } : any) => {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: product.images[0].file.url }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <TouchableOpacity>
            <Heart 
              style={styles.heartIcon}
              size={14}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>₹{product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '49.3%',
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    aspectRatio: 2/3,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    marginTop: 8,
    paddingHorizontal: 10
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 12,
    flex: 1,
    fontFamily: "SFUIDisplay-Medium"
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  }
});

export default ProductCard;