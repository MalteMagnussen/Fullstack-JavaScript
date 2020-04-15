import React from 'react';
import { Text, View } from 'react-native';

Cafe = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basics of React Props</Text>
    </View>
  );
}

//https://reactnative.dev/docs/intro-react#props
export default function PropsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>PropsDemo</Text>
      <Cafe />
    </View>
  );
}

