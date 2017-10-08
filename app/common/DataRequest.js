/**
 * DataRequest
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';

export default class DataRequest {
    constructor() {

    }

    saveData(url, items, callback) {
        if (!items || !url)return;
        let wrapData={items:items,date:new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }

    fetchData(url) {
        return new Promise((resolve, reject)=> {
            this.fetchLocal(url).then((wrapData)=> {
                if (wrapData) {
                    resolve(wrapData,true);
                } else {
                    this.fetchNet(url).then((data)=> {
                        resolve(data);
                    }).catch((error)=> {
                        reject(error);
                    })
                }

            }).catch((error)=> {
                console.log('fetchLocal fail:'+error);
                this.fetchNet(url).then((data)=> {
                    resolve(data);
                }).catch((error=> {
                    reject(error);
                }))
            })
        })
    }

    fetchLocal(url) {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    fetchNet(url) {
        return new Promise((resolve, reject)=> {

                fetch(url)
                    .then((response)=>response.json())
                    .catch((error)=> {
                        reject(error);
                    }).then((responseData)=> {
                        if (!responseData||!responseData.result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(responseData.result);
                        this.saveData(url,responseData.result)
                }).done();

        })
    }

    removeData(url) {
        AsyncStorage.removeItem(url, (error, result)=> {
            if(error)console.log(error);
        });
    }

    checkDate(longTime) {
        let currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(longTime);
        if (currentDate.getMonth() !== targetDate.getMonth())return false;
        if (currentDate.getDate() !== targetDate.getDate())return false;
        if (currentDate.getHours() - targetDate.getHours() > 4)return false;
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }
}
