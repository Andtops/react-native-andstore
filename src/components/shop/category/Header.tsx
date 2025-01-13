// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Header = ({ scrollY, goBack } : any) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [verticalScale(150), verticalScale(60)],
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

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
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
      <Animated.View style={[styles.condensedHeader, { opacity: condensedHeaderOpacity }]}>
        <Text style={styles.condensedTitle}>Sale up to 60% off</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    justifyContent: 'flex-start',
    zIndex: 1001,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    position: 'absolute',
    left: scale(16),
    top: verticalScale(20),
    zIndex: 1,
  },
  backIcon: {
    width: scale(24),
    height: verticalScale(24),
  },
  headerContent: {
    marginTop: verticalScale(50),
    marginLeft: scale(10),
  },
  headerTitle: {
    fontSize: moderateScale(27),
    fontFamily: 'SFUIDisplay-Medium',
  },
  promotionText: {
    fontSize: moderateScale(13),
    color: '#666',
    marginTop: verticalScale(25),
    fontFamily: 'SFUIDisplay-Medium',
  },
  condensedHeader: {
    position: 'absolute',
    left: scale(56),
    top: verticalScale(20),
  },
  condensedTitle: {
    fontSize: moderateScale(18),
    fontFamily: 'SFUIDisplay-Medium',
  },
});

export default Header;