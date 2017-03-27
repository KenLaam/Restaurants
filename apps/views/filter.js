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
    Button,
    Slider,
    Switch,
    Picker,
    ScrollView
} from 'react-native';

import {actionCreators} from '../utils/reducer';
import {connect} from 'react-redux';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: (this.props && this.props.radius) || 0,
            open_now: (this.props && this.props.open_now) || false,
            sort_by: (this.props && this.props.sort_by) || 'best_match',
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


    render() {
        const {navigator} = this.props;
        return (
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
                            step={1}
                            value={this.props.radius}
                            maximumValue={40000}
                            onValueChange={this._updateDistance}
                    />
                </View>
            </ScrollView>
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