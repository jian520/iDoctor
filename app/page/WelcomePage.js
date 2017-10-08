import React, {PureComponent} from 'react';
import {AppRegistry, StyleSheet, Text, View, Alert, Image} from 'react-native';
import { NavigationActions } from 'react-navigation'
import AppIntro from 'react-native-app-intro';

import HomePage from './HomePage'
import SplashScreen from 'react-native-splash-screen'

import Global from '../common/Global'


import {connect} from 'react-redux';


class WelcomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        // const {navigator} = this.props;
        // new ThemeDao().getTheme().then((data => {
        //     this.theme = data;
        //
        // }));
        //
        //
    }


    componentDidMount() {
     //   SplashScreen.hide()
        const {navigator} = this.props;

        // navigator.resetTo({
        //     component: HomePage,
        //     name: 'HomePage',
        //     // params: {theme: this.theme}
        // });


        // const {navigator} = this.props;
        //
        // navigator.resetTo({
        //     component: HomePage,
        //     name: 'HomePage',
        //     // params: {theme: this.theme}
        // });



    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    onSkipBtnHandle = (index) => {
        // const {navigator} = this.props;
        //
        // navigator.resetTo({
        //     component: HomePage,
        //     name: 'HomePage',
        //     // params: {theme: this.theme}
        // });



        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Root'}),

            ]
        })
        this.props.navigation.dispatch(resetAction)



    }
    doneBtnHandle = () => {


        //
        // const {navigator} = this.props;
        //
        // navigator.resetTo({
        //     component: HomePage,
        //     name: 'HomePage',
        //     // params: {theme: this.theme}
        // });


        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Root'}),
            ]
        })
        this.props.navigation.dispatch(resetAction)

    }
    nextBtnHandle = (index) => {


    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }

    render() {
        return (
            <AppIntro
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
            >
                <View style={[styles.slide, {backgroundColor: '#fa931d'}]}>

                    <Image style={{flex: 1, width: Global.width}}   source={{uri: 'http://www.part-times.com/images/medi/ad/1.jpg'}}/>

                </View>
                <View style={[styles.slide, {backgroundColor: '#a4b602'}]}>

                    <Image style={{flex: 1, width: Global.width}}  source={{uri: 'http://www.part-times.com/images/medi/ad/2.jpg'}}/>

                </View>

            </AppIntro>
        );
    }


}

// function select(store) {
//     return {
//         isLaunch: store.launchStore.isLaunch,
//     }
//
// }
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',

    },
    header: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic: {
        width: 75 * 2,
        height: 63 * 2,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    info: {
        flex: 0.5,
        alignItems: 'center',
        padding: 40
    },
    title: {
        color: '#fff',
        fontSize: 30,
        paddingBottom: 20,
    },
    description: {
        color: '#fff',
        fontSize: 20,
    },
});

export default WelcomePage // connect(select)(WelcomePage);