import { SERVER_URL } from "./settings";

ServerFacade = () => {
  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/geoapi/gamearea`).then((res) =>
      res.json()
    );
    return res.coordinates;
  }

  async function isUserInArea(lon, lat) {
    const status = await fetch(
      `${SERVER_URL}/geoapi/isuserinarea/${lon}/${lat}`
    ).then((res) => res.json());
    return status;
  }

  // {"userName":"team1", "password":"secret", "lat":3, "lon": 5,"distance": 3}
  async function findNearbyPlayers(userName, password, lat, lon, distance) {
    const status = await fetch(`${SERVER_URL}/gameapi/nearbyplayers`, {
      method: "post",
      body: JSON.stringify({ userName, password, lat, lon, distance }),
    }).then((res) => res.json());
    return status;
  }

  return {
    fetchGameArea,
    isUserInArea,
    findNearbyPlayers,
  };
};

export default ServerFacade();
