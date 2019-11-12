import React from "react";
import { Layout, Button, Text, TopNavigation } from "react-native-ui-kitten";
import { StyleSheet } from "react-native";
import DynamicStatusBar from "../components/DynamicStatusBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    padding: 20
  }
});

export default class extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <>
        <DynamicStatusBar />
        <TopNavigation
          alignment="center"
          title="Settings"
          titleStyle={{ fontSize: 20 }}
        />
        <Layout style={styles.container}>
          <Layout style={{ flex: 1 }}></Layout>
          <Button
            size="giant"
            status="danger"
            style={{ paddingHorizontal: 20, borderRadius: 0 }}
            onPress={() => this.props.navigation.navigate("login")}
          >
            Logout
          </Button>
        </Layout>
      </>
    );
  }
}
