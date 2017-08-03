/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SendPostPage from "./SendPostPage";
import PostItem from "./PostItem";
var Network = require("./network");
var Helpers = require("./helpers");

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

import { getAndSaveUniqueID, getAndSavePosts } from "./actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DCEDC8"
  }
});
var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };

class RahnemaTeam2App extends Component {
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
    this.props.getAndSavePosts("ab540b666c9cbce9ab540b666c9cbce9", myLocation);
  }
  render() {
    if (!this.props.storeState) return null;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PTRView
          onRefresh={() =>
            this.props.getAndSavePosts(
              this.props.storeState.unique_id,
              myLocation
            )}
        >
          <View>
            <FlatList
              data={this.props.storeState.items}
              keyExtractor={item => item._id}
              onEndReachedThreshold={0.5}
              onEndReached={() =>
                console.log("***************************************")}
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
              unique_id: this.props.storeState.unique_id,
              location: myLocation
            })}
        />
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    storeState: state
  };
};
export default connect(mapStateToProps, {
  getAndSaveUniqueID,
  getAndSavePosts
})(RahnemaTeam2App);
