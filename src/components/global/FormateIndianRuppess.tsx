import React from 'react';
import { Text, TextStyle } from 'react-native';

interface FormatIndianRupeesProps {
  amount: number | string;
  style?: TextStyle;
  showSymbol?: boolean;
}

const FormatIndianRupees: React.FC<FormatIndianRupeesProps> = ({
  amount,
  style,
  showSymbol = true,
}) => {
  const formatAmount = (value: number | string): string => {
    // Convert string to number if needed
    const numericAmount = typeof value === 'string' ? parseFloat(value) : value;

    // Handle invalid numbers
    if (isNaN(numericAmount)) {
      return '0';
    }

    // Convert to string and split into integer and decimal parts
    const [integerPart, decimalPart] = numericAmount.toFixed(2).split('.');

    // Format integer part with Indian numbering system
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    const formattedInteger = otherNumbers
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
      : lastThree;

    // Combine with decimal part
    const formattedAmount = `${formattedInteger}.${decimalPart}`;

    // Add rupee symbol if showSymbol is true
    return showSymbol ? `₹${formattedAmount}` : formattedAmount;
  };

  return <Text style={style}>{formatAmount(amount)}</Text>;
};

export default FormatIndianRupees;
