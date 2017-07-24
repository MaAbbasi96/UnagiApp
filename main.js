/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';

import PostItem from './PostItem';

import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';


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
  }
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


  render() {
    if (!this.state) {
      return null
    }
    console.log('our state:', this.state);
    return (
      <View style={styles.container}>
        
          <View style={styles.top} >
            <Text style = {styles.fon} > اوناگی</Text> 
          </View>
        <ScrollView>
          { this.state.items.map(item => (
            <PostItem
              key={item.id}
              label={item.label}
            />  
            ))}
        </ScrollView>
        <ActionButton buttonColor="#757575">
        </ActionButton> 
      </View> 
    );
  }
}

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
   }
});
AppRegistry.registerComponent('RahnemaTeam2App', () => RahnemaTeam2App);
