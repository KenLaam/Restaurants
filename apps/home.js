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
} from 'react-native';

import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

export default class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            token: "",
            restaurantDS: ds.cloneWithRows([]),
            offset: 0,
            keyword: "",
        }

    }

    componentWillMount() {
        // this._fetchToken();
        this._fetchData();
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

    _fetchData() {
        const request = new Request('https://api.yelp.com/v3/businesses/search?latitude=37.785771&longitude=-122.406165', {
            method: 'GET',
            headers: new Headers({
                'Authorization': "Bearer 3cRNmF8k-aE_vSGrIeE0BYFmSxXxcx1vA-3_cJA1W-zRZPf0I6Wy2ZY5D77d2QScP6B64nG0jndzU92PURmGJmUEWswp2SHwatipvoGzbKkdNpMWA3eUt_3UlmnXWHYx",
            })
        })

        return fetch(request)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    offset: this.state.offset + 20,
                    restaurantDS: this.state.restaurantDS.cloneWithRows(json.businesses)
                })
            })
            .catch(error => {
                console.log("Error " + error.message)
            })
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.restaurantDS}
                    renderRow={(rowData) => this._renderRow(rowData)}
                />
            </View>
        );
    }


    _renderRow(restaurant) {
        return (
            <View>
                <Image
                    style={{width: 100, height: 100}}
                    source={{uri: restaurant.image_url}}
                />
                <Text>{restaurant.name}</Text>
            </View>
        )
    }
}