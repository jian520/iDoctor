/**
 *
 *
 * @flow
 */
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
} from 'react-native'
import GlobalStyles from '../constants/GlobalStyles'
import HTMLView from 'react-native-htmlview'
import WebViewPage from './WebViewPage'


export default class SubtitleCell extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }

    componentWillReceiveProps(nextProps) {//当从当前页面切换走，再切换回来后
      //  this.setFavoriteState(nextProps.projectModel.isFavorite)
    }



    render() {
      //  let item = this.props.projectModel.item? this.props.projectModel.item:this.props.projectModel;
        let TouchableElement = TouchableHighlight;

        let description='<p>'+this.props.subTitle+'</p>';
        return (
            <TouchableElement
                onPress={this.props.onSelect}
                onShowUnderlay={this.props.onHighlight}
                underlayColor='transparent'
                onHideUnderlay={this.props.onUnhighlight}>
                <View style={GlobalStyles.cell_container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',marginBottom:10}}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>

                    </View>
                    {/*<Text style={styles.description}>*/}
                    {/*{item.description}*/}
                    {/*</Text>*/}
                    <HTMLView
                        value={description}
                        // onLinkPress={(url) => {
                        //     this.props.navigator.push({
                        //         component: WebViewPage,
                        //         params: {
                        //             title:url,
                        //             url:url,
                        //             ...this.props
                        //         },
                        //     });
                        // }}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description,
                        }}
                    />
                 </View>
            </TouchableElement>
        );
    }
}


var styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex:1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
});

