import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Button,
    Keyboard
} from "react-native";
var Network = require("../network");
import PostItem from "./PostItem";
import PostsList from "./PostsList";

import IconM from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#DCEDC8"
    },
    mainPostContainer: {
        flex: 0.5,
        flexDirection: "column",
        backgroundColor: "#DCEDC8",
        // backgroundColor: "#000",
        height: 100
    },
    sendImage: {
        height: 35,
        width: 35,
        marginRight: 30
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
        flex: 1,
        marginTop: 10
    },
    textInput: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        color: "black",
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 30,
        fontFamily: "IRAN_Sans",
        fontSize: 15
    },
    textInputView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderTopWidth: 1,
        borderColor: "grey"
    },
    sendButton: {
        marginRight: 10,
        opacity: 1
    },
    sendButtonDisabled: {
        marginRight: 10,
        opacity: 0.4
    }
});
var charLimit = 160;

export default class ReplyScreen extends Component {
    componentWillMount() {
        this.setState({ text: "", refreshing: false });
        this.setState({ charLimit: charLimit });
        this.getReplies();
    }
    getReplies() {
        this.setState({ refreshing: true });
        Network.getReplies(
            this.props.navigation.state.params.id,
            this.props.navigation.state.params.accessToken,
            this.props.navigation.state.params.location
        ).then(response => {
            this.setState({ items: response.posts });
            this.setState({ refreshing: false });
        });
    }
    getOldReplies() {
        if (this.state.items) {
            if (this.state.items.length > 0) {
                Network.getOldReplies(
                    this.props.navigation.state.params.id,
                    this.props.navigation.state.params.accessToken,
                    this.props.navigation.state.params.location,
                    this.state.items[this.state.items.length - 1]._id
                ).then(response => {
                    this.setState({
                        items: this.state.items.concat(response.posts)
                    });
                });
            }
        }
    }
    sendReply() {
        Network.sendReply(
            this.props.navigation.state.params.id,
            this.state.text,
            this.props.navigation.state.params.accessToken,
            this.props.navigation.state.params.location
        ).then(() => {
            this.setState({ text: "" });
            this.getReplies();
        });
    }
    static navigationOptions = props => {
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
                        notConnected={true}
                        disableReply={true}
                        date={this.props.navigation.state.params.date}
                    />
                </View>
                <View style={styles.postsList}>
                    <FlatList
                        data={this.state.items}
                        keyExtractor={item => Math.random()}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => this.getOldReplies()}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getReplies()}
                        renderItem={({ item }) =>
                            <PostItem
                                id={item._id}
                                label={item.text}
                                isLiked={item.isLiked}
                                likes={item.likes}
                                replies={item.replies}
                                location={
                                    this.props.navigation.state.params.location
                                }
                                accessToken={
                                    this.props.navigation.state.params
                                        .accessToken
                                }
                                refreshToken={
                                    this.props.navigation.state.params
                                        .refreshToken
                                }
                                navigation={this.props.navigation}
                                notConnected={true}
                                date={item.date}
                            />}
                    />
                    <View style={styles.textInputView}>
                        <TextInput
                            value={this.state.text}
                            onChangeText={text => {
                                this.setState({
                                    text: text,
                                    charLimit: charLimit - text.length
                                });
                            }}
                            onContentSizeChange={event => {
                                const height =
                                    event.nativeEvent.contentSize.height;
                                this.setState({ height });
                            }}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            style={[
                                styles.textInput,
                                { height: Math.min(175, this.state.height) }
                            ]}
                        />

                        {this.state.charLimit > 0 &&
                            this.state.charLimit !== 160 &&
                            <TouchableOpacity
                                onPress={() => {
                                    Keyboard.dismiss();
                                    this.sendReply();
                                }}
                            >
                                <IconM
                                    name="send"
                                    style={styles.sendButton}
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>}
                        {!(
                            this.state.charLimit > 0 &&
                            this.state.charLimit !== 160
                        ) &&
                            <TouchableOpacity disabled={true}>
                                <IconM
                                    name="send"
                                    style={styles.sendButtonDisabled}
                                    color="grey"
                                    size={30}
                                />
                            </TouchableOpacity>}
                    </View>
                </View>
                <PostsList />
            </View>
        );
    }
}
