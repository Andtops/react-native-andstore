import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Shimmer = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.shimmerContainer}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerContainer: {
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
});

export default Shimmer;