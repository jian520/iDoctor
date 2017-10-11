/**
 * @flow
 */
import React, {PureComponent, PropTypes} from 'react';
import {Button, View, ScrollView, StatusBar} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './common/Colors'
import ClinicPage from './page/ClinicPage'
import ClinicDetailPage from './page/ClinicDetailPage'
import DoctorPage from './page/DoctorPage'
import DoctorDetailPage from './page/DoctorDetailPage'
import IndexPage from './page/index/IndexPage'
import MyPage from './page/MyPage'

import AboutPage from './page/my/AboutPage'
import RegPage from './page/RegPage'
import LoginPage from './page/LoginPage'
import WelcomePage from './page/WelcomePage'

import SplashScreen from 'react-native-splash-screen'
import TabBarItem from './widget/TabBarItem'


function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// create a component
export default class Root extends PureComponent {
    constructor() {
        super()

        StatusBar.setBarStyle('light-content')
    }

    componentDidMount() {
        //    SplashScreen.hide()

    }

    render() {
        return (
            <Nav
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            // if (lightContentScenes.indexOf(currentScene) >= 0) {
                            //     StatusBar.setBarStyle('light-content')
                            // } else {
                            //     StatusBar.setBarStyle('dark-content')
                            // }
                        }
                    }
                }
            />
        );
    }
}

export const Tabs = TabNavigator(
    {
        ClinicTab: {
            screen: ClinicPage,
            //     path: '/',
            navigationOptions: ({navigation}) => ({
                //    header:true,

                tabBarLabel: '診所',
                tabBarIcon: ({tintColor, focused}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/ic_tabbar_clinic_n.png')}
                        selectedImage={require('./images/ic_tabbar_clinic_n.png')}
                    />
                ),
            }),
        },

        DoctorTab: {
            screen: DoctorPage,
            //   path: '/',
            navigationOptions: {
                title: '醫生',
                tabBarLabel: '醫生',
                tabBarIcon: ({tintColor, focused}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/ic_tabbar_doctor.png')}
                        selectedImage={require('./images/ic_tabbar_doctor.png')}
                    />
                ),
            },
        },

        IndexTab: {
            screen: IndexPage,
            path: '/',
            navigationOptions: {

                tabBarLabel: '首页',
                tabBarIcon: ({tintColor, focused}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/ic_tabbar_home.png')}
                        selectedImage={require('./images/ic_tabbar_home.png')}
                    />
                ),
            },
        },

        //  ScanTab: {
        //     screen: ClinicPage,
        //     path: '/',
        //     navigationOptions: {
        //         title: ' ',
        //         tabBarLabel: ' ',
        //         tabBarIcon: ({tintColor, focused}) => (
        //             <Ionicons
        //                 name={focused ? 'ios-home' : 'ios-home-outline'}
        //                 size={26}
        //                 style={{color: tintColor}}
        //             />
        //         ),
        //     },
        // },
        MyTab: {
            screen: MyPage,
            //  path: '/settings',
            navigationOptions: {

                tabBarLabel: '我',
                tabBarIcon: ({tintColor, focused}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/ic_tabbar_me_normal.png')}
                        selectedImage={require('./images/ic_tabbar_me_normal.png')}
                    />
                ),
            },
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            activeTintColor: Colors.mainColor, // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片未选中颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                // height: 44
            },
            labelStyle: {
                fontSize: 10, // 文字大小
            },
        },

    }
);


//StackNavigator(RouteConfigs, StackNavigatorConfig)
export const Nav = StackNavigator({
        Tabs: {
            screen: Tabs,
        },
        ClinicDetailPage: {
            screen: ClinicDetailPage,

        },
        DoctorDetailPage: {
            screen: DoctorDetailPage,

        },
        LoginPage: {
            screen: LoginPage,
        },
        RegPage: {
            screen: RegPage,

        },
        WelcomePage: {
            screen: WelcomePage,

        },

        AboutPage: {
            screen: AboutPage,
            //     path: '/people/:name',//使用url导航时用到, 如 web demo 和 Deep Linking

        },

    },
    {
        navigationOptions: {
            //    header:true,
            headerBackTitle: null,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: Colors.mainColor},

        },

        /**

         mode: 'modal',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
         headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
         onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
         onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
         */
    }
);

export const Welcome = StackNavigator({
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: true,
            }
        },
        Root: {
            screen: Root,
            navigationOptions: {
                header: true,
            }
        },

    }
);

