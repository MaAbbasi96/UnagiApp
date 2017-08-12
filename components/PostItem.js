import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Share,
    Button
} from "react-native";
import { likePost } from "../actions";
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
    share() {
        Share.share(
            {
                message: this.props.label
            },
            {
                // Android only:
                dialogTitle: "منتشر کنید",
                // iOS only:
                excludedActivityTypes: [
                    "com.apple.UIKit.activity.PostToTwitter"
                ]
            }
        );
    }
    postTime() {
        var prevTime = new Date(this.props.date);
        var thisTime = new Date(); // now
        var time = Math.floor((thisTime.getTime() - prevTime.getTime()) / 1000);
        if (time < 60) return time + " ثانیه پیش";
        time = Math.floor(time / 60);
        if (time < 60) return time + " دقیقه پیش";
        time = Math.floor(time / 60);
        if (time < 24) return time + " ساعت پیش";
        time = Math.floor(time / 24);
        if (time < 7) return time + " روز پیش";
        time = Math.floor(time / 7);
        return time + " هفته پیش";
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
                        style={styles.shareButton}
                        onPress={() => this.share()}
                    >
                        <Image
                            style={styles.shareImage}
                            source={require("../images/share.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("ReplyScreen", {
                                label: this.props.label,
                                accessToken: this.props.accessToken,
                                likes: this.state.likes,
                                id: this.props.id,
                                isLiked: this.state.isLiked,
                                date: this.props.date,
                                location: this.props.location
                            })}
                    >
                        {!this.props.disableReply &&
                            <Image
                                style={styles.replyImage}
                                source={require("../images/reply.png")}
                            />}
                    </TouchableOpacity>
                    <Text style={styles.replies}>
                        {this.props.replies}
                    </Text>
                    <TouchableOpacity onPress={() => this.likeChanged()}>
                        <Image
                            style={styles.likeImage}
                            source={
                                this.state.isLiked
                                    ? require("../images/LikeImage.png")
                                    : require("../images/UnLikeImage.png")
                            }
                        />
                    </TouchableOpacity>
                    <Text style={styles.Likes}>
                        {this.state.likes}
                    </Text>
                    <Text style={styles.date}>
                        {this.postTime()}
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
        padding: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: "#ffffff",
        flexDirection: "column",
        elevation: 4,
        borderTopWidth: 2,
        borderTopColor: "#709e3a"
    },
    postContent: {
        flex: 1,
        marginBottom: 5,
        fontFamily: "IRAN_Sans",
        color: "#212121"
    },
    likeImage: {
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
    },
    date: {
        color: "#aaa"
    },
    shareImage: {
        flex: 1,
        // marginLeft: 5,
        // marginTop: 5,
        // marginRight: 15,
        height: 40,
        width: 22
    },
    shareButton: {
        // flex: 1,
        height: 22,
        width: 30,
        marginRight: 5
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
