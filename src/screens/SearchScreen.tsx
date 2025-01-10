import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/shop/search/SearchBar';
import RecommendationsSection from '../components/shop/search/RecommendationSection';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <SearchBar />
      <RecommendationsSection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontFamily: "SFUIDisplay-Bold",
    padding: 16
  }
});

export default SearchScreen;