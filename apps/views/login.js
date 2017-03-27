/**
 * Created by ken on 3/26/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
} from 'react-native';

import {actionCreators} from '../utils/reducer';
import {connect} from 'react-redux';

import Home from './home';

export class Login extends Component {
    render() {
        return (
            <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
                <Button
                    title="Login"
                    onPress={()=> this._login}
                />
            </View>
        )
    }

    _login = () => {
        this._fetchToken()

    }

    _fetchToken() {
        const params = {
            client_id: 'cPN8VF8ItzZocK_rmYTPbg',
            client_secret: 'xeMXgIJPwn4UWYfN10uCLL7J7SyF0bMRV2h6MTkMapNBpdC0oBWNg09JtTm5xPk6',
            grant_type: 'client_credentials'
        }

        const request = new Request('https://api.yelp.com/oauth2/token', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            }),
            body: `client_id=${params.client_id}&client_secret=${params.client_secret}&grant_type=${params.grant_type}`
        });

        return fetch(request)
            .then(response => {
                return response.json()
            })
            .then(json => {
                var token = json.token_type + " " + json.access_token
                console.log(token);
                this.setState({
                    token: token,
                })
                return token; // Token
            })
    }
}
