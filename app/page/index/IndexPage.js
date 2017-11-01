/**
 * Created by jian on 2017/5/31.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    ListView,
    Button,
    RefreshControl
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';
import SGListView from 'react-native-sglistview';

import NavigationBar from '../../widget/NavigationBar'
import DataRequest from '../../common/DataRequest'
import GlobalStyles from '../../constants/GlobalStyles'

import TopView from './TopView'

import MoreMenu, {MORE_MENU} from '../../common/MoreMenu'
import ImageSubtitleCell from '../../common/ImageSubtitleCell'

import ClinicDetailPage from '../ClinicDetailPage'

import SwiperImage from './SwiperImage'
import Swiper from 'react-native-swiper'
import MPColor from '../../common/Colors'
import Global from '../../common/Global'

import Modal from 'react-native-modalbox';

const API_URL = 'http://www.part-times.com/mobile/clinics?language='
var dataRequest = new DataRequest()


export default class IndexPage extends Component {
    // static navigationOptions = {
    //     header:  true,
    // };
    // static navigationOptions = ({ navigation }) => ({
    //     title: '首页',
    //      header:  true,
    // })

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingFail: false,
            //   theme: this.props.theme,

            // ListView头部的数据源
            headerDataArr: [],
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),


        };


    }

    static get defaultProps() {
        return {
            url_api: "",
            key_word: "items"
        }
    }


    componentDidMount() {

        this.loadData(true);

    }

    genFetchUrl(language) {
        return API_URL + language;
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    loadData(isRefresh) {
        this.updateState({
            isLoading: true,
            isLoadingFail: false,
        });
        let url = this.genFetchUrl('1');
        dataRequest.fetchData(url).then((wrapData) => {
            console.log('wrapData index ')

            console.log(wrapData)

            this.items = wrapData && wrapData.items ? wrapData.items : wrapData ? wrapData : [];
            this.updateState({
                isLoading: false,
                isLoadingFail: false,
                dataSource: this.getDataSource(),
            });
            if (isRefresh && wrapData && wrapData.date && !dataRequest.checkDate(wrapData.date))
                return dataRequest.fetchNet(url);
        }).then((items) => {
            if (!items || items.length === 0)return;
            this.items = items;
            this.updateState({
                isLoading: false,
                isLoadingFail: false,
                dataSource: this.getDataSource(),
            });

        }).catch((error) => {
            console.log(error);
            this.updateState({
                isLoading: false,
                isLoadingFail: true,
            });
        })
    }

    onRefresh() {
        this.loadData(true);
    }

    getDataSource() {
        return this.state.dataSource.cloneWithRows(this.items);
    }

    renderMoreButton() {

        return (
            <View style={{flexDirection: 'row',}}>

                {ViewUtils.getMoreButton(() => this.refs.moreMenu.open())}
            </View>)
    }

    renderMoreView() {
        let params = {...this.props, theme: this.state.theme, fromPage: FLAG_TAB.flag_clinicTab}
        return <MoreMenu
            {...params}
            ref='moreMenu'
            menus={[MORE_MENU.Cooperation, MORE_MENU.About]}
            contentStyle={{right: 20}}
            onMoreMenuSelect={(e) => {
                if (e === 'Custom Theme') {
                    this.setState({customThemeViewVisible: true});
                }
            }}
            anchorView={this.refs.moreMenuButton}
            navigator={this.props.navigator}/>
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    render() {

        var content =
            <ListView contentInset={{top: 0, left: 0, right: 0, bottom: 50}}
                      dataSource={this.state.dataSource}
                      renderRow={(e) => this.renderRow(e)}
                      renderHeader={() =>this.renderHeader()}
                // renderFooter={() => {
                //     return <View style={{height: 50}}/>
                // }}
                      refreshControl={
                          <RefreshControl
                              refreshing={this.state.isLoading}
                              onRefresh={() => this.onRefresh()}
                              //           tintColor={this.props.theme.themeColor}
                              title="加載中..."
                              //         titleColor={this.props.theme.themeColor}
                              //       colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                          />}
            />;

        //
        // let navigationBar =
        //     <NavigationBar
        //         title='首頁'
        //         style={{backgroundColor: MPColor.mainColor}}
        //         //      rightButton={this.renderMoreButton()}
        //         statusBar={{backgroundColor: MPColor.mainColor}}
        //         //    titleView={this.renderTitleView()}
        //     />


        return (
            <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                {/*{navigationBar}*/}


                {content}


            </View>
        );
    }


    // 单独的一个cell
    renderRow(rowData) {

        let {navigator} = this.props;
        return (
            <ImageSubtitleCell
                key={rowData.id}
                onSelect={() => this.pushToDetail(rowData)   }
                theme={this.state.theme}
                {...{navigator}}
                image={rowData.image}
                title={rowData.descriptions[0].name}
                subTitle={rowData.descriptions[0].address}
            />
        );
    }


    pushToDetail(rowData) {

        this.props.navigation.navigate('ClinicDetailPage', {item: rowData})

    }

    // 头部
    renderHeader() {

        return (
            <View>
                <SwiperImage  { ...this.props}     />
                <TopView  { ...this.props}   />
            </View>
        )


    }


}


const styles = StyleSheet.create({

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
        flex: 1
    }

});


