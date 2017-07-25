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
  textInput :{
    backgroundColor :"#fff",
    marginRight : 10,
    marginLeft : 10,
    marginTop : 10,
    borderRadius : 5
  },
  headerRight :{
    flexDirection : "row"
  },
  charLimit:{
    marginTop: 8
  }
});
var charLimit = 160;

export default class SendPostPage extends Component{
  constructor(){
    super();
  }
  componentWillMount(){
    this.props.navigation.setParams({
      charLimit : 160
    });
  }
  static navigationOptions =(props) => {
    var limit = 160;
    if (props.navigation.state.params){
      limit = props.navigation.state.params.charLimit;
    }
    return ({
    title: 'افزودن پست',
    headerStyle: {
      backgroundColor: '#8BC34A'
    },
    headerTitleStyle: {
      color: '#fff',
    } ,
    headerRight : 
        <View style={styles.headerRight}>
          <Text style={styles.charLimit}> {limit} </Text>
        <TouchableOpacity onPress = {console.log('press')} >
         <Image style={styles.sendimage}  source = {require('./send.png')}  />
       </TouchableOpacity>
      </View>
  })};
  render(){
    return(
      <View style = {styles.container}>
        <TextInput style={styles.textInput}
           {...this.props}
            editable = {true}
            multiline = {true}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              this.setState({text});
              this.props.navigation.setParams({charLimit : 160 - text.length});
              }}
            numberOfLines = {5}
            maxLength ={160}
        />
      </View>
    );
  }
}