import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { likePost } from "./actions";
import { connect } from "react-redux";
class PostItem extends Component {
    componentWillMount() {
        this.setState({ isLiked: this.props.isLiked });
        this.setState({ likes: this.props.likes });
    }
    componentWillReceiveProps(props) {
        if (!this.props.notConnected) {
            this.setState({ isLiked: props.isLiked });
            this.setState({ likes: props.likes });
        }
    }

    likeChanged() {
        this.props.likePost(
            this.props.accessToken,
            this.props.refreshToken,
            this.props.location,
            this.props.id,
            !this.state.isLiked,
            this.props.likes
        );
        if (this.props.notConnected) {
            this.setState({ isLiked: !this.state.isLiked });
            this.setState({
                likes: this.state.isLiked
                    ? this.state.likes - 1
                    : this.state.likes + 1
            });
        }
    }
    render() {
        return (
            <View style={styles.postItem}>
                <Text style={styles.postContent}>
                    {this.props.label}
                </Text>
                <View style={styles.bottomOfPost}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("ReplyScreen", {
                                label: this.props.label,
                                accessToken: this.props.accessToken,
                                likes: this.state.likes,
                                id: this.props.id,
                                isLiked: this.state.isLiked,
                                location: this.props.location
                            })}
                    >
                        {!this.props.disableReply &&
                            <Image
                                style={styles.replyImage}
                                source={require("./images/reply.png")}
                            />}
                    </TouchableOpacity>
                    <Text style={styles.replies}>
                        {this.props.replies}
                    </Text>
                    <TouchableOpacity onPress={() => this.likeChanged()}>
                        <Image
                            style={styles.LikeImage}
                            source={
                                this.state.isLiked
                                    ? require("./images/LikeImage.png")
                                    : require("./images/UnLikeImage.png")
                            }
                        />
                    </TouchableOpacity>
                    <Text style={styles.Likes}>
                        {this.state.likes}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postItem: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 5,
        backgroundColor: "#ffffff",
        flexDirection: "column",
        elevation: 4
    },
    postContent: {
        flex: 1,
        marginRight: 16,
        fontFamily: "IRAN_Sans",
        color: "#212121"
    },
    LikeImage: {
        flex: 1,
        marginLeft: 5,
        marginTop: 5,
        height: 22,
        width: 22
    },
    replyImage: {
        flex: 1,
        marginRight: 5,
        marginTop: 5,
        height: 22,
        width: 22
    },
    bottomOfPost: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    Likes: {
        fontSize: 13,
        flex: 1,
        marginLeft: 10,
        marginTop: 5
    },
    replies: {
        fontSize: 13,
        marginRight: 10,
        marginTop: 5
    }
});
mapStateToProps = state => {
    return {
        storeState: state
    };
};
export default connect(mapStateToProps, {
    likePost
})(PostItem);
