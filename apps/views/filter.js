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
    Button,
    Slider,
    Switch,
    Picker,
    ScrollView,
    ListView,
} from 'react-native';

import {actionCreators} from '../utils/reducer';
import {connect} from 'react-redux';
import NavigationBar from 'react-native-navbar';


export class Filter extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var originCategories = require('../categories.json');
        const categories = originCategories.filter(this.isRestaurantCategory);
        this.state = {
            radius: (this.props && this.props.radius) || 0,
            open_now: (this.props && this.props.open_now) || false,
            sort_by: (this.props && this.props.sort_by) || 'best_match',
            categoriesDS: ds.cloneWithRows(categories),
        }
    }

    _updateDistance = (radius) => {
        this.setState({
            radius
        })
    }

    _updateOpenNow = (open_now) => {
        this.setState({
            open_now
        })
    }

    _updateSortBy = (sort_by) => {
        console.log(sort_by);
        this.setState({
            sort_by
        })
    }

    isRestaurantCategory(value) {
        return value.parents.includes('restaurants');
    }


    render() {
        const {navigator} = this.props;
        return (
            <View>
                <ScrollView
                    style={styles.container}
                >
                    <Button title="Back"
                            onPress={() => this._goBack(navigator)}
                    />

                    <Button title="Save"
                            onPress={this._goSave}
                    />

                    <View>
                        <Text>Open Now</Text>
                        <Switch
                            value={this.state.open_now}
                            onValueChange={this._updateOpenNow}
                        />
                    </View>
                    <View>
                        <Text>Sort by</Text>
                        <Picker
                            selectedValue={this.state.sort_by}
                            onValueChange={this._updateSortBy}
                        >
                            <Picker.Item label="Best Match" value="best_match"/>
                            <Picker.Item label="Rating" value="rating"/>
                            <Picker.Item label="Review Count" value="review_count"/>
                        </Picker>
                    </View>

                    <View>
                        <Text>{this.state.radius} m</Text>

                        <Slider minimumValue={0}
                                step={10}
                                value={this.props.radius}
                                maximumValue={40000}
                                onValueChange={this._updateDistance}
                        />
                    </View>

                    {/*<ListView*/}
                    {/*dataSource={this.state.categoriesDS}*/}
                    {/*renderRow={this._renderCategoryRow}*/}
                    {/*enableEmptySections={true}*/}
                    {/*/>*/}
                </ScrollView>
            </View>
        )
    }

    _renderCategoryRow = (category) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text>{category.title}</Text>
            </View>
        )
    }

    _goSave = () => {
        const {dispatch, navigator} = this.props;
        dispatch(actionCreators.setFilter({
            radius: this.state.radius,
            open_now: this.state.open_now,
            sort_by: this.state.sort_by,
        }));
        navigator.pop();
    };

    _goBack = (navigator) => {
        navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

const mapStateToProps = (state) => ({
    radius: state.filter ? state.filter.radius : 0,
    open_now: state.filter ? state.filter.open_now : false,
    sort_by: state.filter ? state.filter.sort_by : 'best_match',
});

export default connect(mapStateToProps)(Filter);