import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { TabNavigator,StackNavigator } from "react-navigation";
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
  Home: { screen: MainScreenNavigator },
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
