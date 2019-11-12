import React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { View, TextInput, TouchableOpacity, Image, StatusBar, Alert, ActivityIndicator } from "react-native";
import { Text, Button, Input, Icon } from "react-native-ui-kitten";
import ScrollableAvoidKeyboardComponent from "../components/ScrollableAvoidKeyboard";
import axios from "axios";
import Banner from "../components/Banner";
import { sharedStyles } from "../styles/shared.style";
import Modal from "react-native-modal";
import { storeToken, verifyLoginStatus } from "../core/helpers/tokenHelper";
import LoginCarousel from "../components/Carousel";
import Spinner from 'react-native-spinkit';
import LottieView from "lottie-react-native";

export default class extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      credentials: {
        iam: "kayode.matthew@lmbeach",
        password: "12345678"
      },
      showLoadingModal: false
    };
  }

  showErrorAlert(message) {
    Alert.alert(
      'Error',
      message,
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }

  async authenticteWithHardware() {
    if (
      (await LocalAuthentication.hasHardwareAsync()) &&
      LocalAuthentication.isEnrolledAsync()
    ) {
      const options = {
        promptMessage: "Confirm identity to continue",
        fallbackLabel: "Enter passcode instead"
      };
      const auth = await LocalAuthentication.authenticateAsync(options);
      if (!auth.success) {
        this.showErrorAlert("Unable to confirm identity")
        return;
      }
      this.setState({ showLoadingModal: true })
      setTimeout(() => {
        this.props.navigation.navigate("Home")
      }, 2000);
    }
  }

  async handleLogin() {
    // @ts-ignore
    this.setState({ disabled: true });
    if (
      this.state.credentials.iam.trim() === "" ||
      this.state.credentials.password.trim() === ""
    ) {
      return this.showErrorAlert("Username and password required");
    }

    this.setState({ showLoadingModal: true })

    axios
      .post("/merchant/login", this.state.credentials)
      .then(async res => {
        if (!res.data.token) throw "Failed to acquire token from server";

        // registerForPushNotificationsAsync();
        const AUTH_TOKEN = res.data.token;
        /* persist thee token */
        await storeToken(AUTH_TOKEN);
        /* make all axios requests include the auth token */
        axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

        setTimeout(async () => {
          this.props.navigation.navigate("Home");
        }, 500);
      })
      .catch(error => {
        /* replace with api sauce */
        setTimeout(() => {
          this.setState({ showLoadingModal: false })
          setTimeout(() => {
            this.showErrorAlert("An error occurred while connecting to the server");
          }, 500);
        }, 2000);

      });
  }

  renderIcon = (style) => {
    return (
      <TouchableOpacity style={{ width: 40, alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}>
        <Text style={{ fontWeight: "300" }} category="label">{this.state.secureTextEntry ? 'SHOW' : 'HIDE'}</Text>
      </TouchableOpacity>
    );
  };

  componentDidUpdate() {
    /* start the lottie animation */
    if (this.state.showLoadingModal) this.animation.play()
  }

  render() {
    return (
      <>
        <ScrollableAvoidKeyboardComponent>
          <StatusBar barStyle="dark-content"></StatusBar>
          <View style={sharedStyles.rootContainer}>
            {/* <LoginCarousel /> */}
            <View style={{ flexGrow: 1, alignItems: "center", marginHorizontal: 30, marginBottom: 60, justifyContent: "center" }}>
              <Image style={{ resizeMode: "contain", width: "80%", height: 80, marginBottom: 50 }} source={require("../assets/lm1.png")}></Image>
              <Input
                value={this.state.credentials.iam}
                style={styles.input}
                onChangeText={(text) => this.setState({ credentials: { ...this.state.credentials, iam: text } })}
                placeholder='iam'></Input>
              <Input
                value={this.state.credentials.password}
                style={styles.input}
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Password"
                icon={() => this.renderIcon()}
                onChangeText={(text) => this.setState({ credentials: { ...this.state.credentials, password: text } })}
                placeholder='Password'></Input>
              <TouchableOpacity onPress={async () => await this.authenticteWithHardware()} style={{ flexDirection: "row", alignSelf: "flex-start", marginVertical: 10, alignItems: 'center' }}>
                <Image style={{ resizeMode: "contain", height: 25, width: 25, marginRight: 10 }} source={require("../assets/fingerprint.png")}></Image>
                <Text style={{ color: "#7f8c8d" }} >Use TouchID</Text>
              </TouchableOpacity>
              <Button style={styles.button} size="large" onPress={() => this.handleLogin()}>Sign in</Button>
            </View>
          </View>
          <Modal
            isVisible={this.state.showLoadingModal}
            style={{
              padding: 0,
              margin: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 250,
                height: 250,
              }}
              source={require('../assets/lottie/cube-loader.json')}
            />
          </Modal>
        </ScrollableAvoidKeyboardComponent>
      </>
    );
  }
}

const styles = {
  input: {
    marginBottom: 10,
  },

  button: {
    width: "100%", marginVertical: 10, borderColor: "#fff", paddingVertical: 20,
    backgroundColor: "#262D60"
  }

}