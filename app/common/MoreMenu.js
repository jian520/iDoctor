/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component,PropTypes} from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    Text,
    Image,
    Linking,
    View,
    ViewPropTypes
} from 'react-native'
import Popover from "../widget/Popover";
import AboutPage from '../page/my/AboutPage'
import CooperationPage from '../page/my/CooperationPage'


export const MORE_MENU = {

    Cooperation:'合作查詢',
    About:'關於我們',
    Login:'登陸',
}

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: ViewPropTypes.style,
        menus:PropTypes.array,
    }

    open() {
        this.showPopover();
    }

    showPopover() {
        if (!this.props.anchorView)return;
        let anchorView=this.props.anchorView;

        // if(anchorView instanceof FavoritePage){
        //     anchorView=anchorView.refs.moreMenuButton;
        // }
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({
            isVisible: false,
        });
        if (typeof(this.props.onClose) == 'function')this.props.onClose();
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        if (typeof(this.props.onMoreMenuSelect) == 'function')this.props.onMoreMenuSelect(tab);
        let TargetComponent, params={...this.props,menuType:tab};

        switch (tab) {
            case MORE_MENU.Cooperation:
                TargetComponent = CooperationPage
                break;
            case MORE_MENU.About:
                TargetComponent = AboutPage
                break;


        }

        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    renderMoreView() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            onClose={()=>this.closePopover()}
            contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
            contentMarginRight={20}
        >
            <View style={{alignItems: 'center',}}>
                {this.props.menus.map((result, i, arr) => {
                    return <TouchableHighlight key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                               underlayColor='transparent'>
                        <Text
                            style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                            {arr[i]}
                        </Text>
                    </TouchableHighlight>
                })
                }

            </View>
        </Popover>;
        return view;
    }

    render() {
        return (this.renderMoreView());
    }

}