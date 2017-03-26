/**
 * Created by ken on 3/24/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
    Button
} from 'react-native';

export default class Filter extends Component {
    render() {
        const {navigator} = this.props;
        return (
            <View>
                <Button title="Back"
                        onPress={() => this._goBack(navigator)}
                />
            </View>
        )
    }

    _goBack = (navigator) => {
        navigator.pop()
    }
}