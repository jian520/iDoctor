'use strict';

import {
    AsyncStorage,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import API from '../constants/API'

import L from '../utils/Log'
import User from '../model/User'
import Utils from '../common/utils'


var GLOBAL_USER = Object.create(User);

export default class Service {

    constructor() {

    }

    loginSystem(email, pwd) {

        let param = {'email': email, 'password': pwd};
        console.log("准备请求 param: ", param);

        console.log("准备请求地址: ", API.LOGIN);


        return new Promise((resolve, reject) => {

            this.fetchNet(API.LOGIN, param, 'POST').then((wrapData) => {
                if (wrapData.status == 1) {
                    Object.assign(GLOBAL_USER, wrapData.data)
                    this.saveUser2Disk();
                }

                resolve(wrapData);
            }).catch((error) => {
                reject(error);
            })
        })
    }


    regSystem(name, email, pwd, confirmPwd) {

        //
        let param = {'name': name, 'email': email, 'password': pwd, 'password_confirmation': confirmPwd};
        console.log("准备请求 param: ", param);
        console.log("准备请求地址: ", API.REGISTER);


        return new Promise((resolve, reject) => {

            this.fetchNet(API.REGISTER, param, 'POST').then((wrapData) => {
                resolve(wrapData);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    fetchNet(url, param, method) {


        return new Promise((resolve, reject) => {

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: this.toQueryString(param)

            })
                .then((response) => response.json())
                .catch((error) => {
                    reject(error);
                }).then((responseData) => {

                console.log("responseData ", responseData);


                if (!responseData) {
                    reject(new Error('responseData is null'));
                    return;
                }
                resolve(responseData);
                //   this.saveData(url,responseData.result)
            }).done();

        })
    }


    toQueryString(obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    }


    getUserFromCache() {
        //AsyncStorage.removeItem("user");
        return AsyncStorage.getItem("user")
            .then((result) => {
                if (result) {
                    L.info("getUserFromCache>OSC user:{}", result);
                    Object.assign(GLOBAL_USER, JSON.parse(result));
                }
                return GLOBAL_USER;
            }).catch(err => {
                L.info('getUserFromCache err is: ' + err);
            });
    }

    logout() {
        AsyncStorage.removeItem("user");
        DeviceEventEmitter.emit('LOGOUT', true);
    }

    isLogined() {
        return GLOBAL_USER && GLOBAL_USER.id != 0;
    }

    saveUser2Disk() {
        L.info("saveUser2Disk:{}", GLOBAL_USER)
        AsyncStorage.setItem("user", JSON.stringify(GLOBAL_USER));
    }

    checkNeedLoginWithPromise(promiseFunc, navigator) {
        if (!this.isLogined()) {
            navigator.push({
                id: 'login',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                title: '该操作需要登陆',
                nextPromiseFunc: promiseFunc,
            });
        } else {
            return promiseFunc();
        }
    }

    saveFirstStart() {

        AsyncStorage.setItem("FirstStart", '1');
    }


    getFirstStart() {
        //AsyncStorage.removeItem("user");
        return AsyncStorage.getItem("FirstStart")
            .then((result) => {
                console.log('FirstStart : ' + result);
                if (result == null) {
                    return '2'
                }
                return result
            }).catch(err => {
                L.info('FirstStart : ' + err);
            });
    }
}

module.exports.GLOBAL_USER = GLOBAL_USER;