export function getUniqueID() {
    return new Promise((resolve, reject) => {
        var DeviceInfo = require("react-native-device-info");
        var uniqueID = DeviceInfo.getUniqueID();
        if (uniqueID.length === 16) uniqueID += uniqueID;
        resolve(uniqueID);
    });
}
export function getLocation() {
    return new Promise(function(resolve, reject) {
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
                return resolve(location);
                // console.log("location",this.state.initialPosition.coords);
                // resolve();
            },
            error => alert(error.message),
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    });
}
const PersianMap = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const LatinMap = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];

export function PersianNum(str) {
    str = str.toString();
    for (let i = 0; i < 10; i++) {
        str = str.replace(LatinMap[i], PersianMap[i]);
    }
    return str;
}

export function RandomRGB() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
}
