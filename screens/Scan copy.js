import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import DynamicStatusBar from "../components/DynamicStatusBar";
import { Camera } from "expo-camera";
import Modal from "react-native-modal";
import { Button } from "react-native-ui-kitten";
import LottieView from "lottie-react-native";


export default class extends React.Component {
  state = {
    found: false,
    isProfileModalOpen: true,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  toggleProfileModal = () => {
    this.setState({
      ...this.state,
      isProfileModalOpen: !this.state.isProfileModalOpen
    });
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentDidUpdate() {
    this.animation.play();
  }

  veryifyScannedBarcode(payload) {
    /* Make sure it's a QR */
    if (payload.type === "org.iso.QRCode" && payload.data) {
      this.setState({ ...this.state, found: true });
      setTimeout(() => {
        this.props.navigation.navigate("Profile", { id: payload.data });
      }, 500);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <>
          <DynamicStatusBar
            zeroHeight={true}
            style={{ backgroundColor: "transparent" }}
            barStyle="light-content"
          />

          <Camera
            style={{ flex: 1 }}
            onBarCodeScanned={data => this.veryifyScannedBarcode(data)}
            type={Camera.Constants.Type.back}
          >
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  flex: 1,
                  position: "absolute",
                  top: 20,
                  right: 0,
                  alignSelf: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ opacity: 1, margin: 20 }}
                  source={require("../assets/icons/close.png")}
                />
              </TouchableOpacity>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 300,
                  height: 300,
                  flex: 1,
                  alignSelf: "center",
                  alignItems: "center"
                }}
                source={require('../assets/lottie/scan-qr-code.json')}
              />
            </View>
          </Camera>
        </>
      );
    }
  }
}
