/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator, } from 'react-navigation'; 
import PostItem from './PostItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

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
  Image
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
  


  render() {
    if (!this.state) {
      return null
    }
    // console.log('our state:', this.state);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.state.items.map(item => (
            <PostItem
              key={item.id}
              label={item.label}
            />  
            ))}
        </ScrollView>
        <ActionButton buttonColor="#757575" onPress={() => navigate('SendPostPage')}>
        </ActionButton> 
      </View> 
    );
  }
}
class SendPostPage extends Component{

  static navigationOptions = {
    title: 'افزودن پست',
    headerStyle: {
      backgroundColor: '#8BC34A'
    },
    headerTitleStyle: {
      color: '#fff',
    } ,
    headerRight : 
      <TouchableOpacity onPress = {console.log('press')} >
        <Image style={styles.sendimage}  source = {require('./send.png')}  />
      </TouchableOpacity>
  };
  render(){
    return(
      <View>
        <TextInput
           // style={styles.textInput}
            underlineColorAndroid="transparent"
            //value={this.state.text}
      />
      </View>
    );
  }
}


const App = StackNavigator({ 
  Home: { screen: RahnemaTeam2App }, 
  SendPostPage: { screen: SendPostPage }, 
});
AppRegistry.registerComponent('RahnemaTeam2App', () => App);
