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
    getAndSaveOldHotPosts,
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
    },
    img: {
        height: 60,
        width: 60
    }
});
var myLocation = { latitude: 35.7293756, longitude: 51.42246219 };
class HotPosts extends Component {
    componentDidMount() {
        if (this.props.storeState)
            this.props.getAndSaveHotPosts(
                this.props.storeState.accessToken,
                this.props.storeState.refreshToken
            );
    }
    render() {
        if (!this.props.storeState) return null;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <PostsList
                    items={this.props.storeState.hotItems}
                    getAndSavePosts={this.props.getAndSaveHotPosts}
                    getAndSaveOldPosts={this.props.getAndSaveOldHotPosts}
                    location={this.props.storeState.location}
                    refreshToken={this.props.storeState.refreshToken}
                    accessToken={this.props.storeState.accessToken}
                    navigation={this.props.navigation}
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
    getAndSaveHotPosts,
    getAndSaveOldHotPosts,
    updatePost
})(HotPosts);
