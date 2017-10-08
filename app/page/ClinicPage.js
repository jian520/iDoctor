/**
 * Created by jian on 2017/5/31.
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Image,
    RefreshControl,
    Platform,
    ScrollView,
    ListView
} from 'react-native';
import SGListView from 'react-native-sglistview';

import NavigationBar from '../widget/NavigationBar'
import ViewUtils from '../utils/ViewUtils'
import Popover from "../widget/Popover";
import MoreMenu, {MORE_MENU} from '../common/MoreMenu'
import DataRequest from '../common/DataRequest'
import GlobalStyles from '../constants/GlobalStyles'
import ClinicDetailPage from './ClinicDetailPage'
import ImageSubtitleCell from '../common/ImageSubtitleCell'
import {FLAG_TAB} from './HomePage'
import MPColor from '../common/Colors'
import API from '../constants/API'
import Global from '../common/Global'


var Dimensions = require('Dimensions');
 

var dataRequest = new DataRequest()


export default class ClinicPage extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: '診所',
     //   headerStyle: { backgroundColor: 'white' },
    })


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingFail: false,
            //   theme: this.props.theme,
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }


    }

    // static get defaultProps() {
    //     return {
    //         url_api: "http://www.part-times.com/mobile/clinics?language=1",
    //         key_word: "result",
    //
    //
    //     }
    // }


    componentDidMount() {
        //   this.props.homeComponent.addSubscriber(this.onSubscriber);
        this.loadData(true);
        //  this.loadDataFromNet();
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
        let url =  API.CLINIC_LIST + '1'
        console.log(url)
        dataRequest.fetchData(url).then((wrapData) => {
            console.log('wrapData  ')

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
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(e) => this.renderRow(e)}
                contentInset={{top: 0, left: 0, right: 0, bottom: 0}}

                // renderFooter={() => {
                //     return <View style={{height: 50}}/>
                // }}
                //
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                        //    tintColor={this.props.theme.themeColor}
                        title="加載中..."
                        //   titleColor={this.props.theme.themeColor}
                        //     colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                    />}

            />;

        var statusBar = {
             backgroundColor: MPColor.mainColor,
        }
        // let navigationBar =
        //     <NavigationBar
        //         title='診所'
        //         style={{backgroundColor:MPColor.mainColor}}
        //         rightButton={this.renderMoreButton()}
        //         statusBar={statusBar}
        //         hide={false}/>;


        return (
            <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                {/*{navigationBar}*/}
                {content}
                {this.renderMoreView()}
            </View>
        );
    }

    // 单独的一个cell
    renderRow(rowData) {

        let {navigator} = this.props;
        return (
            <ImageSubtitleCell
                key={rowData.id}
                onSelect={() => this.pushToDetail(  rowData )   }
                //   theme={this.state.theme}
                {...{navigator}}
                image={rowData.image}
                title={rowData.descriptions[0].name}
                subTitle={rowData.descriptions[0].address}
            />
        );
    }

    pushToDetail(rowData) {

        this.props.navigation.navigate('ClinicDetailPage', {item: rowData})

        // this.props.navigator.push({
        //     title: '',
        //     component: ClinicDetailPage,
        //     params: {
        //         item: rowData,
        //         parentComponent: this,
        //         ...this.props
        //     },
        // });


    }
}


const styles = StyleSheet.create({});
