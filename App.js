import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInput('');
    } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'cot') {
      // Append trigonometric function with an opening parenthesis
      setInput((prevInput) => prevInput + value + '(');
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const calculateResult = () => {
    try {
      const sanitizedInput = input
        .replace(/cot\(/g, '1/Math.tan(') // Replace cot with 1/tan
        .replace(/\^/g, '**'); // Replace '^' with '**' for exponentiation (JS uses '**')
      const result = eval(sanitizedInput.replace(/sin|cos|tan/g, (func) => `Math.${func}`));
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input || '0'}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* First Row */}
        <View style={styles.buttonRow}>
          {['7', '8', '9', '/'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Second Row */}
        <View style={styles.buttonRow}>
          {['4', '5', '6', '*'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Third Row */}
        <View style={styles.buttonRow}>
          {['1', '2', '3', '-'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fourth Row */}
        <View style={styles.buttonRow}>
          {['0', '.', '=', '+'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trigonometric and Exponentiation Buttons */}
        <View style={styles.buttonRow}>
          {['sin', 'cos', 'tan', 'cot'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Parentheses and Exponentiation Buttons */}
        <View style={styles.buttonRow}>
          {['(', ')', '^', 'C'].map((value) => (
            <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1e596',
    justifyContent: 'center',
  },
  displayContainer: {
    flex: 1,
    backgroundColor: '#6f9790',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 48,
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#333',
    backgroundColor: '#c3a6df',
  },
  buttonText: {
    color: '#black',
    fontSize: 24,
  },
});
