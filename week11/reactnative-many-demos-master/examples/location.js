import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

/**
 * These are the features we will implement.

* The app should show your current position, both in text and via an icon.

* The app should show the game area

* The app should allow us to zoom in on 
  the game area when "Show Game Area" is pressed

* When the button "Upload real Position" is pressed, 
  it should contact the server and verify whether
  you're inside the game area 
  (requires you to be located in that area for a real phone)
  To allow for easy testing, pressing anywhere on the map 
  (both outside and inside game-area) 
  should send the position to the server, 
  to check whether the position is inside the game area.
 */

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
