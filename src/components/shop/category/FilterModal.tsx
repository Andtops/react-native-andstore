import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

interface PriceRange {
  label: string;
  type: 'sort' | 'range';
  value?: string;
  min?: number;
  max?: number;
}

type FilterModalProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  selectedColor: string;
  selectedSize: string;
  selectedPriceRange: PriceRange | null;
  onApplyFilters: (category: string, color: string, size: string, priceRange: PriceRange | null) => void;
  onClearFilters: () => void;
  productTypes: string[];
  colors: string[];
  sizes: string[];
  priceRanges: PriceRange[];
};

const FilterModal = ({
  isFilterOpen,
  setIsFilterOpen,
  selectedCategory,
  selectedColor,
  selectedSize,
  selectedPriceRange,
  onApplyFilters,
  onClearFilters,
  productTypes,
  colors,
  sizes,
  priceRanges,
}: FilterModalProps) => {
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempColor, setTempColor] = useState(selectedColor);
  const [tempSize, setTempSize] = useState(selectedSize);
  const [tempPriceRange, setTempPriceRange] = useState(selectedPriceRange);

  useEffect(() => {
    setTempCategory(selectedCategory);
    setTempColor(selectedColor);
    setTempSize(selectedSize);
    setTempPriceRange(selectedPriceRange);
  }, [isFilterOpen]);

  const handleApplyFilters = () => {
    onApplyFilters(tempCategory, tempColor, tempSize, tempPriceRange);
  };

  const handleClearFilters = () => {
    setTempCategory('See all');
    setTempColor('');
    setTempSize('');
    setTempPriceRange(null);
    onClearFilters();
  };

  const renderFilterSection = (
    title: string,
    data: any[],
    selectedValue: any,
    setSelectedValue: (value: any) => void,
    isPriceSection: boolean = false
  ) => (
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
                isPriceSection
                  ? selectedValue?.label === item.label && styles.selectedFilterChip
                  : selectedValue === item && styles.selectedFilterChip,
              ]}
              onPress={() => {
                if (isPriceSection) {
                  setSelectedValue(selectedValue?.label === item.label ? null : item);
                } else {
                  setSelectedValue(selectedValue === item ? '' : item);
                }
              }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  (isPriceSection ? selectedValue?.label === item.label : selectedValue === item) && styles.selectedFilterChipText
                ]}
              >
                {isPriceSection ? item.label : item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListContent}
        />
      </View>
    </View>
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (tempCategory) count++;
    if (tempColor) count++;
    if (tempSize) count++;
    if (tempPriceRange) count++;
    return count;
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
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.newInButton} onPress={handleApplyFilters}>
                  <Text style={styles.newInButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>

              {renderFilterSection('Type', productTypes, tempCategory, setTempCategory)}
              {renderFilterSection('Colour', colors, tempColor, setTempColor)}
              {renderFilterSection('Size', sizes, tempSize, setTempSize)}
              {renderFilterSection('Price', priceRanges, tempPriceRange, setTempPriceRange, true)}

              <TouchableOpacity
                style={styles.seeResultsButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.seeResultsText}>
                  SEE RESULTS ({getActiveFiltersCount()} FILTERS APPLIED)
                </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#E9ECEF',
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newInButton: {
    padding: 10,
    backgroundColor: '#212529',
    borderRadius: 20,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  newInButtonText: {
    color: '#FFFFFF',
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
    color: '#212529',
  },
  filterListContainer: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  filterListContent: {
    paddingHorizontal: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#212529',
    borderColor: '#212529',
  },
  filterChipText: {
    color: '#495057',
    fontSize: 14,
  },
  selectedFilterChipText: {
    color: '#FFFFFF',
  },
  seeResultsButton: {
    backgroundColor: '#212529',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeResultsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;