
/**
 * action 创建函数 - 用户模块
 */

'user strict';

import * as types from './actionTypes';

import Util from '../common/utils';
import * as urls from '../constants/constants_url';
import * as Storage from '../common/Storage';
import { Alert } from 'react-native';
// import Toast from 'react-native-root-toast';

export let userFromSync = (user) => {
    return (dispatch) => {
        dispatch({type: types.kUserFromSync, user: user});
    }
};

export let userRegister = (name, email, pwd, confirmPwd) => {
    let url = urls.kUrlUserRegister;
    let param = {'name': name, 'email': email, 'password': pwd, 'password_confirmation': confirmPwd};

    return (dispatch) => {
        dispatch({type: types.kUserRegister});
        Util.post(url, param,
            (resultData) => {
                let user = {};
                let message = ''
                if (resultData.status==1) {
                    user = resultData.data;
                    Storage.setUser(user);
                    message = resultData.result
                } else {
                  //  message = resultData.error
                    if(resultData.error.email) {
                        message = resultData.error.email[0]
                    }
                    if(resultData.error.password) {
                        message = resultData.error.password[0]
                    }
                }
             //   Toast.show(message, {position: Toast.positions.CENTER});
                dispatch({type:types.kUserRegisterReceived, status:status, message:message, user:user});

            },
            (error) => {
                dispatch({'type': types.kActionError});
            });
    }
};

export let userView = () => {
    let url = 'http://local.eleteamapi.ygcr8.com/v1/user/view?id=2';
    return (dispatch) => {
        dispatch({'type':types.kUserView});
        Util.get(url,
            () => {},
            () => {});
    }
};


export let userLogin = (email, password) => {
    let url = urls.kUrlUserLogin;
    let data = {
        email: email,
        password: password
    };
    return (dispatch) => {
        dispatch({'type': types.kUserLogin});
        Util.post(url, data,
            (resultData) => {
                //let app_cart_cookie_id = '';
                let user = {};
                let message = ''
                if (resultData.status==1) {
                    user = resultData.data;

                    Storage.setUser(user);
                    message = resultData.result
                } else {
                    message = resultData.error
                }
            //    Toast.show(message, {position: Toast.positions.CENTER});
                dispatch({type:types.kUserLoginReceived, status:resultData.status, message:message, user:user});

            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
};


export let userLogout = () => {

    return (dispatch) => {
        dispatch({'type': types.kUserLogout});
        Storage.setUser({});
     //   Toast.show('已登出', {position: Toast.positions.CENTER});
        dispatch({type:types.kUserLogoutReceived, status:0, message:'已登出', user:{}});


    }
};
