import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PostItem from "./PostItem";

export default class PostsList extends Component {
    constructor() {
        super();
        this.state = { refreshing: false };
    }
    _onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.props.getAndSavePosts(
            this.props.accessToken,
            this.props.refreshToken
        );
        this.setState({
            refreshing: false
        });
    };
    render() {
        return (
            <View>
                <FlatList
                    data={this.props.items}
                    keyExtractor={item => Math.random()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() =>
                        this.props.getAndSaveOldPosts(
                            this.props.accessToken,
                            this.props.refreshToken,
                            this.props.location,
                            this.props.items[this.props.items.length - 1]._id
                        )}
                    renderItem={({ item }) =>
                        <PostItem
                            id={item._id}
                            label={item.text}
                            isLiked={item.isLiked}
                            likes={item.likes}
                            replies={item.replies}
                            location={this.props.location}
                            accessToken={this.props.accessToken}
                            refreshToken={this.props.refreshToken}
                            navigation={this.props.navigation}
                        />}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                />
            </View>
        );
    }
}
