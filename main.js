/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SendPostPage from './SendPostPage';
import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation'; 
import PostItem from './PostItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import PTRView from 'react-native-pull-to-refresh';
//import RCTRefreshControl from 'react-refresh-control';
var DeviceInfo = require('react-native-device-info');

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
  RefreshControl
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DCEDC8',
  },
  top: {
    flexDirection : 'row',
    backgroundColor: '#8BC34A',
    height: 80,
  },
   fon : {
     marginLeft : 10,
     marginTop : 10,
     fontSize: 26 ,
     fontWeight: 'bold',
     color: 'white',
     fontFamily: 'monospace', 
   },

  sendimage :{
    height : 35,
    width : 35,
    marginRight : 30,
    // position : 'absolute',
    // left : 0,
    // top: 0,
  },
});

export default class RahnemaTeam2App extends Component {
  constructor() {
    super()
    this.state = {items : [
       {id : 1 , label: "سلام دوستان روز بخیر"},
       {id :2, label: "asdas"},
       {id :4, label: "asdas"},
       {id :3, label: "asdas"},
       {id :5, label: "aasdasdasdasdassdasdasdasdasdsdsaddsadas"},
       {id :6, label: "asdas"},
       {id :7, label: "asdas"},
       {id :8, label: "asdasdasdasas"},
       {id :9, label: "سشیشسیسیبسذلبذبلذلیذ"},
      ] }
    this.getUniqueID.bind(this);
  }
  static navigationOptions = {
    title: 'اوناگی',
    headerStyle: {
      backgroundColor: '#8BC34A'
    },
    headerTitleStyle: {
      color: '#fff'
    }
  };
    getLocation(){
    return new Promise(function(resolve,reject){
      navigator.geolocation.getCurrentPosition(
      (position,err) => {
        if (err){
          return reject();
        }
        var initialPosition = position;
        var location;
        location = {"latitude": initialPosition.coords.latitude, "longitude": initialPosition.coords.longitude};
        // console.log("Created Location ", location);
        this.setState({location});
        // console.log("location",this.state.initialPosition.coords);
        resolve();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
      this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
    }.bind(this))
    
  }

  getUniqueID(){
      var id = {"unique_id" : DeviceInfo.getUniqueID()};
      this.setState(id,()=>{});   
  }
  componentWillMount(){
    this.getUniqueID();
  }
  
  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }


  render() {
    if (!this.state) {
      return null
    }
    // console.log('our state:', this.state);
    const { navigate } = this.props.navigation;
    return (  
    <View>
        <PTRView onRefresh={this._refresh} >
          <View style={styles.container}>
            <ScrollView>
              { this.state.items.map(item => (
                <PostItem
                  key={item.id}
                  label={item.label}
                />  
                ))} 
            </ScrollView> 
          </View> 
        </PTRView>
        <ActionButton buttonColor="#757575" onPress={() => navigate('SendPostPage')}>
          </ActionButton>
       </View> 
    );
  }
}
const App = StackNavigator({ 
  Home: { screen: RahnemaTeam2App }, 
  SendPostPage: { screen: SendPostPage }, 
});
AppRegistry.registerComponent('RahnemaTeam2App', () => App);
