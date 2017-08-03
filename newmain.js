import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StackNavigator } from "react-navigation";
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
  ListView
} from "react-native";

import reducer from "./reducer";
import RahnemaTeam2App from "./main";
const App = StackNavigator({
  Home: { screen: RahnemaTeam2App },
  SendPostPage: { screen: SendPostPage }
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
