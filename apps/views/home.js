/**
 * Created by ken on 3/24/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    ListView,
    Button,
} from 'react-native';

import {connect} from 'react-redux';
import RestaurantCell from './restaurantCell'
import Filter from './filter';

const locationLat = "37.7616968";
const locationLong = "-122.4225494";

export class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            restaurantList: [],
            restaurantDS: ds.cloneWithRows([]),
            offset: 0,
            keyword: "",
            token: props.token,
        }

    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.filter);
        this.props = nextProps;
        this._fetchData("");
    }

    componentWillMount() {
        this._fetchData("");
    }

    async _fetchData() {
        let queryStringArr = [];
        if (this.props.filter) {
            let params = this.props.filter;
            for (const key of Object.keys(params)) {
                queryStringArr.push(`${key}=${params[key]}`);
            }
        }

        if (this.state.keyword.length !== 0) {
            queryStringArr.push(`term=${this.state.keyword}`);
        }
        const queryString = queryStringArr.join('&');


        console.log("KenK11 " + queryString);
        const request = new Request(`https://api.yelp.com/v3/businesses/search?latitude=${locationLat}&longitude=${locationLong}&${queryString}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `${this.state.token}`,
            })
        });

        try {
            fetch(request)
                .then((response) => response.json())
                .then((json) => {
                    console.log("Restaurant " + json.businesses.length);
                    this.setState({
                        offset: this.state.offset + 20,
                        restaurantDS: this.state.restaurantDS.cloneWithRows(json.businesses)
                    })
                })
        } catch (error) {
            console.log("Error " + error.message)
        }

    }

    _searchKeyword = (keyword) => {
        console.log("KenK11 searching  " + keyword);
        this.setState({
            keyword
        });

        this._fetchData()
    }

    render() {
        const {navigator} = this.props;
        return (
            <View style={{padding: 10}}>
                <View style={styles.header}>
                    <Button
                        style={{flex: 1}}
                        title="Filter"
                        onPress={() => this._goFilter(navigator)}
                    />

                    <TextInput
                        style={{flex: 3}}
                        onChangeText={this._searchKeyword}
                    />
                </View>

                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.restaurantDS}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }


    _renderRow = (rowData) => {
        return (
            <RestaurantCell restaurant={rowData}/>
        )
    }

    _goFilter = (navigator) => {
        navigator.push({
            component: Filter,
        })
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'cyan',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
});

const mapStateToProps = (state) => ({
    filter: state.filter,
    token: state.token,
});

export default connect(mapStateToProps)(Home);