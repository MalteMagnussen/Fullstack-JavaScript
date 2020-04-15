import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const MyLocation = () => {
  const [locationResult, setLocationResult] = useState(null);

  useEffect(() => {
    (async () => {
      await Permissions.askAsync(Permissions.LOCATION);
      setLocationResult(await Location.getCurrentPositionAsync({}));
    })();
  }, []);

  const ShowLocation = () => {
    return locationResult ? (
      <View>
        <Text>Your position is:</Text>
        <Text>Lat: {JSON.stringify(locationResult.coords.latitude)}</Text>
        <Text>Lon: {JSON.stringify(locationResult.coords.longitude)}</Text>
      </View>
    ) : (
      <View>
        <Text>Fetching Position</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ShowLocation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10, //Constants.statusBarHeight
  },
});

export default MyLocation;
