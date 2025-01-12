import { View, Text, Dimensions, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import { MoveRight } from 'lucide-react-native';
import { dummyProducts } from '../../../utils/dummyData';

const { height } = Dimensions.get('window');

const ProductList = () => {
  const renderItems = ({ item }: any) => {
    return (
      <View style={styles.productBox}>
        <Image 
          source={{ uri: item.images[0].file.url }} // Use { uri: URL } for remote images
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
        <View style={styles.productInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}> <MoveRight size={35} color="#000" /> You might be interested</Text>
        </View>
      </View>
      <View style={styles.productCarousel}>
        <FlatList 
          data={dummyProducts.products}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          horizontal={true} // Horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: height * 0.61,
  },
  header: {
    padding: 16,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 33,
    textTransform: "uppercase",
    fontFamily: "SFUIDisplay-Bold",
    color: "#000",
    paddingLeft: 10,
    letterSpacing: 1,
  },
  productCarousel: {
    flex: 1, // Use flex to take remaining space
    backgroundColor: "#fff",
  },
  productBox: {
    width: 210, // Set a proper width for each item
    height: 330, // Set a proper height for each item
    backgroundColor: "#fff",
    marginRight: 5, // Add margin between items
  },
  productInfo:{
    padding: 5
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Bold',
    color: '#000', // Red color
    textTransform: 'uppercase', // Uppercase text
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: 'SFUIDisplay-Regular',
    color: 'red', // Red color
    textTransform: 'uppercase', // Uppercase text
  }
});

export default ProductList;