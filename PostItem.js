import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { likePost } from './network';
class PostItem extends Component {
	componentWillMount() {
		this.setState({ isLiked: this.props.isLiked });
		this.setState({ likes: this.props.likes });
	}

	likeChanged() {
		likePost(
			this.props.unique_id,
			this.props.location,
			this.props.id,
			!this.state.isLiked
		);
		this.setState({ isLiked: !this.state.isLiked });
		this.state.isLiked
			? this.setState({ likes: this.state.likes - 1 })
			: this.setState({ likes: this.state.likes + 1 });
	}
	render() {
		return (
			<View style={styles.postItem}>
				<Text style={styles.postContent}>
					{this.props.label}
				</Text>
				<View style={styles.bottomOfPost}>
					<TouchableOpacity onPress={() => this.likeChanged()}>
						{this.state.isLiked
							? <Image
									style={styles.LikeImage}
									source={require('./LikeImage.png')}
								/>
							: <Image
									style={styles.LikeImage}
									source={require('./UnLikeImage.png')}
								/>}
					</TouchableOpacity>
					<Text style={styles.Likes}>
						{this.state.likes}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	postItem: {
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		padding: 5,
		backgroundColor: '#ffffff',
		flexDirection: 'column',
		borderRadius: 5
	},
	postContent: {
		flex: 1,
		marginRight: 16,
		height: 100,
		fontFamily: 'IRAN_Sans'
	},
	LikeImage: {
		flex: 1,
		marginLeft: 5,
		marginTop: 5,
		height: 15,
		width: 15
	},
	bottomOfPost: {
		flexDirection: 'row',
		height: 20
	},
	Likes: {
		fontSize: 10,
		flex: 1,
		marginLeft: 10,
		marginTop: 5
	}
});

export default PostItem;
