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
} from 'react-native';

import {actionCreators} from '../utils/reducer';
import {connect} from 'react-redux';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: (this.props && this.props.radius) || 0,
            open_now: false,
        }
    }

    _updateDistance = (radius) => {
        this.setState({
            radius
        })
    }

    _updateOpenNow = (open_now) => {
        console.log(open_now);
        this.setState({
            open_now
        })
    }


    render() {
        const {navigator} = this.props;
        return (
            <View>
                <Button title="Back"
                        onPress={() => this._goBack(navigator)}
                />

                <Button title="Save"
                        onPress={this._goSave}
                />

                <View>
                    <Text>Offering a deal</Text>
                    <Switch
                        value={this.state.open_now}
                        onValueChange={this._updateOpenNow}
                    />
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
            </View>
        )
    }

    _goSave = () => {
        const {dispatch, navigator} = this.props;
        dispatch(actionCreators.setFilter(this.state.radius));
        navigator.pop();
    };

    _goBack = (navigator) => {
        navigator.pop();
    }
}

const mapStateToProps = (state) => ({
    radius: state.radius,
});

export default connect(mapStateToProps)(Filter);