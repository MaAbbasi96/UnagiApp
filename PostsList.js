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
  FlatList
} from "react-native";
import PostItem from "./PostItem";

export default class PostsList extends Component {
  constructor(){
    super();
    this.state = {refreshing : false}
  }

  _onrefresh = () =>  {
    this.setState(
      {
        refreshing : true
      },
      () => {for(var i = 1; i < 10 ; i++){} console.warn("here recieve items")},
      )
      console.warn("ready")
      this.setState(
        {
          refreshing : false
        }
      )
      //this.props.getAndSavePosts(this.props.unique_id, this.props.location) ,
  }  
  render() {
    return (
        <View>
          <FlatList
            data={[
              {_id : 18 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 17 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 16 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 15 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 14 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 13 , text : "axcvbnm" , likes : 123 , isLiked : false},
              {_id : 1233 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 1222 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 120 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 129 , text : "axcvbnm" , likes : 123 , isLiked : false},
              {_id : 128 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 127 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 126 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 125 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 124 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 123 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 122 , text : "axcvbnm" , likes : 123 , isLiked : true},
              {_id : 121 , text : "axcvbnm" , likes : 123 , isLiked : true},
            ]}
            keyExtractor={item => (Math.random())}
            onEndReachedThreshold={0.5}
            onEndReached={() =>
              console.warn("***************************************")}
            renderItem={({ item }) =>
              <PostItem
                id={item._id}
                label={item.text}
                isLiked={item.isLiked}
                likes={item.likes}
                location={this.props.location}
                unique_id={this.props.unique_id}
              />}
              refreshing = {this.state.refreshing}
              onRefresh ={() => this._onrefresh()} 
          />
          {/* <Button
            title={"Load More"}
            onPress={() =>
              this.props.getAndSaveOldPosts(
              this.props.unique_id,
              this.props.location,
              this.props.items[this.props.items.length - 1]._id
              )} 
          /> */}
        </View>
    );
  }
}
