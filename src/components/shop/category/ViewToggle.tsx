// components/ViewToggle.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Grid, List, SlidersHorizontal } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ViewToggle = ({ isGridView, setIsGridView, setIsFilterOpen } : any) => {
  return (
    <View style={styles.viewToggleContainer}>
      <View style={styles.viewToggle}>
        <TouchableOpacity
          onPress={() => setIsGridView(true)}
          style={[styles.toggleButton, isGridView && styles.activeToggle]}>
          <Grid style={styles.toggleIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsGridView(false)}
          style={[styles.toggleButton, !isGridView && styles.activeToggle]}>
          <List style={styles.toggleIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.resultsText}>950 results</Text>
      <TouchableOpacity onPress={() => setIsFilterOpen(true)}>
        <SlidersHorizontal style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(16),
  },
  viewToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: moderateScale(4),
  },
  toggleButton: {
    padding: moderateScale(8),
  },
  activeToggle: {
    backgroundColor: '#F5F5F5',
  },
  toggleIcon: {
    width: moderateScale(20),
    height: verticalScale(20),
  },
  resultsText: {
    color: '#666',
    fontSize: moderateScale(14),
    fontFamily: 'SFUIDisplay-Bold',
  },
  filterIcon: {
    width: moderateScale(15),
    height: verticalScale(15),
  },
});

export default ViewToggle;