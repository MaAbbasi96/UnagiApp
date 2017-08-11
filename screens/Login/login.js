import {
    TabNavigator,
    StackNavigator,
    NavigationActions
} from "react-navigation";
import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert,
    ScrollView
} from "react-native";
import { connect } from "react-redux";
import { login } from "../../actions";
var Network = require("../../network");

const { width, height } = Dimensions.get("window");

const background = require("../../images/login1_bg.png");
const mark = require("../../images/login1_mark.png");
const lockIcon = require("../../images/login1_lock.png");
const personIcon = require("../../images/login1_person.png");
var pass, user;
var animating = false;
class LoginScreen extends Component {
    static navigationOptions = {
        title: "اوناگی",
        headerStyle: {
            backgroundColor: "#8BC34A"
        },
        headerTitleStyle: {
            color: "#fff",
            fontFamily: "IRAN_Sans"
        },
        headerLeft: null
    };
    componentWillReceiveProps(props) {
        animating = false;
        if (props.storeState) {
            if (props.storeState.loginStatus) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: "MainScreen" })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
                AsyncStorage.setItem(
                    "refreshToken",
                    props.storeState.refreshToken
                );
                AsyncStorage.setItem(
                    "accessToken",
                    props.storeState.accessToken
                );
                return;
            }
            if (props.storeState.loginWaiting) {
                animating = props.storeState.loginWaiting;
                return;
            }
            if (
                !props.storeState.signupStatus &&
                !props.storeState.signupWaiting
            ) {
                Alert.alert(null, "کلمه عبور یا نام‌کاربری اشتباه است");
                return;
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* <Image source={background} style={styles.background} resizeMode="cover"> */}
                    <View style={styles.background}>
                        <View style={styles.markWrap}>
                            <Image
                                source={mark}
                                style={styles.mark}
                                resizeMode="contain"
                            />
                        </View>
                        <ActivityIndicator animating={animating} size="small" />
                        <View style={styles.wrapper}>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image
                                        source={personIcon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    placeholder="حساب کاربری"
                                    placeholderTextColor="#FFF"
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    onChangeText={username =>
                                        this.setState({ username })}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <View style={styles.iconWrap}>
                                    <Image
                                        source={lockIcon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    placeholderTextColor="#FFF"
                                    placeholder="رمزعبور "
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    secureTextEntry
                                    onChangeText={password =>
                                        this.setState({ password })}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.5}>
                                <View>
                                    <Text style={styles.forgotPasswordText}>
                                        رمزعبور خود را فراموش کرده ام؟
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.props.login(
                                        this.state.username,
                                        this.state.password
                                    );
                                }}
                            >
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>ورود</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.signupWrap}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => navigate("SignUpPage", {})}
                                >
                                    <View>
                                        <Text style={styles.signupLinkText}>
                                            ثبت نام
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.accountText}>
                                    حساب کاربری ندارید؟
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* </Image> */}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30
    },
    mark: {
        width: null,
        height: null,
        flex: 1
    },
    background: {
        backgroundColor: "#212121",
        width,
        height
    },
    wrapper: {
        paddingVertical: 30
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 55,
        borderBottomWidth: 2,
        borderBottomColor: "#8BC34A"
    },
    iconWrap: {
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        height: 20,
        width: 20
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "right",
        marginBottom: 20
    },
    button: {
        backgroundColor: "#689F38",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "left",
        paddingLeft: 15,
        fontSize: 15,
        fontWeight: "bold"
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    accountText: {
        color: "#D8D8D8",
        fontSize: 15,
        fontWeight: "bold"
    },
    signupLinkText: {
        color: "#FFF",
        marginRight: 5
    }
});
mapStateToProps = state => {
    return {
        storeState: state
    };
};
export default connect(mapStateToProps, {
    login
})(LoginScreen);
