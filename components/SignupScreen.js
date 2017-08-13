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
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from "react-native";
// import { signup } from "../../network";
import { signup } from "../actions";
import { connect } from "react-redux";

import IconM from "react-native-vector-icons/MaterialIcons";

var Validator = require("email-validator");

const { width, height } = Dimensions.get("window");

class SignupScreen extends Component {
    constructor() {
        super();
        this.state = { animating: false };
    }
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
            if (props.storeState.signupWaiting) {
                this.setState({ animating: true });
                return;
            }
            if (
                !props.storeState.signupStatus &&
                !props.storeState.signupWaiting
            ) {
                Alert.alert(null, ".این نام‌کاربری قبلاً گرفته شده است");
                this.setState({ animating: false });
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={Platform.select({
                    ios: () => 0,
                    android: () => 450
                })()}
                style={styles.background}
            >
                <View style={styles.container}>
                    <View style={styles.headerTitleView}>
                        <Text style={styles.titleViewText}>ثبت نام</Text>
                    </View>
                    {this.state.animating &&
                        <ActivityIndicator animating={true} size="small" />}
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <IconM
                                    name="person-outline"
                                    color="white"
                                    size={25}
                                />
                            </View>
                            <TextInput
                                style={[styles.input, styles.whiteFont]}
                                placeholder="نام کاربری"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#FFF"
                                returnKeyType="next"
                                onSubmitEditing={() => this.emailInput.focus()}
                                onChangeText={username =>
                                    this.setState({ username })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <IconM
                                    name="mail-outline"
                                    color="white"
                                    size={25}
                                />
                            </View>
                            <TextInput
                                style={[styles.input, styles.whiteFont]}
                                placeholder="ایمیل"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#FFF"
                                ref={input => (this.emailInput = input)}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    this.passwordInput.focus()}
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <IconM
                                    name="lock-outline"
                                    color="white"
                                    size={25}
                                />
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={[styles.input, styles.whiteFont]}
                                placeholder="گذرواژه"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#FFF"
                                ref={input => (this.passwordInput = input)}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    this.repeatPasswordInput.focus()}
                                onChangeText={password =>
                                    this.setState({ password })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <IconM
                                    name="lock-outline"
                                    color="white"
                                    size={25}
                                />
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={[styles.input, styles.whiteFont]}
                                placeholder="تکرار گذرواژه"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#FFF"
                                ref={input =>
                                    (this.repeatPasswordInput = input)}
                                returnKeyType="go"
                                onChangeText={repeatPassword =>
                                    this.setState({ repeatPassword })}
                            />
                        </View>
                    </View>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
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
                                this.props.signup(
                                    this.state.username,
                                    this.state.password
                                );
                            }}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>تایید</Text>
                            </View>
                        </TouchableOpacity>
                        <View />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        backgroundColor: "#212121",
        width,
        height,
        padding: 10
    },
    inputsContainer: {
        flex: 3,
        marginTop: 50
    },
    footerContainer: {
        flex: 2
    },

    headerTitleView: {
        marginTop: 20,
        alignItems: "center"
    },
    titleViewText: {
        fontSize: 40,
        color: "#8BC34A"
    },
    inputContainer: {
        borderWidth: 2,
        borderBottomColor: "#8BC34A",
        borderColor: "transparent",
        flexDirection: "row",
        height: 55
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
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
        justifyContent: "center"
        // marginBottom: 20
    },

    whiteFont: {
        color: "#FFF"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
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
