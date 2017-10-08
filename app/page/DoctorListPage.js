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
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
    ScrollView,
    ListView,
    RefreshControl
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../widget/NavigationBar'
import DataRequest from '../common/DataRequest'
import GlobalStyles from '../constants/GlobalStyles'
import DoctorDetailPage from './DoctorDetailPage'
import DoctorCell from './DoctorCell'

import ViewUtils from '../utils/ViewUtils'

import Popover from "../widget/Popover";
import Dept from '../model/Dept'
import Area from '../model/Area'
import API from '../constants/API'

import MPColor from '../common/Colors'
import Global from '../common/Global'
import Loading from '../common/Loading'

import DropdownMenu from 'react-native-dropdown-menu'


var dataRequest = new DataRequest()

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


export default class Doctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            buttonRect: {},

            isLoading: false,
            isLoadingFail: false,

            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })

        }
    }

    componentDidMount() {
        this.loadData(true);

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
        // console.log(this.state.dept.deptid )
        let url = ''
        // if (this.state.dept.deptid == 0) {
        url = API.DOCTOR_LIST// + language;   ;
        //} //else {
        //    url = API.DEPT_DOCTOR + this.state.dept.deptid
        // }
        console.log(url)
        dataRequest.fetchData(url).then((wrapData) => {

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

    render() {

        let navigationBar =
            <NavigationBar
                title='醫生'
                style={{backgroundColor: MPColor.mainColor}}
                //      rightButton={this.renderMoreButton()}
                statusBar={{backgroundColor: MPColor.mainColor}}
                // titleView={this.renderTitleView()}
                leftButton={ViewUtils.getLeftButton(() => this.props.navigator.pop())}
            />


        var content =
            <ListView contentInset={{top: 0, left: 0, right: 0, bottom: 0}}
                      ref="listView"
                // contentContainerStyle={styles.contentViewStyle}
                      dataSource={this.state.dataSource}
                      renderRow={(e) => this.renderRow(e)}
                // renderFooter={() => {
                //     return <View style={{height: 50}}/>
                // }}
                // refreshControl={
                //  <RefreshControl
                //  refreshing={this.state.isLoading}
                //   onRefresh={() => this.onRefresh()}
                //  tintColor={this.props.theme.themeColor}
                //    title="加載中..."
                // titleColor={this.props.theme.themeColor}
                // colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                //>}
            />

        if (this.state.isLoading) {
            return (
                <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                    {navigationBar}
                    <Loading/>
                </View>


            )
        } else {
            return (
                <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                    {navigationBar}
                    {content}
                </View>
            )
        }
    }

    selectMenu(selection, row) {
        alert(selection)

    }

    renderRow(rowData) {
        let icon = rowData.icon ? API.DOCTOR_AVATAR + rowData.icon : 'doctor_no_image_g';
        rowData.icon = icon

        return (
            <DoctorCell
                key={rowData.id}
                onSelect={() => this.pushToDetail(rowData)   }
                //   theme={this.state.theme}
                {...{navigator}}
                image={rowData.icon}
                title={rowData.cname}
                // subTitle={rowData.descriptions[0].address}
            />
        )

    }


    pushToDetail(rowData) {
        //    this.props.navigation.navigate('DoctorDetailPage',{ item: rowData} )


        this.props.navigator.push({
            title: 'ddd',
            component: DoctorDetailPage,
            params: {
                item: rowData,
                parentComponent: this,
                ...this.props
            },
        });

    }
}

const
    styles = StyleSheet.create({
        contentViewStyle: {

            // 设置主轴的方向
            flexDirection: 'row',
            // 多个cell在同一行显示
            flexWrap: 'wrap',
            // 宽度
            width: width,

        },

        cellViewStyle: {
            backgroundColor: 'white',
            width: width,

            // 确定主轴的方向
            flexDirection: 'row',
            // 设置侧轴的对齐方式
            alignItems: 'center',


            //  height: cellH,
            // 水平居中和垂直居中
            //  justifyContent: 'center',

            marginTop: 10,
            //  marginLeft: vMargin
        },

        imgStyle: {
            width: 50,
            height: 50
        },

        titleStyle: {
            position: 'absolute',
            left: 10,
            bottom: 10,
            width: 100,
            fontSize: 20,
            backgroundColor: 'rgba(0,0,0,0.0)',
            color: 'white'
        },

    });