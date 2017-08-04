// import SignupScreen from "./screens/Signup/signup";
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'

const background = require("./signup_bg.png");
const backIcon = require("./back.png");
const personIcon = require("./signup_person.png");
const lockIcon = require("./signup_lock.png");
const emailIcon = require("./signup_email.png");
const birthdayIcon = require("./signup_birthday.png");


export default class singup extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        > */}
                <View style={[styles.container, styles.bg]} >
                    {/* <View style={styles.headerContainer}> */}

                    {/* <View style={styles.headerIconView}>
                            <TouchableOpacity style={styles.headerBackButtonView}>
                                <Image
                                    source={backIcon}
                                    style={styles.backButtonIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View> */}

                    <View style={styles.headerTitleView}>
                        <Text style={styles.titleViewText}>ثبت نام</Text>
                    </View>

                    {/* </View> */}

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
                                placeholderTextColor="#FFF"
                                underlineColorAndroid="#8BC34A"
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
                                placeholderTextColor="#FFF"
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
                                placeholderTextColor="#FFF"
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
                                placeholderTextColor="#FFF"
                            />
                        </View>

                    </View>

                    <View style={styles.footerContainer}>
                        <TouchableOpacity activeOpacity={.5}>
                            <View style={styles.signup}>
                                <Text style={styles.buttonText}>تایید</Text>
                            </View>
                        </TouchableOpacity>
                        <View />
                        <View style={styles.loginWrap}>
                            <TouchableOpacity activeOpacity={.5}>
                                <View>
                                    <Text style={styles.signupLinkText}>ورود</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.whiteFont}>دارای حساب کاربری هستید؟</Text>
                        </View>
                    </View>
                </View>
                {/* </Image> */}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
        flex: 1,
    },
    bg: {
        paddingTop: 30,
        width: null,
        height: null
    },
    headerContainer: {
        flex: 1,
    },

    inputsContainer: {
        flex: 3,
        marginTop: 50,
    },
    footerContainer: {
        flex: 1
    },
    headerIconView: {
        marginRight: 10,
        backgroundColor: 'transparent'
    },
    headerBackButtonView: {
        width: 25,
        height: 25,
    },
    backButtonIcon: {
        width: 25,
        height: 25
    },
    headerTitleView: {
        backgroundColor: 'transparent',
        marginTop: 10,
        marginLeft: 25,
        alignItems: 'center',
    },
    titleViewText: {
        fontSize: 40,
        color: '#8BC34A',
    },
    inputs: {
        paddingVertical: 20,
    },
    inputContainer: {
        borderWidth: 2,
        borderBottomColor: '#8BC34A',
        borderColor: 'transparent',
        flexDirection: 'row',
        height: 75,
    },
    loginWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        width: 30,
        height: 30,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: '#FF3366',
        textAlign: 'right',
    },
    signup: {
        backgroundColor: '#689F38',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    signin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    greyFont: {
    color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    signupLinkText: {
        color: "#FFF",
        marginRight: 5,
    }
})
