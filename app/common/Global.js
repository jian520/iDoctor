
import {
    Dimensions
} from 'react-native';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default  {
    // //屏幕尺寸

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    validateEmail,

};

