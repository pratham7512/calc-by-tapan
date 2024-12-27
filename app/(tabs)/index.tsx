import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Calculator = () => {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value: string) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const calculateResult = () => {
    try {
      setExpression(eval(expression).toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const clearExpression = () => {
    setExpression("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.calculatorContainer}>
        {/* Calculator Display */}
        <View style={styles.display}>
          <Text style={styles.displayText}>
            {expression || "0"}
          </Text>
        </View>

        {/* Calculator Buttons */}
        <View style={styles.buttonGrid}>
          {/* Top Row */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.redButton]} onPress={clearExpression}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("%")}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("+")}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => {
              setExpression((prev) => prev.slice(0, -1));
            }}>
              <Text style={styles.buttonText}>⌫</Text>
            </TouchableOpacity>
          </View>

          {/* Number Pad */}
          {[
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3],
            [0, '.', '=']
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.button,
                    num === '=' ? styles.greenButton : styles.lightGrayButton
                  ]}
                  onPress={() => num === '=' ? calculateResult() : handleButtonClick(num.toString())}
                >
                  <Text style={styles.buttonText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footerText}>Calc by shrusti</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  display: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  displayText: {
    color: 'black',
    fontSize: 48,
    textAlign: 'right',
    fontWeight: '300',
  },
  buttonGrid: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
  },
  redButton: {
    backgroundColor: '#FF4C4C',
  },
  greenButton: {
    backgroundColor: '#4CAF50',
  },
  lightGrayButton: {
    backgroundColor: '#E0E0E0',
  },
  grayButton: {
    backgroundColor: '#B0B0B0',
  },
  orangeButton: {
    backgroundColor: '#FF9F0A',
  },
  footerText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
});

export default Calculator;
