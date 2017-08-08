import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { TabNavigator, StackNavigator } from "react-navigation";
import SendPostPage from "./SendPostPage";
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
import LoginScreen from "./screens/Login/login";
import SignupScreen from "./screens/Signup/signup";
import reducer from "./reducer";
import NormalPosts from "./NormalPosts";
import HotPosts from "./HotPosts";
const MainScreenNavigator = TabNavigator(
    {
        جدیدترین: { screen: NormalPosts },
        داغ‌ترین: { screen: HotPosts }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: "#8BC34A"
            }
        }
    }
);
const styles = StyleSheet.create({
    logout: {
        height: 35,
        width: 35,
        marginRight: 30
    }
});
MainScreenNavigator.navigationOptions = props => {
    return {
        title: "اوناگی",
        headerStyle: {
            backgroundColor: "#8BC34A"
        },
        headerTitleStyle: {
            color: "#fff",
            fontFamily: "IRAN_Sans"
        },
        headerRight: (
            <TouchableOpacity onPress={() => console.warn("asd")}>
                <Image style={styles.logout} source={require("./logout.png")} />
            </TouchableOpacity>
        )
    };
};

var auth = true;
var App = null;
const setup = () => {
    const store = createStore(reducer, applyMiddleware(thunk));
    class Root extends Component {
        componentWillMount() {
            var refreshToken = AsyncStorage.getItem(
                "refreshToken",
                (error, result) => {
                    if (!result) auth = false;
                    App = StackNavigator({
                        Home: {
                            screen: auth ? MainScreenNavigator : LoginScreen
                        },
                        SignUpPage: { screen: SignupScreen },
                        MainScreen: { screen: MainScreenNavigator },
                        SendPostPage: { screen: SendPostPage },
                        LoginScreen: { screen: LoginScreen }
                    });
                    this.forceUpdate();
                }
            );
        }
        render() {
            if (!App) return null;
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }
    return Root;
};
AppRegistry.registerComponent("RahnemaTeam2App", setup);
