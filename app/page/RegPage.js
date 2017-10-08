'use strict';

import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    DeviceEventEmitter
} from 'react-native'
import Toast, {DURATION} from 'react-native-easy-toast'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import {Fumi,} from 'react-native-textinput-effects';
// import Button from 'react-native-buttons';
import NavigationBar from '../widget/NavigationBar'
import GlobalStyles from '../constants/GlobalStyles'
import MPColors from '../common/Colors'
import Global from '../common/Global'
import ViewUtils from '../utils/ViewUtils'
import {userRegister} from '../actions/userActions';


export default class LoginPage extends PureComponent {

    PropTypes: {
        nextPromise: React.PropTypes.object.isRequired,
        didLogin: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            theme: this.props.theme,
            username: '',
            email:'',
            password: '',
            confirmPassword: '',
            logining: false,
            loginError: '',
        };
    }

    onUserNameChanged(text) {
        this.setState({username: text});
    }

    onEmailChanged(text) {
        this.setState({email: text});
    }

    onPwdChanged(text) {
        this.setState({password: text});
    }
    onPwdConfirmChanged(text) {
        this.setState({confirmPassword: text});
    }
    doLogin() {
        Keyboard.dismiss()
        console.log('doLogin')
        if (this.state.logining) return;

        if (this.state.username == '') {
            this.refs.toast.show("請輸入用戶名！");
            return;
        }
        if (this.state.email == ''  ) {
            this.refs.toast.show("請輸入郵件！");
            return;
        }
        if (!Global.validateEmail(this.state.email)) {
            this.refs.toast.show("郵件格式不正確！");
            return;
        }

        if (this.state.password == '') {
            this.refs.toast.show("請輸入密碼！");
            return;
        }
        if (this.state.password.length < 6 ) {
            this.refs.toast.show("請輸入6位以上密碼！");
            return;
        }

        if (this.state.password != this.state.confirmPassword) {
            this.refs.toast.show("兩次輸入的密碼不一致！");
            return
        }

        this.setState({
            logining: true,
            loginError: null,
        });


        server.regSystem(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)
            .then((wrapData) => {
                console.log('wrapData  ')

                console.log(wrapData)


                this.setState({
                    logining: false,
                    loginError: "",
                });

                if (wrapData.status == 1 ) {
                     this.refs.toast.show(wrapData.result);


                    this.timer = setTimeout(() => {
                        DeviceEventEmitter.emit('LOGOUT',false);
                        this.props.pop();

                     }, 1000);

                } else {

                    if (wrapData.error.email.length !=0 ) {
                        this.refs.toast.show(wrapData.error.email[0]);
                    } else if (wrapData.error.password.length !=0 ) {
                        this.refs.toast.show(wrapData.error.password[0]);
                    }

                }


            }).then((items) => {

        }).catch((error) => {
            console.log(error);

            this.setState({
                logining: false,
                loginError: error.message,
            });


        })



    }

    render() {
        let navigationBar =
            <NavigationBar
                navigator={this.props.navigator}
                leftButton={ViewUtils.getLeftButton(()=>  this.props.navigator.pop()   )}
                popEnabled={false}

                title='註冊'
                style={{backgroundColor:MPColors.mainColor}}
                //      rightButton={this.renderMoreButton()}
                statusBar={{backgroundColor: MPColors.mainColor}}
                hide={false}/>;
        return (

            <View style={styles.container} >

                {/*{navigationBar}*/}
                <KeyboardAvoidingView behavior='position' style={styles.content}>


                        <Fumi style={styles.input}
                              label={'用戶'}
                              labelStyle={{color: MPColors.subTitleColor}}
                              inputStyle={{color: MPColors.titleColor}}
                              iconClass={FontAwesomeIcon}
                              iconName={'user'}
                              iconColor={MPColors.mainColor}
                              returnKeyType={'next'}
                              onChangeText={(e) => {
                              this.onUserNameChanged(e)
                              }}
                        />
                        <Fumi style={styles.input}
                              label={'電郵'}
                              labelStyle={{color: MPColors.subTitleColor}}
                              inputStyle={{color: MPColors.titleColor}}
                              iconClass={FontAwesomeIcon}
                              iconName={'mail-reply'}
                              iconColor={MPColors.mainColor}
                              returnKeyType={'next'}
                              onChangeText={(e) => {
                                  this.onEmailChanged(e)
                              }}
                        />
                        <Fumi style={styles.input}
                              label={'密碼'}
                              labelStyle={{color: MPColors.subTitleColor}}
                              inputStyle={{color: MPColors.titleColor}}
                              iconClass={FontAwesomeIcon}
                              iconName={'unlock'}
                              iconColor={MPColors.mainColor}
                              secureTextEntry={true}
                              returnKeyType={'next'}
                              onChangeText={(e) => {this.onPwdChanged(e)}}
                        />
                        <Fumi style={styles.input}
                              label={'確認密碼'}
                              labelStyle={{color: MPColors.subTitleColor}}
                              inputStyle={{color: MPColors.titleColor}}
                              iconClass={FontAwesomeIcon}
                              iconName={'unlock'}
                              iconColor={MPColors.mainColor}
                              secureTextEntry={true}
                              returnKeyType={'done'}
                              onChangeText={(e) => {this.onPwdConfirmChanged(e)}}
                        />
                        <Button  isLoading={this.state.logining}
                            style={styles.button }
                                textStyle={styles.buttonText} onPress={() => {
                            this.doLogin()
                        }}>註冊</Button>


                </KeyboardAvoidingView>
                <Toast ref="toast"/>
            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {

        backgroundColor: MPColors.backgroundColor,
        height: Global.height,
    },
    content: {    // not cool but good enough to make all inputs visible when keyboard is active
    //    flex: 1,
       // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card2: {
        paddingVertical: 16,
        paddingLeft: 10,
        paddingRight: 10,
    },
    image: {
        width: 100, height: 100, alignSelf: 'center', marginBottom: 20
    },
    input: {
        height: 48 + 16,
        marginTop: 4,
    },
    // title: {
    //     paddingBottom: 16,
    //     textAlign: 'center', color: '#404d5b',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     opacity: 0.8,
    // },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    linkText: {
        fontSize: 13,
        color: MPColors.titleColor,
        marginBottom: 20,
    },

    button: {
        backgroundColor: MPColors.mainColor,
        marginTop: 20,
        marginBottom: 0,
        borderWidth: 0,
    },
    buttonText: {
        fontSize: 18, color: 'white',
    },
    copyrightContainer: {
        marginTop: 60,
    },
    copyright: {
        fontSize: 11,
        marginTop: 10, color: '#888',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
