/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SendPostPage from "./SendPostPage";
import PostItem from "./PostItem";
var Network = require("./network");
var Helpers = require("./helpers");
// import { getPosts,getOlderPosts } from './network';

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
import PTRView from "react-native-pull-to-refresh";
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
  RefreshControl,
  FlatList,
  ListView
} from "react-native";
import { connect } from "react-redux";
var async = require("async");
var DeviceInfo = require("react-native-device-info");

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";

import {
  getPosts,
  getAndSaveUniqueID,
  savePosts,
  getAndSavePosts
} from "./actions";

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
  }
});
var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };

const store = createStore(reducer);
class RahnemaTeam2App extends Component {
  constructor() {
    super();
    // this.getUniqueID.bind(this);
    this._refresh.bind(this);
    let tmpArr = new Array();
    //generating random length strings for homepage test
    const TMP_STRING =
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ";
    for (var i = 0; i < 10; i++) {
      tmpArr[i] = {
        _id: i,
        text: TMP_STRING.substring(0, Math.random() * 156 + 4),
        isLiked: false,
        likes: parseInt(Math.random() * 100000)
      };
    }
    this.state = { items: tmpArr };
  }
  static navigationOptions = {
    title: "اوناگی",
    headerStyle: {
      backgroundColor: "#8BC34A"
    },
    headerTitleStyle: {
      color: "#fff",
      fontFamily: "IRAN_Sans"
    }
  };
  componentDidMount() {
	var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };
    this.props.getAndSaveUniqueID();
    // setTimeout(() => {
    //   Helpers.getLocation().then((location, err) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     myLocation = location;
    //   });
	// }, 2000);
	this.props.getAndSavePosts("11111111111111111111111111111111",myLocation);
  }
  _refresh(getOld) {
    if (getOld) {
      getOlderPosts(
        this.state.unique_id,
        {
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude
        },
        this.state.items[this.state.items.length - 1]._id
      )
        .then(res => this.setState({ items: this.state.items.concat(res) }))
        .catch(err => console.log(err));
    } else {
      getPosts(this.state.unique_id, {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude
      })
        .then(res => this.setState({ items: res }))
        .catch(err => console.log(err));
    }
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
  render() {
    if (!this.props.storeState) return null;
    // console.log('our state:', this.state);
    // const { navigate } = this.props.navigation;
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PTRView onRefresh={() => console.log("refreshing")}>
            <View>
              <FlatList
                data={this.props.storeState.items}
                keyExtractor={item => item._id}
                onEndReachedThreshold={0.1}
                onEndReached={() => console.log("refresh2")}
                renderItem={({ item }) =>
                  <PostItem
                    id={item._id}
                    label={item.text}
                    isLiked={item.isLiked}
                    likes={item.likes}
                    location={myLocation}
                    unique_id={this.props.storeState.unique_id}
                  />}
              />
            </View>
          </PTRView>
          <ActionButton
            buttonColor="#757575"
            onPress={() =>
              navigate("SendPostPage", {
                unique_id: this.state.unique_id,
                location: this.state.location
              })}
          />
        </View>
      </Provider>
    );
  }
}
const App = StackNavigator({
  Home: { screen: RahnemaTeam2App },
  SendPostPage: { screen: SendPostPage }
});
mapStateToProps = state => {
  return {
    storeState: state
  };
};
export default connect(mapStateToProps, {
  getPosts,
  getAndSaveUniqueID,
  savePosts,
  getAndSavePosts
})(RahnemaTeam2App);
