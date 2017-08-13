import {
    TabNavigator,
    StackNavigator,
    NavigationActions
} from "react-navigation";
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Alert,
    TouchableHighlight,
    KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { login } from "../actions";
var Network = require("../network");

const { width, height } = Dimensions.get("window");

const logo = require("../images/login1_mark.png");
const personIcon = require("../images/login1_person.png");
const EyeIcon = require("../images/eye.png");
const EyehIcon = require("../images/eyeh.png");
var hidden;
var animating = false;
class LoginScreen extends Component {
    constructor() {
        super();
        this.state = { animating: false };
        this.state = {
            hidden: true
        };
    }
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
                console.log("loginWaiting");
                this.setState({ animating: true });
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
            <KeyboardAvoidingView behavior="padding" style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.logoWrap}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>به اوناگی خوش آمدید</Text>
                    </View>
                    {this.state.animating &&
                        <ActivityIndicator
                            animating={animating}
                            size="small"
                        />}
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
                                placeholder=" حساب کاربری"
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    this.passwordInput.focus()}
                                keyboardType="email-address"
                                onChangeText={username =>
                                    this.setState({ username })}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <TouchableHighlight
                                    onPress={() =>
                                        this.setState({
                                            hidden: !this.state.hidden
                                        })}
                                >
                                    <Image
                                        source={
                                            this.state.hidden
                                                ? EyeIcon
                                                : EyehIcon
                                        }
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </TouchableHighlight>
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="رمزعبور "
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={this.state.hidden}
                                autoFocus={false}
                                returnKeyType="go"
                                ref={input => (this.passwordInput = input)}
                                onChangeText={password =>
                                    this.setState({ password })}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <View>
                                <Text style={styles.forgotPasswordText}>
                                    رمزعبور خود را فراموش کرده‌اید؟
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                if (this.state) {
                                    if (
                                        this.state.username &&
                                        this.state.password
                                    ) {
                                        this.props.login(
                                            this.state.username,
                                            this.state.password
                                        );
                                    }
                                }
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
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: "rgba(255,255,255,0.7)",
        marginTop: 10
    },
    logoWrap: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 30
    },
    logo: {
        width: 100,
        height: 100,
        flex: 1
    },
    background: {
        backgroundColor: "#212121",
        width,
        height,
        padding: 10
    },
    wrapper: {
        paddingVertical: 30
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 55,
        borderBottomWidth: 2,
        padding: 2,
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
        height: 40,
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
        marginTop: 20
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
