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
    Button,
} from 'react-native';
import Image from 'react-native-image-progress';

export default class RestaurantCell extends Component {
    render() {
        const {restaurant} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMode='cover'
                    source={{uri: restaurant.image_url}}
                />
                <View style={styles.description}>
                    <View>
                        <Text>{restaurant.name}</Text>
                        <Text>Rating {restaurant.rating}</Text>
                        <Text>Price {restaurant.price}</Text>
                        <Text>Phone {restaurant.phone}</Text>
                        <Text>Distance {Math.round(restaurant.distance * 100) / 100}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },

    image: {
        height: 100,
        flex: 1
    },

    description: {
        flex: 3
    }

});



