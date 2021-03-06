import React from "react";
import { Text, View, StyleSheet, Image } from 'react-native'
import * as Permissions from "expo-permissions";
import DynamicStatusBar from "../components/DynamicStatusBar";
import { Camera } from "expo-camera";
import Modal from "react-native-modal";
import { Button } from "react-native-ui-kitten";
import LottieView from "lottie-react-native";
import Constants from 'expo-constants';

import { BarCodeScanner } from 'expo-barcode-scanner';


export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false
    }

    async componentDidMount() {
        this.getPermissionsAsync()
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    render() {
        const { hasCameraPermission, scanned } = this.state

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : this.handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        )
    }

    handleBarCodeScanned = ({ type, data }) => {
        const { navigation } = this.props;
        this.setState({ scanned: true })

        navigation.navigate('Profile', { id: data })
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    }
}
