import React, { useCallback, useRef, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { ChevronLeft, Heart, LucideBike, Share2, ShoppingBag, Store } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from "react-native-reanimated-carousel"
import { goBack } from "../../../navigations/NavigationUtil"

const { width, height } = Dimensions.get("window")

const ProductDetails = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const handlePressButton = () => {
    goBack()
  }

  const productImages = [
    {
      id: 1,
      uri: "https://21fxem8rvczah5vb-73402810605.shopifypreview.com/cdn/shop/files/1.webp?v=1736931930&width=600",
    },
    {
      id: 2,
      uri: "https://21fxem8rvczah5vb-73402810605.shopifypreview.com/cdn/shop/files/2.webp?v=1736931930&width=600",
    },
    {
      id: 3,
      uri: "https://21fxem8rvczah5vb-73402810605.shopifypreview.com/cdn/shop/files/3.webp?v=1736931930&width=600",
    },
    {
      id: 4,
      uri: "https://21fxem8rvczah5vb-73402810605.shopifypreview.com/cdn/shop/files/4.webp?v=1736931930&width=600",
    },
  ]

  const renderItem = ({ item }: { item: { uri: string } }) => (
    <Image source={{ uri: item.uri }} style={styles.slideImage} resizeMode="cover" />
  )

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handlePressButton}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <ShoppingBag size={22} color="#000" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Share2 size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <Carousel
            loop
            vertical
            width={width}
            height={height * 0.9}
            autoPlay={false}
            data={productImages}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={renderItem}
            mode="stack" // Add this line for stack-cards animation
          />

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: currentIndex === index ? "#fff" : "rgba(255, 255, 255, 0.3)",
                    height: currentIndex === index ? 12 : 8, // Change height for active dot
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
          snapPoints={["16%", "90%"]}
          index={0}
          containerStyle={{ zIndex: 1000 }}
        >
          <BottomSheetView style={styles.contentContainer}>
          <View style={styles.topContainer}>
              <View style={styles.title_price}>
                <Text style={styles.title_text}>
                  Ripped wide-leg '90s jeans
                </Text>
                <Text style={styles.price_text}>£29.99</Text>
              </View>

              <View style={styles.selectionRow}>
                <View style={styles.thumbnailsContainer}>
                  {productImages.slice(0, 2).map((image, index) => (
                    <View key={image.id} style={styles.thumbnailContainer}>
                      <Image
                        source={{uri: image.uri}}
                        style={styles.thumbnail}
                      />
                    </View>
                  ))}
                  <View style={styles.moreImages}>
                    <Text style={styles.moreImagesText}>+2</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.selectButton}>
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
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingVertical: 5,
    position: "absolute",
    top: 45,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "center",
    gap: 22,
    // backgroundColor: 'red',
  },
  headerButton: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#000",
    borderRadius: 10,
    minWidth: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "600",
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  slideImage: {
    width,
    height: height * 0.9,
    backgroundColor: "#f5f5f5",
  },
  paginationContainer: {
    position: "absolute",
    right: 26,
    top: "50%",
    transform: [{ translateY: -50 }],
    gap: 8,
  },
  paginationDot: {
    width: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  completeLabel: {
    position: "absolute",
    bottom: 24,
    left: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  completeLabelText: {
    fontSize: 14,
    fontWeight: "600",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
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
    marginVertical: 24
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066CC",
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  deliverySection: {
    marginBottom: 24,
  },
  deliveryOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  deliveryIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "600",
  },
  deliverySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  deliveryFree: {
    position: "absolute",
    right: 0,
    color: "#00A878",
    fontWeight: "600",
  },
  membershipSection: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  membershipBadge: {
    backgroundColor: "#FF4D4D",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 12,
  },
  membershipBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  cashbackText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  aboutSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  sectionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  sectionButtonText: {
    fontSize: 16,
  },
})

export default ProductDetails

