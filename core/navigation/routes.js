import React from "react";
import { useScreens } from "react-native-screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home, Login, Scan, Profile, AppLoading, Capture, Transaction } from "../../screens";

const ActionsNavigator = createStackNavigator(
  {
    Home: Home,
    Profile: Profile,
    Transaction,
    Capture
  },
  {
    // initialRouteName: 'Transaction',
    defaultNavigationOptions: {
      header: null
    }
  }
)

const AppNavigator = createStackNavigator(
  {
    Actions: ActionsNavigator,
    Scan: Scan
  },
  {
    // initialRouteName: 'ActionsNavigator',
    defaultNavigationOptions: {
      header: null
    }
  }
)

const rootNavigator = createSwitchNavigator(
  {
    Auth: Login,
    App: AppNavigator,
    Loading: AppLoading
  },
  {
    // initialRouteName: 'App',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

const createAppRouter = container => {
    useScreens();
    return createAppContainer(container);
};

export default createAppRouter(rootNavigator)