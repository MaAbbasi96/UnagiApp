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
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    AsyncStorage,
    ScrollView
} from "react-native";
// import { signup } from "../../network";
import { signup } from "../actions";
import { connect } from "react-redux";
var Validator = require("email-validator");

const background = require("../images/signup_bg.png");
const backIcon = require("../images/signup_back.png");
const personIcon = require("../images/signup_person.png");
const lockIcon = require("../images/signup_lock.png");
const emailIcon = require("../images/signup_email.png");
var animating = false;

class SignupScreen extends Component {
    static navigationOptions = {
        title: "اوناگی",
        headerStyle: {
            backgroundColor: "#8BC34A"
        },
        headerTitleStyle: {
            color: "#fff",
            fontFamily: "IRAN_Sans"
        }
    };
    componentWillReceiveProps(props) {
        animating = false;
        if (props.storeState) {
            if (props.storeState.signupStatus) {
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
            if (props.storeState.signUpwaiting) {
                animating = props.storeState.signupWaiting;
                return;
            }
            if (
                !props.storeState.signupStatus &&
                !props.storeState.signupWaiting
            ) {
                Alert.alert(null, "این نام‌کاربری قبلاً گرفته شده");
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={[styles.container]}>
                        <View style={styles.headerTitleView}>
                            <Text style={styles.titleViewText}>ثبت نام</Text>
                        </View>
                        <ActivityIndicator animating={animating} size="small" />

                        <View style={styles.inputsContainer}>
                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={personIcon}
                                        style={styles.inputIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    style={[styles.input, styles.whiteFont]}
                                    placeholder="نام کاربری"
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#FFF"
                                    //underlineColorAndroid="#8BC34A"
                                    onChangeText={username =>
                                        this.setState({ username })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={emailIcon}
                                        style={styles.inputIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    style={[styles.input, styles.whiteFont]}
                                    placeholder="ایمیل"
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#FFF"
                                    onChangeText={email =>
                                        this.setState({ email })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={lockIcon}
                                        style={styles.inputIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={true}
                                    style={[styles.input, styles.whiteFont]}
                                    placeholder="گذرواژه"
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#FFF"
                                    onChangeText={password =>
                                        this.setState({ password })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        source={lockIcon}
                                        style={styles.inputIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                                <TextInput
                                    secureTextEntry={true}
                                    style={[styles.input, styles.whiteFont]}
                                    placeholder="تکرار گذرواژه"
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#FFF"
                                    onChangeText={repeatPassword =>
                                        this.setState({ repeatPassword })}
                                />
                            </View>
                            <Text />
                            <Text />
                            <Text />
                            <View />
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (this.state) {
                                        if (
                                            this.state.username &&
                                            this.state.password &&
                                            this.state.email
                                        ) {
                                            if (
                                                this.state.password !=
                                                this.state.repeatPassword
                                            ) {
                                                Alert.alert(
                                                    null,
                                                    "رمز عبور و تکرار آن تطابق ندارند"
                                                );
                                                return;
                                            }
                                            if (
                                                !Validator.validate(
                                                    this.state.email
                                                )
                                            ) {
                                                Alert.alert(
                                                    null,
                                                    "ایمیل اشتباه"
                                                );
                                                return;
                                            }

                                            this.props.signup(
                                                this.state.username,
                                                this.state.password
                                            );
                                        }
                                    }
                                }}
                            >
                                <View style={styles.signup}>
                                    <Text style={styles.buttonText}>تایید</Text>
                                </View>
                            </TouchableOpacity>
                            <View />
                            {/* <View style={styles.loginWrap}> */}
                            {/* <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigate("LoginPage", {})}
              >
                <View>
                  <Text style={styles.signupLinkText}>ورود</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.whiteFont}>دارای حساب کاربری هستید؟</Text> */}
                            {/* </View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
        flex: 1
    },
    // bg: {
    //     paddingTop: 40,
    //     width: null,
    //     height: null
    // },
    headerContainer: {
        flex: 1
    },

    inputsContainer: {
        flex: 3,
        marginTop: 50
    },
    footerContainer: {
        flex: 1
    },
    headerIconView: {
        marginRight: 10,
        backgroundColor: "transparent"
    },
    headerBackButtonView: {
        width: 25,
        height: 25
    },
    backButtonIcon: {
        width: 25,
        height: 25
    },
    headerTitleView: {
        backgroundColor: "transparent",
        marginTop: 30,
        marginLeft: 25,
        alignItems: "center"
    },
    titleViewText: {
        fontSize: 40,
        color: "#8BC34A"
    },
    inputs: {
        paddingVertical: 20
    },
    inputContainer: {
        borderWidth: 2,
        borderBottomColor: "#8BC34A",
        borderColor: "transparent",
        flexDirection: "row",
        height: 55
    },
    loginWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    inputIcon: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: "bold",
        color: "#FF3366",
        textAlign: "right"
    },
    signup: {
        backgroundColor: "#689F38",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    signin: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    greyFont: {
        color: "#D8D8D8"
    },
    whiteFont: {
        color: "#FFF"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
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
    signup
})(SignupScreen);