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
//import NavigationBar from '../common/NavigationBar'
//import ViewUtils from '../../utils/ViewUtils'
import AboutCommon from '../common/AboutCommon'

export default class ClinicDetailPage extends  Component {

    static navigationOptions = {
        header:  true,
    };

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic)=>this.updateState(dic));

        const { params } = this.props.navigation.state;

     //   console.log("ddddd"+ params.item.image)

        var item =  params.item
        var imageUrl= item.image
        var description = item.descriptions[0].description
        var name = item.descriptions[0].name
        var address = item.descriptions[0].address

        this.state = {
      //      theme: this.props.theme,
            description:description,
            image:imageUrl,
            name:name,
            address:address
        }
    }

    updateState(dic) {
        this.setState(dic);
    }



    render() {

        let content=<View>
            {this.aboutCommon.renderItem('介紹', this.state.description )}

        </View>

        return this.aboutCommon.render(content, {
            'name': this.state.name,
            'description': this.state.address,
            'avatar':'doctor_no_image_g',
            'backgroundImg':this.state.image,
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
