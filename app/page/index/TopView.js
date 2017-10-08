import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';


import DoctorListPage from '../DoctorListPage'
import Global from '../../common/Global'


// 全局的变量
var cols = 4;
var cellW = Platform.OS == 'ios' ? 70 : 60;
var cellH = 70;
var vMargin = (Global.width - cellW * cols) / (cols + 1);


// 引入外部的json数据
var TopMenu = require('../../data/TopMenu.json');

export default class TopView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        };

    }

    getDataSource() {
        return this.state.dataSource.cloneWithRows(this.items);
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    componentDidMount() {
        this.items = TopMenu.data;
        this.updateState({
            dataSource: this.getDataSource(),
        });
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(e) => this.renderRow(e)}
                    contentContainerStyle={styles.contentViewStyle}
                    scrollEnabled={false}
                />
            </View>
        );
    }

    // 具体的cell
    renderRow(rowdata) {

        let icon = typeof(rowdata.imageName) === 'string' ? {uri: rowdata.imageName} : rowdata.imageName;

        return (
            <TouchableOpacity onPress={ (e) => {this.pushToDoctor(rowdata)}   }>
                <View style={styles.cellStyle}>

                    <Image source={icon} style={{width: 52, height: 52}}/>
                    <Text style={styles.titleStyle}>{rowdata.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    pushToDoctor(rowdata) {


        this.props.navigator.push({
            title: '',
            component: DoctorListPage,
            params: {
                item: rowdata,
                parentComponent: this,
                ...this.props
            },
        });

    }


}


const styles = StyleSheet.create({
    contentViewStyle: {
        backgroundColor:'white',
        // 设置主轴的方向
        flexDirection: 'row',
        // 多个cell在同一行显示
        flexWrap: 'wrap',
        // 宽度
        width: Global.width
    },

    cellStyle: {
        // backgroundColor:'red',
        width: cellW,
        height: cellH,
        // 水平居中和垂直居中
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: vMargin
    },

    titleStyle: {
        fontSize: Platform.OS == 'ios' ? 14 : 12,
        color: 'gray'
    }
});