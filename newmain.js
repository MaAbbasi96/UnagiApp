import React, { Component} from 'react'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
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
  const store = createStore(reducer,applyMiddleware(thunk));
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
