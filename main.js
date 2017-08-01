/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SendPostPage from './SendPostPage';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PostItem from './PostItem';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import PTRView from 'react-native-pull-to-refresh';
import { getPosts,getOlderPosts } from './network';
var async = require('async');
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
	RefreshControl,
	FlatList,
	ListView
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#DCEDC8'
	},
	top: {
		flexDirection: 'row',
		backgroundColor: '#8BC34A',
		height: 80
	},
	fon: {
		marginLeft: 10,
		marginTop: 10,
		fontSize: 26,
		fontWeight: 'bold',
		color: 'white',
		fontFamily: 'monospace'
	},
	sendimage: {
		height: 35,
		width: 35,
		marginRight: 30
	}
});

var _listViewOffset = 0;
export default class RahnemaTeam2App extends Component {
	constructor() {
		super();
		this.getUniqueID.bind(this);
		this._refresh.bind(this);
		let tmpArr = new Array();
		//generating random length strings for homepage test
		const TMP_STRING =
			'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ';
		for (var i = 0; i < 10; i++) {
			tmpArr[i] = {
				_id: i,
				text: TMP_STRING.substring(0, Math.random() * 156 + 4),
				isLiked: false,
				likes: parseInt(Math.random() * 100000)
			};
		}
		this.state = { items: tmpArr };
	}
	componentWillMount() {
		// this.state = { items: [{_id : 4 ,text : "نسشپیش" , isLiked :true ,likes : 12456}] };
		//this.setState({ items: [] });
	}
	static navigationOptions = {
		title: 'اوناگی',
		headerStyle: {
			backgroundColor: '#8BC34A'
		},
		headerTitleStyle: {
			color: '#fff',
			fontFamily: 'IRAN_Sans'
		}
	};

	getLocation() {
		return new Promise(
			function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(
					(position, err) => {
						if (err) {
							return reject();
						}
						var initialPosition = position;
						var location;
						location = {
							latitude: initialPosition.coords.latitude,
							longitude: initialPosition.coords.longitude
						};
						// console.log("Created Location ", location);
						this.setState({ location });
						// console.log("location",this.state.initialPosition.coords);
						resolve();
					},
					error => alert(error.message),
					{
						enableHighAccuracy: false,
						timeout: 20000,
						maximumAge: 1000
					}
				);
				this.watchID = navigator.geolocation.watchPosition(position => {
					var lastPosition = JSON.stringify(position);
					this.setState({ lastPosition });
				});
			}.bind(this)
		);
	}

	getUniqueID(func) {
		this.setState({ unique_id: DeviceInfo.getUniqueID() }, func);
	}

	componentDidMount() {
		this.getLocation = () =>
			new Promise((resolve, reject) => {
				var location;
				location = { latitude: 35.7293757, longitude: 51.4224622 };
				this.setState({ location });
				resolve();
			});
		this.getUniqueID(() => {
			this.getLocation()
				.then(res => {
					console.log('here');
					return getPosts(this.state.unique_id, {
						latitude: this.state.location.latitude,
						longitude: this.state.location.longitude
					});
				})
				.then(res => {
					this.setState({ items: res });
				})
				.catch(err => console.log(err));
		});

		async.parallel(
			[
				callback => this.getUniqueID(callback),
				callback => this.getLocation().then(callback())
			],
			() => {
				getPosts(this.state.unique_id, {
					latitude: this.state.location.latitude,
					longitude: this.state.location.longitude
				})
					.then(res => this.setState({ items: res }))
					.catch(err => console.log(err));
			}
		);
	}

	_refresh(getOld) {
		if (getOld){
			getOlderPosts(this.state.unique_id, {
			latitude: this.state.location.latitude,
			longitude: this.state.location.longitude
			},
			this.state.items[this.state.items.length-1]._id)
			.then(res => this.setState({ items: items.concat(res) }))
			.catch(err => console.log(err));
		}
		else{
			getPosts(this.state.unique_id, {
				latitude: this.state.location.latitude,
				longitude: this.state.location.longitude
			})
		
			.then(res => this.setState({ items: res }))
			.catch(err => console.log(err));
		}
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				resolve();
			}, 2000);
		});
	}
	// _refresh2(){
	// 	getOlderPosts(this.state.unique_id, {
	// 		latitude: this.state.location.latitude,
	// 		longitude: this.state.location.longitude
	// 		},
	// 		this.state.items[this.state.items.length-1]._id)
	// 		.then(res => this.setState({ items: items.concat(res) }))
	// 		.catch(err => console.log(err));
	// }

	render() {
		if (!this.state) return null;
		// console.log('our state:', this.state);
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<PTRView onRefresh={this._refresh.bind(this,getOld=false)}>
					<View>
						<FlatList
							data={this.state.items}
							keyExtractor = {item => item._id}
							onEndReachedThreshold={1}
							onEndReached={this._refresh.bind(this,getOld = true)}
							renderItem={({ item }) => (
							<PostItem
								id = {item._id}
								label = {item.text}
								isLiked = {item.isLiked}
								like = {item.likes}
								location = {this.state.location}
								unique_id = {this.state.unique_id}
							/>
							)}
						/>
					</View>
				</PTRView>
				<ActionButton
					buttonColor="#757575"
					onPress={() =>
						navigate('SendPostPage', {
							unique_id: this.state.unique_id,
							location: this.state.location
						})}
				/>
			</View>
		);
	}
}
const App = StackNavigator({
	Home: { screen: RahnemaTeam2App },
	SendPostPage: { screen: SendPostPage }
});
AppRegistry.registerComponent('RahnemaTeam2App', () => App);
