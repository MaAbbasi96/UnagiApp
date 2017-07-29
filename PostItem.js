import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

class PostItem extends Component {

  onChange (){

  }
  render() {
      return (
          <View style={styles.todoItem}>
            <Text style={styles.todoLabel}>{this.props.label}</Text>
            <View style = {styles.zir}>
              <TouchableOpacity onPress={() => this.onChange()} >
                {this.props.like ? 
                    <Image style = {styles.LikeImage} source = {require('./LikeImage.png') } />
                  : <Image style = {styles.LikeImage} source = {require('./UnLikeImage.png') } />
                }
              </TouchableOpacity>
            <Text style = {styles.Likes}>{this.props.likes}</Text>
            </View>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    todoItem: {
      marginLeft: 5,
      marginRight:5,
      marginTop: 10,
      padding: 5,
      backgroundColor : '#ffffff',
      flexDirection : 'column',
      borderRadius : 5,
    },
    todoLabel: {
      flex: 1,
      marginRight: 16,
      height: 100,
    },
    LikeImage : {
      flex : 1,
      marginLeft : 5,
      marginTop : 5,
      height : 15,
      width : 15,
    },
    zir: {
      flexDirection : 'row',
      height : 20, 
    },
    Likes :{
      fontSize : 10,
      flex : 1,
      marginLeft :10,
      marginTop:5,
    }
});

export default PostItem;