import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class PostItem extends Component {
    render() {
        return (
            <View style={styles.todoItem}>
                <Text style={styles.todoLabel}>{this.props.label}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius : 5,
    },
    todoLabel: {
        flex: 1,
        marginRight: 16,
        height: 100,
    }
});

export default PostItem;