import {
  AsyncStorage,
  Navigator,
} from 'react-native'

import API from '../constants/API'
import xFetch from './xFetch'

function toQueryString(obj) {
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


export const basicLogin = async(email, pwd) => {
    let param = {'email': email, 'password': pwd};

    console.log( param)
  //  API.LOGIN 'http://rapapi.org/mockjs/20504/login'
    return await xFetch(API.LOGIN, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: toQueryString(param)
  })

}


