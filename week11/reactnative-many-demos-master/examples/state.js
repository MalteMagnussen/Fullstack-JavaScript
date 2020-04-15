import React, { useState } from "react";
import { Button, Text, View } from "react-native";

Cafe = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate State in React with Hooks</Text>
    </View>
  );
}

//https://reactnative.dev/docs/touchableopacity
export default function StateScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>State Demo</Text>
      <Cafe />
    </View>
  );
}

