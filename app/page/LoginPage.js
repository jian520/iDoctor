'use strict';

import React, {PureComponent, PropTypes} from 'react';
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
    DeviceEventEmitter,
    InteractionManager
} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import {Fumi,} from 'react-native-textinput-effects';
//import Toast, {DURATION} from 'react-native-easy-toast'
// import Toast from 'react-native-root-toast';
// import SActivityIndicator from 'react-native-sww-activity-indicator';
// import Button from 'react-native-buttons';
import NavigationBar from '../widget/NavigationBar'
import GlobalStyles from '../constants/GlobalStyles'

import MPColors from '../common/Colors'


import RegPage from './RegPage'
import Global from '../common/Global'
import {connect} from 'react-redux';

import {userLogin} from '../actions/userActions';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



class LoginPage extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: '登入',
        //   headerStyle: { backgroundColor: 'white' },
    })

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            //logining: false,
            //   loginError: '',
        };
        let AIV = null
    }


    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState) {
        InteractionManager.runAfterInteractions(() => {
            const {userReducer} = this.props;
            if (userReducer.user.id) {
                this.props.navigation.goBack();
            }
            // if (!userReducer.isLoading && userReducer.status != -1) {
            //     Toast.show(userReducer.message, {position: Toast.positions.CENTER});
            // }

            // if (! userReducer.isLoading ) {
            //     SActivityIndicator.hide(this.props.AIV)
            // }
            if (!userReducer.isLoading  ) {
              //  SActivityIndicator.hide(this.AIV)
            }


            console.log(' console.log(userReducer.isLoading)')
            console.log(userReducer.isLoading)
        });
    }

    onEmailChanged(text) {
        this.setState({email: text});
    }

    onPwdChanged(text) {
        this.setState({password: text});
    }


/**
    doLogin() {
        Keyboard.dismiss()
        console.log('doLogin')

        if (this.state.logining) return;
        if (this.state.email == '') {
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


        this.setState({
            logining: true,
            loginError: null,
        });


        server.loginSystem(this.state.email, this.state.password)
            .then((wrapData) => {
                console.log('wrapData  ')

                console.log(wrapData)


                this.setState({
                    logining: false,
                    loginError: "",
                });

                if (wrapData.status == 1) {
                    // this.refs.toast.show(wrapData.result);


                    DeviceEventEmitter.emit('LOGOUT',false);


                } else {
                    this.refs.toast.show(wrapData.error);
                }


            }).then((items) => {

        }).catch((error) => {
            console.log(error);

            this.setState({
                logining: false,
                loginError: error.message,
            });


        })



    }*/


    doLogin(){

        let { email, password } = this.state
        if (!email || !email.length ) {
         //   Toast.show('請輸入郵件！', {position:Toast.positions.CENTER});
            return;
        }
        if (!Global.validateEmail(email)) {
           // Toast.show('郵件格式不正確！', {position:Toast.positions.CENTER});
            return;
        }
        if (!password || !password.length) {

            //Toast.show('請輸入密碼！', {position:Toast.positions.CENTER});
            return;
        }
     //   this.AIV = SActivityIndicator.show(true)



    InteractionManager.runAfterInteractions(() => {
              const {dispatch} = this.props;
              dispatch(userLogin(email, password));
          });
      }
    /*

    async doLogin2() {
        let AIV = null
        const { email, password } = this.state

        this.setState({ logining: true, loadingError: null })
        const { dispatch, navigator, didLogin } = this.props
        try{
            this.validFields(email, password)
            AIV =   SActivityIndicator.show(true)

            const wrapData = await basicLogin(this.state.email, this.state.password)

            console.log(wrapData)

            SActivityIndicator.hide(AIV)
            if (wrapData.status == 1) {

                // this.refs.toast.show(wrapData.result);
             //   DeviceEventEmitter.emit('LOGOUT',false);

                let user = {
                    id:         wrapData.data.id,
                    username:   wrapData.data.username,
                    email:      email,
                    pwd:        password,
                }
                console.log(user)

                this.props.dispatch(login(user));
            } else {
                this.refs.toast.show(wrapData.error);
            }


        } catch (err) {
            console.log('err' + err.message)

            this.refs.toast.show(err.message);

            this.setState({ loadingError: err, })
        } finally {
            this.setState({ logining: false })
            SActivityIndicator.hide(AIV)

        }
    }*/


    render() {
        const {userReducer} = this.props;
        const user = userReducer.user;

        let navigationBar =
            <NavigationBar
                title='登入'
                style={{backgroundColor:MPColors.mainColor}}
                //      rightButton={this.renderMoreButton()}
                statusBar={{backgroundColor: MPColors.mainColor}}
            //    titleView={this.renderTitleView()}
            />


        return (

            <View style={styles.container}>

                {/*{navigationBar}*/}

                <KeyboardAvoidingView behavior='position' style={styles.content}>



                        <Image style={styles.image}
                               source={require('../images/doctor_no_image_g.jpg')}/>
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
                              returnKeyType={'done'}
                              onChangeText={(e) => {
                                  this.onPwdChanged(e)
                              }}
                        />
                        <Button style={styles.button }
                                isLoading={userReducer.isLoading}
                                textStyle={styles.buttonText} onPress={() => {
                            this.doLogin()
                        }}>登入</Button>


                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText} onPress={() => this.doForgetPassword()}>忘記密碼</Text>
                            <Text style={styles.linkText} onPress={() => this.doReg()}>新用戶註冊</Text>
                        </View>

                </KeyboardAvoidingView>


            </View>
        );
    }


    doForgetPassword() {
        console.log('doForgetPassword')
    }

    doReg() {

        this.props.navigation.navigate('RegPage',    ...this.props)

        // console.log('doReg')
        // this.props.navigator.push({
        //     title: '',
        //     component: RegPage,
        //     params: {
        //
        //         parentComponent: this,
        //         ...this.props
        //     },
        // });
    }


}

export default connect((state) => {
    const { userReducer } = state;
    return {
        userReducer
    }
})(LoginPage);


const styles = StyleSheet.create({

    container: {

        backgroundColor: MPColors.backgroundColor,
        height: Global.height,
    },
    content: {
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
        marginTop: 0,
    },
    linkText: {
        fontSize: 13,
        color: MPColors.titleColor,
        marginBottom: 20,
    },

    button: {
        backgroundColor: MPColors.mainColor,
        marginTop: 20,
        //    marginBottom: 50,
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

