import React, { Component } from "react";
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
import { connect } from "react-redux";
import {
  getAndSaveUniqueID,
  getAndSaveHotPosts,
  updatePost,
  likePost
} from "./actions";
import ActionButton from "react-native-action-button";
import PostsList from "./PostsList";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#DCEDC8"
  }
});
var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };
class HotPosts extends Component {
  render() {
    if (!this.props.storeState) return null;
    return (
      <View style={styles.container}>
        <PostsList
          items={this.props.storeState.hotItems}
          getAndSavePosts={this.props.getAndSaveHotPosts}
          unique_id={this.props.storeState.unique_id}
          location={myLocation}
        />
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
  getAndSaveHotPosts,
  updatePost
})(HotPosts);
