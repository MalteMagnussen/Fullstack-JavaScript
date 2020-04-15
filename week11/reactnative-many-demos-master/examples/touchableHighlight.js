import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, Text, View } from "react-native";



TouchableHighlightExample = () => {
    return (
      <View style={{  flex: 1, paddingTop: 22}}>
      <Text style={{fontSize: 18}}>Change me to demonstrate TouchableHiglight</Text>
      </View>
    );
  }

//https://reactnative.dev/docs/touchablehighlight
export default function TouchableHighlightScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>TouchableHighlight</Text>
      <TouchableHighlightExample />
    </View>
  );
}