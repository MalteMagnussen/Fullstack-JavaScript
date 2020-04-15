import React, { Component, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

PizzaTranslator = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate how to handle Text Inputs</Text>
    </View>
  );
}


//https://reactnative.dev/docs/handling-text-input
export default function TextInputScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>TextInput Demo</Text>
      <PizzaTranslator />
    </View>
  );
}