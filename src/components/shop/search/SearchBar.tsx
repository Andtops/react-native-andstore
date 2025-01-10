import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SearchIcon, ScanLine } from 'lucide-react-native';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <SearchIcon 
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for products"
          style={styles.searchInput}
          placeholderTextColor={"#aaa"}
        />
      </View>
      <TouchableOpacity style={styles.scannerButton}>
        <ScanLine 
          size={20}
          style={styles.scannerIcon}
        />
        <Text style={styles.scannerText}>Scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: "#ccc",
    borderWidth: 1
  },
  searchIcon: {
    width: 20,
    height: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#000"
  },
  scannerButton: {
    alignItems: 'center',
  },
  scannerIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  scannerText: {
    fontSize: 11,
    fontFamily: "SFUIDisplay-Bold"
  }
});

export default SearchBar;