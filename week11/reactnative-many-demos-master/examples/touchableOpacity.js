import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

TouchableOpacityExample = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate TouchableOpacity</Text>
    </View>
  );
}


//https://reactnative.dev/docs/touchableopacity
export default function TouchableOpacityScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TouchableOpacity Demo</Text>
      <TouchableOpacityExample />
    </View>
  );
}