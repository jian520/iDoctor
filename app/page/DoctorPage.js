/**
 * Created by jian on 2017/5/31.
 */
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


import Popover from "../widget/Popover";
import Dept from '../model/Dept'
import Area from '../model/Area'
import API from '../constants/API'

import MPColor from '../common/Colors'
import DropdownMenu from 'react-native-dropdown-menu'


var timeSpanTextArray = [new Dept('Today', 'since=daily'),
    new Dept('This Week', 'since=weekly'), new Dept('This Month', 'since=monthly')]

var dataRequest = new DataRequest()

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

// 全局的变量
var cols = 2;
var vMargin = 10;//(width - cellW * cols) / (cols + 1);
var cellW = Platform.OS == 'ios' ? (width - vMargin * 3) / cols : (width - vMargin * 3) / cols;
var cellH = cellW;



export default class DoctorPage extends PureComponent {

    constructor(props) {
        super(props);


        this.state = {
            isVisible: false,
            buttonRect: {},
            // dept: new Dept(0, '科室'),


            menuData: [["地區"], ["專科"]],

            isLoading: false,
            isLoadingFail: false,

            //    theme: this.props.theme,
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })

        }

        this.district = 0
        this.category = 0


    }


    static get defaultProps() {
        return {
            deptModels: [new Dept(0, '專科')],
            areaModels: [new Area(0, '地區')],
            district:0,
            category:0,

        }
    }


    // onSubscriber = (preTab, currentTab) => {
    //     var changedValues = this.props.homeComponent.changedValues;
    //     if (changedValues.my.themeChange && preTab.styles) {
    //         this.setState({
    //             theme: preTab
    //         })
    //         //    this.updateFavorite();//更新favoriteIcon
    //         return;
    //     }
    //     // if (currentTab != FLAG_TAB.flag_popularTab)return;
    //     // if (FLAG_TAB.flag_favoriteTab === preTab && changedValues.favorite.popularChange) {//从收藏页面切换过来,且Trending收藏有改变
    //     // changedValues.favorite.popularChange = false;
    //     //   this.updateFavorite();
    //     // }
    //
    // }

    componentDidMount() {
        //    this.props.homeComponent.addSubscriber(this.onSubscriber);
        this.loadAreaData()

        this.loadDeptData();
        this.loadData(true);

    }

    loadAreaData() {

        let url = API.AREA_LIST
        dataRequest.fetchData(url).then((wrapData) => {
            let items = wrapData && wrapData.items ? wrapData.items : wrapData ? wrapData : [];
            this.convertToArea(items)
            if (wrapData && wrapData.date && !dataRequest.checkDate(wrapData.date))
                return dataRequest.fetchNet(url);
        }).then((items) => {
            if (!items || items.length === 0)return;
            this.convertToArea(items)

        }).catch((error) => {
            console.log(error);

        })
    }

    loadDeptData() {

        let url = API.DEPT_LIST + '1'
        dataRequest.fetchData(url).then((wrapData) => {
            let items = wrapData && wrapData.items ? wrapData.items : wrapData ? wrapData : [];
            this.convertToDeptModels(items)

            if (wrapData && wrapData.date && !dataRequest.checkDate(wrapData.date))
                return dataRequest.fetchNet(url);
        }).then((items) => {
            if (!items || items.length === 0)return;
            this.convertToDeptModels(items)

        }).catch((error) => {
            console.log(error);

        })
    }

    convertToArea(items) {
        var areas = ["地區"]
        for (var i = 0, len = items.length; i < len; i++) {
            this.props.areaModels.push(new Area(items[i].id, items[i].name))
            areas.push(items[i].name)
        }

        var depts = this.state.menuData[1]

        this.setState({
            menuData: [areas, depts]
        });
    }

    convertToDeptModels(items) {

        var depts = ['專科'];
        for (var i = 0, len = items.length; i < len; i++) {
            this.props.deptModels.push(new Dept(items[i].descriptions[0].category_id, items[i].descriptions[0].name))
            depts.push(items[i].descriptions[0].name)
        }

        var areas = this.state.menuData[0]

        this.setState({
            menuData: [areas, depts]
        });
    }


    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }


    /*


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

     onSelectDept(dept) {
     this.closePopover();
     this.setState({
     dept: dept
     })
     console.log(dept)

     this.timer = setTimeout(() => {
     this.loadData(true);
     }, 50);


     }

     renderTitleView() {
     return <View >
     <TouchableHighlight
     ref='button'
     underlayColor='transparent'
     onPress={() => this.showPopover()}>
     <View style={{flexDirection: 'row', alignItems: 'center'}}>
     <Text style={{
     fontSize: 18,
     color: '#FFFFFF',
     fontWeight: '400'
     }}>  {this.state.dept.name}</Text>
     <Image
     style={{width: 12, height: 12, marginLeft: 5}}
     source={require('../images/ic_spinner_triangle.png')}
     />
     </View>
     </TouchableHighlight>
     </View>
     }
     */

    loadData(isRefresh) {
        this.updateState({
            isLoading: true,
            isLoadingFail: false,
        });

        let url = ''
        if (this.district == 0 && this.category == 0) {

            url = API.DOCTOR_LIST// + language;   ;

        } else if (this.district != 0 && this.category != 0) {

            url = API.DOCTOR_LIST + '?district=' + this.district + '&category=' + this.category

        } else if (this.district != 0 && this.category == 0) {

            url = API.AREA_DOCTOR + this.district

        } else if (this.district == 0 && this.category != 0) {

            url = API.DEPT_DOCTOR + +this.category

        }
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
                      refreshControl={
                          <RefreshControl
                              refreshing={this.state.isLoading}
                              onRefresh={() => this.onRefresh()}
                              //  tintColor={this.props.theme.themeColor}
                              title="加載中..."
                              // titleColor={this.props.theme.themeColor}
                              // colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                          />}
            />

        var dropMenu = <DropdownMenu
            //   arrowImg={require('../images/dropdown_arrow.png')}      //set the arrow icon, default is a triangle
            //   checkImage={require('../images/menu_check.png')}    //set the icon of the selected item, default is a check mark
            bgColor={MPColor.mainColor}                            //the background color of the head, default is grey
            tintColor={"white"}                        //the text color of the head, default is white
            selectItemColor={"red"}                    //the text color of the selected item, default is red
            data={this.state.menuData}
            maxHeight={410}                            // the max height of the menu
            handler={(selection, row) => this.selectMenu(selection, row)}>

            <View style={{flex: 1}}>
                {content}
            </View>

        </DropdownMenu>

        /**
         let timeSpanView =
         <Popover
         isVisible={this.state.isVisible}
         fromRect={this.state.buttonRect}
         placement="bottom"
         onClose={() => this.closePopover()}
         contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
         >

         <ScrollView style={{height: 300}}
         contentInset={{top: 0, left: 0, right: 0, bottom: 0}}


         contentContainerStyle={{paddingBottom: 0}}>


         {this.state.depts.map((result, i, arr) => {
             return <TouchableHighlight key={i} onPress={() => this.onSelectDept(arr[i])}
                                        underlayColor='transparent'>
                 <Text
                     style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                     {arr[i].name}
                 </Text>
             </TouchableHighlight>
         })
         }
         </ScrollView>
         </Popover>
         */
        return (

            <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                {/*{navigationBar}*/}
                {dropMenu}

                {/*{timeSpanView}*/}
            </View>

        );
    }

    selectMenu(selection, row) {
        //alert(selection)
        if (selection == 0) {
            let area = this.props.areaModels[row]
            this.district = area.id

        } else {
            let dept = this.props.deptModels[row]

            this.category = dept.deptid
        }
        this.loadData(true)


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
                subTitle=''
            />
        );

        //
        // return (
        //
        //
        //     <TouchableHighlight
        //         onPress={() => {
        //             this.pushToDetail( rowData )
        //         }}
        //         onShowUnderlay={this.props.onHighlight}
        //         underlayColor='transparent'
        //         onHideUnderlay={this.props.onUnhighlight}
        //
        //     >
        //         <View style={styles.cellViewStyle}>
        //             <Image source={{uri: icon}} style={styles.imgStyle}/>
        //
        //             {/*<View style={{*/}
        //                 {/*position: 'absolute',*/}
        //                 {/*top: 0,*/}
        //                 {/*width: cellW,*/}
        //                 {/*backgroundColor: 'rgba(0,0,0,.4)',*/}
        //                 {/*height: cellH*/}
        //             {/*}}/>*/}
        //             <Text style={styles.titleStyle}>{rowData.cname}</Text>
        //         </View>
        //     </TouchableHighlight>
        // );
    }


    pushToDetail(rowData) {
        console.log(rowData)
       this.props.navigation.navigate('DoctorDetailPage',{ item: rowData} )


        // this.props.navigator.push({
        //     title: 'ddd',
        //     component: DoctorDetailPage,
        //     params: {
        //         item: rowData,
        //         parentComponent: this,
        //         ...this.props
        //     },
        // });

    }
}


const styles = StyleSheet.create({
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