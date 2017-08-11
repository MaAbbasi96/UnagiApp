import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Button
} from "react-native";
var Network = require("./network");
import PostItem from "./PostItem";
import PostsList from "./PostsList";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#DCEDC8"
    },
    mainPostContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#DCEDC8"
    },
    sendImage: {
        height: 35,
        width: 35,
        marginRight: 30
    },
    textInput: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        color: "black",
        marginRight: 10,
        marginLeft: 10,
        //textAlignVertical: "top",
        fontFamily: "IRAN_Sans",
        fontSize: 15
        //height: "100%"
    },
    headerRight: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    charLimit: {
        marginRight: 10,
        color: "#FFF",
        fontSize: 19
    },
    charLimitRed: {
        marginRight: 10,
        color: "red",
        fontSize: 19
    },
    postsList: {
        flex: 1
    },
    textInputView: {
        flexDirection: "row",
        backgroundColor: "#fff"
    }
});
var charLimit = 160;

export default class ReplyPage extends Component {
    componentWillMount() {
        this.setState({ text: "" });
        console.log("PROPS RECEIVED ROGER THAT");
        Network.getReplies(
            this.props.navigation.state.params.id,
            this.props.navigation.state.params.accessToken,
            this.props.navigation.state.params.location
        ).then(response => {
            console.log("RESPONSE", response);
            this.setState({ items: response.posts });
        });
        this.props.navigation.setParams({
            charLimit: 160
        });
    }
    componentWillReceiveProps(props) {}
    sendReply() {
        console.log(this.state.text);
        Network.sendReply(
            this.props.navigation.state.params.id,
            this.state.text,
            this.props.navigation.state.params.accessToken,
            this.props.navigation.state.params.location
        );
        // Network.sendReply(postID, text, accessToken, location);
        this.setState({ text: "" });
    }
    static navigationOptions = props => {
        var limit = 160;
        if (props.navigation.state.params) {
            limit = props.navigation.state.params.charLimit;
        }
        return {
            title: "پاسخ دادن",
            headerStyle: {
                backgroundColor: "#8BC34A"
            },
            headerTitleStyle: {
                color: "#fff",
                fontFamily: "IRAN_Sans"
            },
            headerTintColor: "white"
        };
    };
    render() {
        if (!this.state) return null;
        return (
            <View style={styles.container}>
                <View style={styles.mainPostContainer}>
                    <PostItem
                        id={this.props.navigation.state.params.id}
                        label={this.props.navigation.state.params.label}
                        isLiked={this.props.navigation.state.params.isLiked}
                        likes={this.props.navigation.state.params.likes}
                        location={this.props.navigation.state.params.location}
                        accessToken={
                            this.props.navigation.state.params.accessToken
                        }
                        refreshToken={
                            this.props.navigation.state.params.refreshToken
                        }
                        navigation={
                            this.props.navigation.state.params.navigation
                        }
                    />
                </View>
                <View style={styles.postsList}>
                    <FlatList
                        data={this.state.items}
                        keyExtractor={item => Math.random()}
                        onEndReachedThreshold={0.5}
                        onEndReached={() =>
                            console.log("EEEEEENNNNNNDDDDD rreached")}
                        renderItem={({ item }) =>
                            <PostItem
                                id={item._id}
                                label={item.text}
                                isLiked={item.isLiked}
                                likes={item.likes}
                                location={this.props.location}
                                accessToken={this.props.accessToken}
                                refreshToken={this.props.refreshToken}
                                navigation={this.props.navigation}
                            />}
                    />
                    <View style={styles.textInputView}>
                        <TextInput
                            value={this.state.text}
                            style={styles.textInput}
                            onChangeText={text => this.setState({ text: text })}
                        />
                        <Button
                            title={"Send"}
                            onPress={() => this.sendReply()}
                        />
                    </View>
                    {/* <PostsList
                        items={this.state.items}
                        location={this.props.navigation.state.params.location}
                        refreshToken={
                            this.props.navigation.state.params.refreshToken
                        }
                        accessToken={
                            this.props.navigation.state.params.accessToken
                        }
                        navigation={this.props.navigation}
                    /> */}
                </View>
                <PostsList />
            </View>
        );
    }
}
