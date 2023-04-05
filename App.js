import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_KEY = '5e2bbaae24d8108adf7ce1a8';

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [conversionResult, setConversionResult] = useState(null);

  const convertCurrency = async () => {
    if (
      amount.trim() !== '' &&
      fromCurrency.trim() !== '' &&
      toCurrency.trim() !== ''
    ) {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );

      const data=await response.json();    
    console.log(data);

    if(data.result =='success'){
      setConversionResult(data.conversion_result)}
      else{
        setConversionResult('Error: Data connection error')
      }
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="From Currency (e.g., USD)"
        value={fromCurrency}
        onChangeText={setFromCurrency}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="To Currency (e.g., TRY)"
        value={toCurrency}
        onChangeText={setToCurrency}
        keyboardType="characters"
      />

      <TouchableOpacity onPress={convertCurrency} style={styles.button}>
        <Text>Convert </Text>
      </TouchableOpacity>
      <Text style={styles.result}>

      {typeof conversionResult === 'number'
      ?
      `${amount} ${fromCurrency.toUpperCase()} = ${conversionResult} ${toCurrency.toUpperCase()}
      ` : 
      conversionResult}
 
     </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  title:{
    marginBottom:15,
    fontWeight:'bold',
    color:'purple',
    fontSize:20,
  },
  result:{
    marginTop:20,
    fontSize:18,
  }
});
