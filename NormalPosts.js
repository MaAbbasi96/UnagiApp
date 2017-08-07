import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ActionButton from "react-native-action-button";
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
  ListView,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  getAndSaveUniqueID,
  getAndSavePosts,
  getAndSaveOldPosts,
  updatePost,
  likePost,
  loginWithToken
} from "./actions";
import SendPostPage from "./SendPostPage";
import PostItem from "./PostItem";
import PostsList from "./PostsList";

var Network = require("./network");
var Helpers = require("./helpers");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DCEDC8"
  }
});
let myLocation; //= { latitude: 35.7293756, longitude: 51.42246219 };

class NormalPosts extends Component {
  componentDidMount() {
    console.log("***********************************************", this.props);
    if (!this.props.storeState) {
      AsyncStorage.getItem("refreshToken", (err, result) => {
        if (result) this.props.loginWithToken(result);
      });
    } else {
      this.props.getAndSavePosts(
        this.props.storeState.accessToken,
        this.props.storeState.refreshToken
      );
    }
    // var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };
    // Helpers.getLocation().then(
    //   location => {myLocation = location;console.log(location);this.props.getAndSavePosts("ab540b666c9cbce9ab540b666c9cbce9", myLocation);},
    //   err => console.error(err)
    // )
    // this.props.getAndSaveUniqueID();

    // this.props.getAndSavePosts("ab540b666c9cbce9ab540b666c9cbce9");
    // console.log("PROPSsssssssssssssssss", this.props);
  }
  render() {
    if (!this.props.storeState) return null;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <PostsList
          items={this.props.storeState.items}
          getAndSavePosts={this.props.getAndSavePosts}
          getAndSaveOldPosts={this.props.getAndSaveOldPosts}
          unique_id={this.props.storeState.unique_id}
          location={this.props.storeState.location}
          refreshToken={this.props.storeState.refreshToken}
          accessToken={this.props.storeState.accessToken}
        />
        <ActionButton
          buttonColor="#757575"
          onPress={() =>
            navigate("SendPostPage", {
              accessToken : this.props.storeState.accessToken,
              refreshToken : this.props.storeState.refreshToken,
              location: this.props.storeState.location
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
  getAndSavePosts,
  getAndSaveOldPosts,
  updatePost,
  loginWithToken
})(NormalPosts);
