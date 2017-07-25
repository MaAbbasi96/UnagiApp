/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SendPostPage from "./SendPostPage";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import PostItem from "./PostItem";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import PTRView from "react-native-pull-to-refresh";
import { getPosts } from "./network";
//import RCTRefreshControl from 'react-refresh-control';
var DeviceInfo = require("react-native-device-info");

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DCEDC8"
  },
  top: {
    flexDirection: "row",
    backgroundColor: "#8BC34A",
    height: 80
  },
  fon: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace"
  },

  sendimage: {
    height: 35,
    width: 35,
    marginRight: 30
    // position : 'absolute',
    // left : 0,
    // top: 0,
  }
});

export default class RahnemaTeam2App extends Component {
  constructor() {
    super();
    this.getUniqueID.bind(this);
    this.state = { items: [] };
  }
  static navigationOptions = {
    title: "اوناگی",
    headerStyle: {
      backgroundColor: "#8BC34A"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  getLocation() {
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
            this.setState({ location });
            // console.log("location",this.state.initialPosition.coords);
            resolve();
          },
          error => alert(error.message),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition(position => {
          var lastPosition = JSON.stringify(position);
          this.setState({ lastPosition });
        });
      }.bind(this)
    );
  }

  getUniqueID(func) {
    this.setState({ unique_id: DeviceInfo.getUniqueID() }, func);
  }

  componentDidMount() {
    this.getLocation = ()=> new Promise((resolve, reject) => {
      var location;
      location = { latitude: 35.7293757, longitude: 51.4224622 };
      this.setState({ location });
      resolve();
    });
    this.getUniqueID(() => {
      this.getLocation()
        .then(res => {
          console.log("here");
          return getPosts(this.state.unique_id, {
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
          });
        })
        .then(res => this.setState({ items: [] }))
        .catch(err => console.log(err));
    });

    // getPosts(this.getUniqueID(),{latitude:1,longitude:1}).then((res)=>{this.setState({items : res})});
  }

  _refresh() {
    return new Promise(resolve => {
      setTimeout(() => {
        getPosts(this.state.unique_id, {
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
          })
        .then(res => this.setState({ items: res }))
        .catch(err => console.log(err));
        resolve();
      }, 2000);
    });
  }

  render() {
    if (!this.state) return null;
    // console.log('our state:', this.state);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PTRView onRefresh={this._refresh}>
          <View>
            <ScrollView>
              {this.state.items.map(item =>
                <PostItem key={item._id} label={item.text} />
              )}
            </ScrollView>
          </View>
        </PTRView>
        <ActionButton
          buttonColor="#757575"
          onPress={() => navigate("SendPostPage")}
        />
      </View>
    );
  }
}
const App = StackNavigator({
  Home: { screen: RahnemaTeam2App },
  SendPostPage: { screen: SendPostPage }
});
AppRegistry.registerComponent("RahnemaTeam2App", () => App);
