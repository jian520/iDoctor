import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import {Root, Tabs, Welcome}  from './Root';

export default class App extends PureComponent {

    render() {

        return (
            <Provider store={store}>
                <Welcome />
            </Provider>
        )
    }
}

