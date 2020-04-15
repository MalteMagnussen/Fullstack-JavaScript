import React from 'react';
import { View, Text } from 'react-native';

FlexDirectionBasics = () => {
  return (
    <View style={{  flex: 1, paddingTop: 22}}>
    <Text style={{fontSize: 18}}>Change me to demonstrate basics of FlexDirection</Text>
    </View>
  );
}

//https://reactnative.dev/docs/flexbox#flex-direction
export default function FlexDirectionScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:24}}>Flex Direction</Text>
      <FlexDirectionBasics />
    </View>
  );
}