/**
 * Created by ken on 3/24/17.
 */
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import React, {Component} from 'react';
import {settingReducer} from './utils/reducer';

import Home from './views/home';

const store = createStore(settingReducer);

export default class App extends Component {

    _renderScene = (route, navigator) => {
        return (
            <route.component navigator={navigator}/>
        );
    };

    render() {
        const defaultRoute = {
            component: Home,
        };

        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={defaultRoute}
                    renderScene={this._renderScene}
                    style={{paddingTop: 40}}
                />
            </Provider>
        );
    }
}