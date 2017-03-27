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
            token: "",
            restaurantDS: ds.cloneWithRows([]),
            offset: 0,
            keyword: "",
        }

    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.filter);
        this.props = nextProps;
        this._fetchData()
    }

    componentWillMount() {
        this._fetchData();
    }

    _fetchData() {
        var radius = this.props.filter ? this.props.filter.radius : "";
        radius = parseInt(radius / 1609);
        if (!radius || radius === 0) {
            radius = "";
        }
        console.log("KenK11 radius " + radius);
        const request = new Request(`https://api.yelp.com/v3/businesses/search?latitude=${locationLat}&longitude=${locationLong}&radius=${radius}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': "Bearer 3cRNmF8k-aE_vSGrIeE0BYFmSxXxcx1vA-3_cJA1W-zRZPf0I6Wy2ZY5D77d2QScP6B64nG0jndzU92PURmGJmUEWswp2SHwatipvoGzbKkdNpMWA3eUt_3UlmnXWHYx",
            })
        });

        return fetch(request)
            .then((response) => response.json())
            .then((json) => {
                console.log("Restaurant " + json.businesses.length);
                this.setState({
                    offset: this.state.offset + 20,
                    restaurantDS: this.state.restaurantDS.cloneWithRows(json.businesses)
                })
            })
            .catch(error => {
                console.log("Error " + error.message)
            })
    }

    _search = (keyword) => {

    }

    render() {
        const {navigator} = this.props;
        return (
            <View style={{padding: 10}}>
                <View style={styles.header}>
                    <TextInput
                        style={{flex: 3}}
                        onChangeText={this._search}
                    />
                    <Button
                        style={{flex: 1}}
                        title="Filter"
                        onPress={() => this._goFilter(navigator)}
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
});

export default connect(mapStateToProps)(Home);