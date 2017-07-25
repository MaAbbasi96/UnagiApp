import React, { Component } from 'react';
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



export default class SendPostPage extends Component{

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