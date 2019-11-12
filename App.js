import React from "react";
import { ApplicationProvider } from "react-native-ui-kitten";
import Router from "./core/navigation/routes";
import DynamicStatusBar from "./components/DynamicStatusBar";
import { light, dark, mapping } from "@eva-design/eva";
import * as Font from "expo-font";
import { Text, View } from "react-native";
import { Notifications, AppLoading, Image } from "expo";
import axios from "axios";
import env from "./config/env.config";
import UserContext from "./contexts/user-context";

export default class App extends React.Component {
  state = {
    isReady: false,
    isUserLoggedIn: false,
    notification: {}
  };

  handleNotification = notification => {
    this.setState({ notification });
  };

  async componentDidMount() {
    /* Register axios defaults early enough */
    // axios.defaults.baseURL = 'http://67606cb4.ngrok.io' + "/api";
    axios.defaults.baseURL = 'https://moni-server.herokuapp.com' + '/api'
    console.log(axios.defaults.baseURL);

    /* Handle when app is backgrounded */
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );

    this.setState({ fontLoaded: true });
  }

  _renderLoading = () => (
    <AppLoading
      startAsync={this._loadResourcesAsync}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  );

  _renderApp = () => (
    <ApplicationProvider mapping={mapping} theme={light}>
      <UserContext.Provider
        value={{ isUserLoggedIn: this.state.isUserLoggedIn }}
      >
        {/* <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red"
          }}
        >
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View> */}
        <DynamicStatusBar
          zeroHeight={true}
          style={{ backgroundColor: "transparent" }}
          barStyle="dark-content"
        />
        <Router />
      </UserContext.Provider>
    </ApplicationProvider>
  );

  render() {
    return !this.state.isReady ? this._renderLoading() : this._renderApp();
  }

  _cacheImages(images) {
    return;
  }

  async _loadResourcesAsync() {
    // Load app fonts
    const loadFonts = Font.loadAsync({
      "opensans-semibold": require("./assets/fonts/opensans-semibold.ttf"),
      "opensans-bold": require("./assets/fonts/opensans-bold.ttf"),
      "opensans-extrabold": require("./assets/fonts/opensans-extra-bold.ttf"),
      "opensans-light": require("./assets/fonts/opensans-light.ttf"),
      "opensans-regular": require("./assets/fonts/opensans-regular.ttf")
    });

    // const loadImages = [require("./assets/icons/qr-scanner.png")].forEach(
    //   image => {
    //     if (typeof image === "string") {
    //       return Image.prefetch(image);
    //     } else {
    //       return Asset.fromModule(image).downloadAsync();
    //     }
    //   }
    // );

    return Promise.all([loadFonts]);
  }
}
