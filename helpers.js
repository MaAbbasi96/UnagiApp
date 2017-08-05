export function getUniqueID() {
    return new Promise((resolve, reject)=>{
        var DeviceInfo = require("react-native-device-info");
        var uniqueID = DeviceInfo.getUniqueID();
        if (uniqueID.length === 16)
            uniqueID += uniqueID;
        resolve(uniqueID);
    })
}
export function getLocation() {
  return new Promise(
    function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position, err) => {
          if (err) {
            return reject();
          }
          var initialPosition = position;
          var location;
          location = {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude
          };
          // console.log("Created Location ", location);
          return location;
          // console.log("location",this.state.initialPosition.coords);
          resolve();
        },
        error => alert(error.message),
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 1000
        }
      );
    }
  );
}

