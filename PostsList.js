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
import PostItem from "./PostItem";
import PTRView from "react-native-pull-to-refresh";

export default class PostsList extends Component {
  render() {
    return (
      <PTRView
        onRefresh={() =>{
          this.props.getAndSavePosts(this.props.accessToken,this.props.refreshToken)}
        }
      >
        <View>
          <FlatList
            data={this.props.items}
            keyExtractor={item => (Math.random())}
            onEndReachedThreshold={0}
            onEndReached={() =>
              console.log("***************************************")}
            renderItem={({ item }) =>
              <PostItem
                id={item._id}
                label={item.text}
                isLiked={item.isLiked}
                likes={item.likes}
                location={this.props.location}
                accessToken={this.props.accessToken}
                refreshToken={this.props.refreshToken}
              />}
          />
          <Button
            title={"Load More"}
            onPress={() =>
               this.props.getAndSaveOldPosts(
                this.props.unique_id,
                this.props.location,
                this.props.items[this.props.items.length - 1]._id
              )} 
          />
        </View>
      </PTRView>
    );
  }
}
