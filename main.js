import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { TabNavigator, StackNavigator } from "react-navigation";
import SendPostPage from "./SendPostPage";
import LoginScreen from "./screens/Login/login";
import SignupScreen from "./screens/Signup/signup";
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
  ListView
} from "react-native";

import reducer from "./reducer";
import NormalPosts from "./NormalPosts";
import HotPosts from "./HotPosts";
const MainScreenNavigator = TabNavigator({
  "جدیدترین": { screen: NormalPosts },
  "داغ‌ترین": { screen: HotPosts },
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#8BC34A',

      }
    }
  });
MainScreenNavigator.navigationOptions = {
  title: 'اوناگی',
  headerStyle: {
    backgroundColor: '#8BC34A'
  },
  headerTitleStyle: {
    color: '#fff',
    fontFamily: 'IRAN_Sans'
  },
};
const App = StackNavigator({
  LoginPage: { screen: LoginScreen },
  SendPostPage: { screen: SendPostPage },
  SignUpPage: { screen: SignupScreen }
});
const setup = () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  class Root extends Component {
    render() {
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
