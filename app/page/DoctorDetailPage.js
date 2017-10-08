/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableOpacity,
    Image
} from 'react-native';
import NavigationBar from '../widget/NavigationBar'
import ViewUtils from '../utils/ViewUtils'
import AboutCommon from '../common/AboutCommon'

export default class DoctorDetailPage extends  Component {
    static navigationOptions = {
        header:  true,
    };

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic)=>this.updateState(dic));

        const { params } = this.props.navigation.state;
        var item =  this.props


        var description = item.intro
        var name = item.cname
        var icon = item.icon

        this.state = {
        //    theme: this.props.theme,
            description:description,
            name:name,
            icon:icon,

        }
    }
    updateState(dic) {
        this.setState(dic);
    }
    // onBack() {
    //     this.props.navigator.pop();
    // }

    render() {


        let content=<View>
            {this.aboutCommon.renderItem('所屬專科', '婦科' )}
            {this.aboutCommon.renderItem('介紹', this.state.description )}

        </View>

        return this.aboutCommon.render(content, {
            'name': this.state.name,
            'description': '',
            'avatar': this.state.icon,
            'backgroundImg':'http://www.rui2.net/uploadfile/output/2015/0322/44b845bf8ae757a2.jpg',
        });


        /**
        return (
            <View style={styles.container}>
                <NavigationBar
                    navigator={this.props.navigator}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    popEnabled={false}
                    style={this.state.theme.styles.navBar}
                 //   title={this.state.title}
             //       titleLayoutStyle={titleLayoutStyle}
                   // rightButton={this.renderRightButton()}
                />
                <Image source={{uri:this.state.image}} style={styles.imgStyle}/>
                <WebView
                    startInLoadingState={true}
                   // onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{html: this.state.description, baseUrl: ''}}
                />


            </View>

        );  */
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // marginBottom: Platform.OS === "ios" ? 50 : 0,
    },

    imgStyle:{
        width:90,
        height:90
    },

})
