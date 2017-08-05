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
  RefreshControl,
  FlatList,
  ListView
} from "react-native";
import PostItem from './PostItem';
import PTRView from "react-native-pull-to-refresh";


export default class PostsList extends Component {
  render() {
    return (
      <PTRView
        onRefresh={() =>
          this.props.getAndSavePosts(
            this.props.unique_id,
            this.props.location
          )}
      >
        <View>
          <FlatList
            data={this.props.items}
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
                location={this.props.location}
                unique_id={this.props.unique_id}
              />}
          />
        </View>
      </PTRView>
    );
  }
}
