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
        this.setState({ isLiked: props.isLiked });
        this.setState({ likes: props.likes });
    }

<<<<<<< HEAD
    likeChanged() {
        this.props.likePost(
            this.props.accessToken,
            this.props.refreshToken,
            this.props.location,
            this.props.id,
            !this.props.isLiked,
            this.props.likes
        );
    }
    render() {
        return (
            <View style={styles.postItem}>
                <Text style={styles.postContent}>
                    {this.props.label}
                </Text>
                <View style={styles.bottomOfPost}>
                    <TouchableOpacity onPress={() => console.log("reply")}>
                        <Image
                            style={styles.replyImage}
                            source={require("./reply.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.likeChanged()}>
                        <Image
                            style={styles.LikeImage}
                            source={
                                this.state.isLiked
                                    ? require("./LikeImage.png")
                                    : require("./UnLikeImage.png")
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
    }
=======
  likeChanged() {
    this.props.likePost(
      this.props.accessToken, 
      this.props.refreshToken,
      this.props.location,
      this.props.id,
      !this.props.isLiked,
      this.props.likes
    );
  }
  render() {
    return (
      <View style={styles.postItem}>
        <Text style={styles.postContent}>
          {this.props.label}
        </Text>
        <View style={styles.bottomOfPost}>
          <TouchableOpacity onPress={() => this.likeChanged()}>
            <Image
              style={styles.LikeImage}
              source={
                this.state.isLiked
                  ? require("./LikeImage.png")
                  : require("./UnLikeImage.png")
              }
            />
          </TouchableOpacity>
           <Text style={styles.Likes}>
            {this.state.likes}
          </Text>  
          <TouchableOpacity onPress = {() => console.warn("goto reply page")}>
            <Image
              style = {styles.LikeImage}
              source={require('./ReplyImage.png')}/>
          </TouchableOpacity>
          <Text style={styles.Likes}>
            {/* {this.state.replyes} */}
            1213213
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postItem: {
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
   // marginLeft: 5,
    marginTop: 5,
    height: 22,
    width: 22
  },
  bottomOfPost: {
    flex :1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  Likes: {
    fontSize: 13,
    flex: 1,
    marginLeft: 5,
    marginTop: 5
  }
>>>>>>> replypage
});
mapStateToProps = state => {
    return {
        storeState: state
    };
};
export default connect(mapStateToProps, {
    likePost
})(PostItem);
