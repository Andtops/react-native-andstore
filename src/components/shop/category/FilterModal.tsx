import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
  } from 'react-native';
  import React from 'react';
  import { dummyCategories } from '../../../utils/dummyData';
  
  type FilterModalProps = {
    isFilterOpen: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCategory: string; // Pass selected category
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; // Pass setter function
  };
  
  // Filter data
  const colors = ['White', 'Red', 'Brown', 'Multicolor', 'Black'];
  const sizes = ['XS', 'XS-S', 'M', 'M-L', 'L'];
  const prices = ['Up to 10', 'Up to 20', 'Up to 30', 'Up to 40'];
  
  const FilterModal = ({
    isFilterOpen,
    setIsFilterOpen,
    selectedCategory,
    setSelectedCategory,
  }: FilterModalProps) => {
    // Extract category titles from dummyCategories
    const categoryTitles = dummyCategories.categories.map((category) => category.title);
  
    // Toggle selection for a filter item
    const toggleSelection = (item: string) => {
      setSelectedCategory(item); // Update the selected category
    };
  
    // Render a filter section
    const renderFilterSection = (title: string, data: string[]) => (
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>{title}</Text>
        <View style={styles.filterListContainer}>
          <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  selectedCategory === item && styles.selectedFilterChip, // Apply selected style
                ]}
                onPress={() => toggleSelection(item)} // Handle category selection
              >
                <Text style={styles.filterChipText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterListContent} // Add padding for better spacing
          />
        </View>
      </View>
    );
  
    // Clear all selections
    const clearAllSelections = () => {
      setSelectedCategory('See all'); // Reset selected category
    };
  
    return (
      <Modal
        visible={isFilterOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsFilterOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Clear and New In Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.clearButton} onPress={clearAllSelections}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.newInButton}>
                    <Text style={styles.newInButtonText}>Select Options</Text>
                  </TouchableOpacity>
                </View>
  
                {/* Filter Sections */}
                {renderFilterSection('Type', categoryTitles)}
                {renderFilterSection('Colour', colors)}
                {renderFilterSection('Size', sizes)}
                {renderFilterSection('Price', prices)}
  
                {/* See Results Button */}
                <TouchableOpacity style={styles.seeResultsButton}>
                  <Text style={styles.seeResultsText}>SEE RESULTS (946)</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
      backgroundColor: '#F8F9FA', // Light gray background for the modal
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      maxHeight: '80%', // Limit modal height
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    clearButton: {
      padding: 10,
      backgroundColor: '#E9ECEF', // Light gray background for the Clear button
      borderRadius: 20,
      flex: 1,
      marginRight: 8,
      alignItems: 'center',
    },
    clearButtonText: {
      color: '#495057', // Dark gray text for better readability
      fontSize: 14,
      fontWeight: 'bold',
    },
    newInButton: {
      padding: 10,
      backgroundColor: '#212529', // Dark gray background for the New In button
      borderRadius: 20,
      flex: 1,
      marginLeft: 8,
      alignItems: 'center',
    },
    newInButtonText: {
      color: '#FFFFFF', // White text for contrast
      fontSize: 14,
      fontWeight: 'bold',
    },
    filterSection: {
      marginBottom: 24,
    },
    filterSectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#212529', // Dark gray text for section titles
    },
    filterListContainer: {
      flexDirection: 'row', // Ensure the FlatList is laid out horizontally
      flexShrink: 1, // Allow the container to shrink if needed
    },
    filterListContent: {
      paddingHorizontal: 8, // Add horizontal padding for better spacing
    },
    filterChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#FFFFFF', // White background for filter chips
      borderWidth: 1,
      borderColor: '#E9ECEF', // Light gray border for a subtle look
      marginRight: 8,
    },
    selectedFilterChip: {
      backgroundColor: '#E9ECEF', // Light gray background for selected filter chips
      borderColor: '#212529', // Dark gray border for selected filter chips
    },
    filterChipText: {
      color: '#495057', // Dark gray text for filter chips
      fontSize: 14,
    },
    seeResultsButton: {
      backgroundColor: '#212529', // Dark gray background for the See Results button
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    seeResultsText: {
      color: '#FFFFFF', // White text for contrast
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default FilterModal;