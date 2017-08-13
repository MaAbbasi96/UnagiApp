import React, { Component } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    RefreshControl
} from "react-native";
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
        if (
            (!this.props.items || this.props.items.length == 0) &&
            this.props.mainScreen
        ) {
            return (
                <TouchableOpacity
                    style={styles.emptyTouchable}
                    onPress={() => this._onRefresh()}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={styles.emptyText}>
                            {"پستی یافت نشد.برای تلاش دوباره صفحه را لمس کنید."}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
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
                            date={item.date}
                        />}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                            colors={["white"]}
                            progressBackgroundColor="#8BC34A"
                        />
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    emptyTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
