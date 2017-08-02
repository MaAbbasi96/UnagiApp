import React, { Component} from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux";
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
} from 'react-native';

import reducer from './reducer'
import RahnemaTeam2App from './main'

const setup = () => {
  const store = createStore(reducer)
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
           <RahnemaTeam2App />
        </Provider>
      )
    }
  }
  return Root
}

AppRegistry.registerComponent('RahnemaTeam2App', setup);
