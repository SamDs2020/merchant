import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native';

import {Button} from "react-native-elements";
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

export default class LoginCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: { width, height: height - 70 },
        };
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Text style={{position: "absolute"}}>Landmark Citizen</Text>
                <Carousel
                    delay={3000}
                    style={this.state.size}
                    autoplay
                    bullets={true}
                >
                    <View style={[{ backgroundColor: '#2980b9' }, this.state.size]}></View>
                    <View style={[{ backgroundColor: '#e74c3c' }, this.state.size]}></View>
                    <View style={[{ backgroundColor: '#f39c12' }, this.state.size]}></View>
                    <View style={[{ backgroundColor: '#16a085' }, this.state.size]}></View>
                </Carousel>
            </View>
        );
    }
}