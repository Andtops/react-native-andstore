import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { ChevronLeft, Heart, LucideBike, Share2, ShoppingBag, Store } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { goBack } from '../../../navigations/NavigationUtil';
import Shimmer from '../../global/Shimmer';
import Share from 'react-native-share';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');

interface ProductDetailsProps {
  route: {
    params: {
      product: {
        id: string;
        title: string;
        handle: string;
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
              price: {
                amount: string;
              };
              compareAtPrice: {
                amount: string;
              };
            };
          }[];
        };
        options: {
          name: string;
          values: string[];
        }[];
      };
    };
  };
}

const ProductDetails = ({ route }: ProductDetailsProps) => {
  const { product } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const sizeSheetRef = useRef<BottomSheet>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSizeSheetVisible, setIsSizeSheetVisible] = useState(false);

  // State to track the dominant color of the current image
  const [dominantColor, setDominantColor] = useState<'light' | 'dark'>('light');

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePressButton = () => {
    goBack();
  };

  const productImages = product.images.edges.map((edge, index) => ({
    id: index + 1,
    uri: edge.node.url,
  }));

  const renderItem = ({ item }: { item: { uri: string } }) => (
    <View style={styles.slideImage}>
      {!imageLoaded && <Shimmer />}
      <Image
        source={{ uri: item.uri }}
        style={[styles.slideImage, { display: imageLoaded ? 'flex' : 'none' }]}
        resizeMode="cover"
        onLoad={() => {
          setImageLoaded(true);
          // Simulate detecting dominant color (for now, assume light or dark)
          // You can replace this with a proper image color detection library
          const isDark = Math.random() > 0.5; // Randomly set dark or light
          setDominantColor(isDark ? 'light' : 'dark');
        }}
      />
    </View>
  );

  const handleShare = async () => {
    try {
      const productLink = `https://andstoreee.myshopify.com/products/${product.handle}`;
      const shareOptions = {
        title: 'Share Product',
        message: `Check out this product: ${product.title}\n${productLink}`,
      };
      await Share.open(shareOptions);
    } catch (error) {
      Alert.alert('Error', 'Failed to share the product link.');
    }
  };

  const handleSelectSize = () => {
    setIsSizeSheetVisible(true);
    sizeSheetRef.current?.expand();
  };

  // Extract sizes and shoe fit options from product options
  const sizeOptions = product.options.find(option => option.name === 'Size')?.values || [];
  const shoeFitOptions = product.options.find(option => option.name === 'Shoe fit')?.values || [];

  const SizeSelectionSheet = () => (
    <BottomSheet
      ref={sizeSheetRef}
      snapPoints={['30%', '60%']}
      index={0}
      enablePanDownToClose
      containerStyle={{ zIndex: 11 }}
      onClose={() => setIsSizeSheetVisible(false)}
    >
      <BottomSheetView style={styles.sizeSheetContent}>
        {/* Display Size options if available */}
        {sizeOptions.length > 0 && (
          <>
            <Text style={styles.sizeSheetTitle}>Select Size</Text>
            <View style={styles.sizeGrid}>
              {sizeOptions.map((size) => (
                <TouchableOpacity key={size} style={styles.sizeButton}>
                  <Text style={styles.sizeButtonText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Display Shoe fit options if available */}
        {shoeFitOptions.length > 0 && (
          <>
            <Text style={styles.sizeSheetTitle}>Select Shoe Fit</Text>
            <View style={styles.sizeGrid}>
              {shoeFitOptions.map((fit) => (
                <TouchableOpacity key={fit} style={styles.sizeButton}>
                  <Text style={styles.sizeButtonText}>{fit}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );

  // Determine icon color based on dominant color
  const iconColor = dominantColor === 'dark' ? '#fff' : '#000';

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Blur Background when Size Sheet is Visible */}
        {isSizeSheetVisible && (
          <BlurView
            style={styles.blurView}
            blurType="dark" // You can change this to 'light' or 'xlight'
            blurAmount={10} // Adjust the blur intensity
            reducedTransparencyFallbackColor="white"
          />
        )}

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handlePressButton}>
            <ChevronLeft size={24} color={iconColor} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <ShoppingBag size={22} color={iconColor} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <Share2 size={22} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <Carousel
            loop
            vertical
            width={width}
            height={height * 0.839}
            autoPlay={false}
            data={productImages}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={renderItem}
            //@ts-ignore
            mode="stack"
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                    height: currentIndex === index ? 12 : 8,
                  },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['16%', '90%']}
          containerStyle={{ zIndex: 10 }}
          index={0}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.topContainer}>
              <View style={styles.title_price}>
                <Text style={styles.title_text}>{product.title}</Text>
                <Text style={styles.price_text}>₹{product.variants.edges[0]?.node.price.amount}</Text>
              </View>

              <View style={styles.selectionRow}>
                <View style={styles.thumbnailsContainer}>
                  {productImages.slice(0, 2).map((image, index) => (
                    <View key={image.id} style={styles.thumbnailContainer}>
                      <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                    </View>
                  ))}
                  <View style={styles.moreImages}>
                    <Text style={styles.moreImagesText}>+{productImages.length - 2}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.selectButton} onPress={handleSelectSize}>
                  <Text style={styles.selectButtonText}>SELECT SIZE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>Pay in interest-free installments</Text>
              <Text style={styles.paymentDescription}>
                Pay in 3 interest-free payments on purchases from £30-£2,000 with PayPal. Click to learn more
              </Text>
            </View>

            <View style={styles.deliverySection}>
              <View style={styles.deliveryOption}>
                <View style={styles.deliveryIconContainer}>
                  <Store style={styles.deliveryIcon} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Collection in-store</Text>
                  <Text style={styles.deliveryFree}>FREE</Text>
                </View>
              </View>

              <View style={styles.deliveryOption}>
                <View style={styles.deliveryIconContainer}>
                  <LucideBike style={styles.deliveryIcon} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Standard home delivery</Text>
                  <Text style={styles.deliverySubtext}>You need £9.01 more to be eligible</Text>
                  <Text style={styles.deliveryFree}>FREE</Text>
                </View>
              </View>
            </View>

            <View style={styles.membershipSection}>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipBadgeText}>ANDSTORE MMBRS</Text>
              </View>
              <Text style={styles.cashbackText}>Get 2% cashback</Text>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>About this product</Text>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Materials, care and source</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Deliveries and returns</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>

        {/* Size Selection Bottom Sheet */}
        {isSizeSheetVisible && <SizeSelectionSheet />}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 11, // Ensure it's below the size sheet but above other content
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingVertical: 5,
    position: 'absolute',
    top: 45,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
  },
  headerButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#000',
    borderRadius: 10,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600',
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  slideImage: {
    width,
    height: height * 0.84,
    backgroundColor: '#f5f5f5',
  },
  paginationContainer: {
    position: 'absolute',
    right: 26,
    top: '50%',
    transform: [{ translateY: -50 }],
    gap: 20,
  },
  paginationDot: {
    width: 2,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topContainer: {
    gap: 16,
  },
  title_price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  title_text: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  price_text: {
    fontFamily: 'SFUIDisplay-Bold',
    fontSize: 16,
    color: '#000000',
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: 48,
    height: 58,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  moreImages: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  moreImagesText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  selectButton: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  paymentSection: {
    marginVertical: 24,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  deliverySection: {
    marginBottom: 24,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deliveryIcon: {
    width: 24,
    height: 24,
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  deliverySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deliveryFree: {
    position: 'absolute',
    right: 0,
    color: '#00A878',
    fontWeight: '600',
  },
  membershipSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  membershipBadge: {
    backgroundColor: '#FF4D4D',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 12,
  },
  membershipBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  cashbackText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  aboutSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionButtonText: {
    fontSize: 16,
  },
  sizeSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sizeSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sizeButton: {
    width: '30%',
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetails;