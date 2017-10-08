/**
 * Created by jian on 2017/5/31.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    Alert,
    DeviceEventEmitter,
    InteractionManager
} from 'react-native';

import NavigationBar from "../widget/NavigationBar";

import {MORE_MENU} from "../common/MoreMenu";
import GlobalStyles from '../constants/GlobalStyles'
import ViewUtils from '../utils/ViewUtils'
import LoginPage from './LoginPage'
import MPColor from '../common/Colors'

import AlipayModule from 'react-native-yunpeng-alipay'

import {connect} from 'react-redux';

import {userLogout} from '../actions/userActions';
class MyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
         //   user: {}
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillUpdate(nextProps, nextState) {
        // InteractionManager.runAfterInteractions(() => {
        //     const {userReducer} = this.props;
        //     if (userReducer.user.id) {
        //         this.props.navigator.popToTop();
        //     }
        //     if (!userReducer.isLoggedIn && userReducer.status == 0) {
        //         Toast.show(userReducer.message, {position: Toast.positions.CENTER});
        //     }
        //
        // });
    }


    onClick(tab) {
        let TargetComponent, params = {...this.props, theme: this.state.theme, menuType: tab};
        switch (tab) {


            case 'Alipay':

                let payInfo ="body=\"商品订单支付\"&total_fee=\"1.6\"&seller_id=\"zhongkefuchuang@126.com\"&notify_url=\"http%3A%2F%2Fweb.jinlb.cn%2Feten%2Fapp%2Fcharge%2Falipay%2Fnotify\"&out_trade_no=\"PO2016081100000014\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&partner=\"2088211510687520\"&_input_charset=\"utf-8\"&subject=\"商品订单\"&sign=\"qMTEJRy%2FX3UpevA2b2mzdjLi8QSEp%2F69jpIT46vkOziWXDllEHXBUMqrJXdoAdiS2COodhXkMMwKrEy8FhK2XSQF6fFGsOkcS3duwPuHxsLcq5Q5JqsztWovIekPDvM8e9Yi%2BMzPethaxMQCJluiMuBvU9KBrK%2FlBUq20s2Pa5k%3D\"&sign_type=\"RSA\""

                AlipayModule.pay(payInfo).then(function(data){
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
                break;
            case 'Logout':
                Alert.alert(
                    "確認操作",
                    '確定要退出登入嗎?',
                    [
                        {text: '確定', onPress: () => {
                            //service.logout()
                            InteractionManager.runAfterInteractions(() => {
                                const {dispatch} = this.props;
                                dispatch(userLogout());
                            });


                        }},
                        {text:"取消", onPress: function(){}},
                    ]
                );

                break;

            case 'Login':
                this.props.navigation.navigate('LoginPage')

                //
                //
                // this.props.navigator.push({
                //                  component: LoginPage,
                //                  params: params,
                //          });
                break;




        }

    }

    // pushTo(TargetComponent, params) {
    //     if (TargetComponent) {
    //         this.props.navigator.push({
    //             component: TargetComponent,
    //             params: params,
    //         });
    //     }
    // }

    getSubTitleItem(tag, icon, text, subTitle) {
        return ViewUtils.getSettingSubTitleItem(() => this.onClick(tag), icon, text, subTitle );
    }

    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(() => this.onClick(tag), icon, text );
    }

    render() {
        const {userReducer} = this.props;
        const user = userReducer.user;

        let navigationBar =
            <NavigationBar
                title='我'
                style={{backgroundColor:MPColor.mainColor}}
                //      rightButton={this.renderMoreButton()}
                statusBar={{backgroundColor: MPColor.mainColor}}
                //    titleView={this.renderTitleView()}
            />


        return (
            <View style={GlobalStyles.listView_container}>
                {/*{navigationBar}*/}
                <ScrollView >
                    <View style={GlobalStyles.line}/>
                    {this.getSubTitleItem('', require('../images/ic_form_city.png'), 'Username', user.username)}
                    <View style={GlobalStyles.line}/>
                    {this.getSubTitleItem('', require('../images/ic_form_city.png'), 'Phone Number', '')}
                    <View style={GlobalStyles.line}/>
                    {this.getSubTitleItem('', require('../images/ic_form_city.png'), 'Email Address', user.email)}


                    <Text  > </Text>
                    <View style={GlobalStyles.line}/>
                    {this.getItem('Logout', require('../images/ic_form_city.png'), 'Logout')}

                    <View style={GlobalStyles.line}/>
                    {this.getItem('Login', require('../images/ic_form_city.png'), 'Login')}

                    <View style={GlobalStyles.line}/>
                    {this.getItem('', require('../images/ic_form_city.png'), 'Privacy & Terms')}
                    <View style={[{marginBottom: 60}]}/>

                    <View style={GlobalStyles.line}/>
                    {this.getItem('Alipay', require('../images/ic_form_city.png'), 'Alipay')}
                    <View style={[{marginBottom: 60}]}/>


                </ScrollView>

            </View>
        );
    }
}

export default connect((state) => {
    const { userReducer } = state;
    return {
        userReducer
    }
})(MyPage);