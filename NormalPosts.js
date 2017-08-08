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
    },
    img: {
        height: 60,
        width: 60
    }
});
let myLocation; //= { latitude: 35.7293756, longitude: 51.42246219 };

class NormalPosts extends Component {
    componentDidMount() {
        if (!this.props.storeState) {
            AsyncStorage.getItem("refreshToken", (err, refreshToken) => {
                if (refreshToken) {
                    AsyncStorage.getItem("accessToken", (err, accessToken) => {
                        if (accessToken)
                            this.props.loginWithToken(
                                refreshToken,
                                accessToken
                            );
                        this.props.getAndSavePosts(accessToken, refreshToken);
                    });
                }
            });
        } else {
            this.props.getAndSavePosts(
                this.props.storeState.accessToken,
                this.props.storeState.refreshToken
            );
        }
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
                    location={this.props.storeState.location}
                    refreshToken={this.props.storeState.refreshToken}
                    accessToken={this.props.storeState.accessToken}
                />
                <ActionButton
                    buttonColor="rgb(170,170,170)"
                    icon={
                        <Image style={styles.img} source={require("./i.png")} />
                    }
                    onPress={() =>
                        navigate("SendPostPage", {
                            accessToken: this.props.storeState.accessToken,
                            refreshToken: this.props.storeState.refreshToken,
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
