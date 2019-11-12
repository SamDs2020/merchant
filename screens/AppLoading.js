import React, { Component } from 'react'
import { Text } from "react-native"
import { Logger } from "../core/helpers/logger";
import { verifyLoginStatus } from "../core/helpers/tokenHelper"

export default class AppLoading extends Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        Logger.log("Calling...")
        const tokenPresent = await verifyLoginStatus();
        Logger.log("Token:", tokenPresent);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(tokenPresent ? 'App' : 'Auth');
    }

    render() {
        // probably replace this with a blank text node
        return (
            <Text>loading sss</Text>)
    }
}

