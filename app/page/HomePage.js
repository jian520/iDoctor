
import React, {PureComponent} from 'react';

import {
    StyleSheet,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import ClinicPage from './ClinicPage'
import DoctorPage from './DoctorPage'
import IndexPage from './index/IndexPage'
import MyPage from './MyPage'
import LoginPage from './LoginPage'
import Service from '../services/Service'
import MPColor from '../common/Colors'
import ArrayUtils from '../utils/ArrayUtils'

export var FLAG_TAB = {
    flag_clinicTab: 'flag_clinicTab',
    flag_doctorTab: 'flag_doctorTab',
    flag_indexTab: 'flag_indexTab',
    flag_myTab: 'flag_myTab'
}
const service = new Service()

export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.subscribers = [];
        this.changedValues = {
            favorite: {popularChange: false, trendingChange: false},
            my: {languageChange: false, keyChange: false, themeChange: false}
        };
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_clinicTab;
        this.state = {
            selectedTab: selectedTab,
            theme: this.props.theme,

          //  page: LoginPage,
        };
    }

    checkLogout(flag) {

        if (flag) {
          //  this.setState({page: MyPage});
        } else {
         //   this.setState({page: LoginPage});
        }
        console.log("didLogoutdidLogoutdidLogout"    )

    }

    componentWillMount () {

        service.getUserFromCache()
            .then((user) => {
                console.log("user.id"   +user.id  )

                if (user.id == 0) {
                  //  this.setState({page: LoginPage})
                } else {
                 //   this.setState({page: MyPage});
                }

            });
    }

    componentDidMount() {
       DeviceEventEmitter.addListener('LOGOUT', (e) => {
            if (e) {
            //  this.setState({page: LoginPage})
            } else {
             //   this.setState({page: MyPage});
            }
        });
    }

    addSubscriber(subscriber) {
        ArrayUtils.add(this.subscribers, subscriber);
    }

    removeSubscriber(subscriber) {
        ArrayUtils.remove(this.subscribers, subscriber);
    }

    onSelected(object) {
        // if (this.updateFavorite && 'popularTab' === object)this.updateFavorite(object);

        if (object !== this.state.selectedTab) {
            this.subscribers.forEach((item, index, arr) => {
                if (typeof(item) == 'function') item(this.state.selectedTab, object);
            })
        }

        // if(object===FLAG_TAB.flag_indexTab)
        //   this.changedValues.favorite.popularChange=false;
        //   if(object===FLAG_TAB.flag_trendingTab)
        //     this.changedValues.favorite.trendingChange=false;

        this.setState({
            selectedTab: object,
        })

    }

    onReStart(jumpToTab) {
        this.props.navigator.resetTo({
            component: HomePage,
            name: 'HomePage',
            params: {
                ...this.props,
                theme: this.state.theme,
                selectedTab: jumpToTab,
            }
        });
    }

    onThemeChange(theme) {
        if (!theme)return;
        this.setState({
            theme: theme
        })
        this.changedValues.my.themeChange = true;
        this.subscribers.forEach((item, index, arr) => {
            if (typeof(item) == 'function') item(theme);
        })
        this.changedValues.my.themeChange = false;
    }

    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{color:MPColor.mainColor}}
                renderIcon={() => <Image style={styles.tabBarIcon}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image
                    style={[styles.tabBarSelectedIcon, {tintColor:MPColor.mainColor}]}
                    source={renderIcon}/>}
                onPress={() => this.onSelected(selectedTab)}>
                <Component {...this.props} theme={this.state.theme} homeComponent={this} navigator={this.props.navigator}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}
                >
                    {this._renderTab(ClinicPage, FLAG_TAB.flag_clinicTab, '診所', require('../images/ic_tabbar_clinic_n.png'))}
                    {this._renderTab(DoctorPage, FLAG_TAB.flag_doctorTab, '醫生', require('../images/ic_tabbar_doctor.png'))}
                    {this._renderTab(IndexPage, FLAG_TAB.flag_indexTab, '首页', require('../images/ic_tabbar_home.png'))}
                    {this._renderTab(MyPage, FLAG_TAB.flag_myTab, '我', require('../images/ic_tabbar_me_normal.png'))}
                </TabNavigator>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#fff',
    },
    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
        // tintColor:'#4caf50'
    }
})
