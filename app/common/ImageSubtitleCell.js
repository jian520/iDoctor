'use strict';

import React, {Component} from 'react'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Alert,
    Dimensions
} from 'react-native'
import GlobalStyles  from '../constants/GlobalStyles'

import MPColors from './Colors'
// import {CachedImage} from "react-native-img-cache";
export const {height, width} = Dimensions.get('window');

export default class ImageSubtitleCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {//当从当前页面切换走，再切换回来后
        //  this.setFavoriteState(nextProps.projectModel.isFavorite)
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onSelect}
                onShowUnderlay={this.props.onHighlight}
                underlayColor='transparent'
                onHideUnderlay={this.props.onUnhighlight}>
                <View style={styles.cell_container}>
                    <Image style={styles.imgStyle} source={{uri: this.props.image}}/>
                    {/*右边*/}
                    <View style={styles.rightViewStyle}>
                        <Text style={styles.titleStyle}>{this.props.title}</Text>

                        <Text style={styles.subTitleStyle}>{this.props.subTitle}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    cell_container: {
        flex: 1,
        backgroundColor: 'white',
        // 确定主轴的方向
        flexDirection: 'row',
        // 设置侧轴的对齐方式
        alignItems: 'center',
        padding: 10,
      //  marginLeft: 5,
      //  marginRight: 5,
      //  marginVertical: 3,
          borderBottomColor: '#dddddd',
      //  borderStyle: null,
          borderBottomWidth: 0.5,
      //  borderRadius: 2,
     //   shadowColor: 'gray',
     //   shadowOffset: {width: 0.5, height: 0.5},
      //  shadowOpacity: 0.4,
      //  shadowRadius: 1,
       // elevation: 2
    },

    rightViewStyle: {
        width: width - 120,
        marginLeft: 8,
        justifyContent: 'center',
    },

    imgStyle: {
        resizeMode: 'cover',
        width: 90,
        height: 90
    },

    titleStyle: {
        fontSize: 16,
        marginBottom: 2,
        color: MPColors.titleColor,

    },

    subTitleStyle: {
        paddingRight: 10,
        fontSize: 14,
        color:MPColors.subTitleColor,

    },

});

