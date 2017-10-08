/**
 * Created by jianzhang on 2017/6/8.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
import Global from '../../common/Global'

import WebViewPage from '../../common/WebViewPage'

import Modal from 'react-native-modalbox';


const styles = {
    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width: Global.width,
        height: 200

    }
}

export default class SwiperImage extends Component {

    constructor(props) {
        super(props);
        this.state = {


        };


    }
    render() {
        return (
            <View>

                <Swiper style={styles.wrapper} height={150}
                        autoplay
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{
                            backgroundColor: 'rgba(0,0,0,.2)',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: '#000',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        paginationStyle={{
                            bottom: 10
                        }} loop>
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={ (e) => {
                            this.pushToWB()
                        }   }>
                            <Image resizeMode='stretch' style={styles.image}

                                   source={{uri: 'http://www.part-times.com/images/medi/home/1.jpg'}}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={ (e) => {
                            this.pushToWB()
                        }   }>
                            <Image resizeMode='stretch' style={styles.image}  source={{uri: 'http://www.part-times.com/images/medi/home/2.jpg'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={ (e) => {
                            this.pushToWB()
                        }   }>
                            <Image resizeMode='stretch' style={styles.image}   source={{uri: 'http://www.part-times.com/images/medi/home/3.jpg'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <TouchableOpacity onPress={ (e) => {
                            this.pushToWB()
                        }   }>
                            <Image resizeMode='stretch' style={styles.image}   source={{uri: 'www.part-times.com/images/medi/home/4.jpg'}}/>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }

    pushToWB() {

        //
        // this.props.navigator.push({
        //     component: WebViewPage,
        //     params: {
        //         title: '',
        //         url: 'https://www.baidu.com/',
        //         ...this.props
        //     },
        // });

    }
}


/**
 var slider = <Swiper style={styles.wrapper} height={150}
 autoplay
 onMomentumScrollEnd={(e, state, context) => {}}

 onTouchEnd={(e, state, context) => {
                                 this.props.navigator.push({
                                     component: WebViewPage,
                                     params: {
                                         title:'',
                                         url:'https://www.baidu.com/',
                                         ...this.props
                                     },
                                 });

                             }}




 dot={<View style={{
                                 backgroundColor: 'rgba(0,0,0,.2)',
                                 width: 5,
                                 height: 5,
                                 borderRadius: 4,
                                 marginLeft: 3,
                                 marginRight: 3,
                                 marginTop: 3,
                                 marginBottom: 3
                             }}/>}
 activeDot={<View style={{
                                 backgroundColor: '#000',
                                 width: 8,
                                 height: 8,
                                 borderRadius: 4,
                                 marginLeft: 3,
                                 marginRight: 3,
                                 marginTop: 3,
                                 marginBottom: 3
                             }}/>}
 paginationStyle={{
                bottom: 10
             }}
 loop>


 <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
 <TouchableOpacity onPress={ () => {

                     this.props.navigator.push({
                        component: WebViewPage ,
                        params: {
                            title:'',
                            url:'https://www.baidu.com/',
                            ...this.props
                        },
                    });


                } }>

 <Image resizeMode='stretch' style={styles.image} source={require('../../images/slider1.jpg')}/>
 </TouchableOpacity>
 </View>


 <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
 <Image resizeMode='stretch' style={styles.image} source={require('../../images/slider2.jpg')}/>
 </View>

 </Swiper>
 */