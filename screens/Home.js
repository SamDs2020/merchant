import React from "react";
import { Layout, Button, Text, TopNavigation } from "react-native-ui-kitten";
import { StyleSheet, View, ScrollView, RefreshControl, Image, TouchableOpacity, StatusBar, Alert, SafeAreaView } from "react-native";
import Banner from "../components/Banner";
import Transaction from "../components/Transaction";
import Modal from "react-native-modal";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center"
  },
  text: {
    marginBottom: 20
  },
  card: {
    marginVertical: 10,
    width: 200,
    minWidth: 100,
    padding: 20
  },
  text: {
    marginVertical: 10
  }
});

class ActionsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    refreshing: false,
    showSettingsModal: false,
  };

  toggleSettingsModal() {
    this.setState({ showSettingsModal: !this.state.showSettingsModal })
  }

  showErrorAlert(msg) {
    Alert.alert(
      'Failed to refresh',
      "Can't connect to the server right now",
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: true },
    );
  }
  
  handleRefresh() {
    this.setState({ ...this.state, refreshing: true });
    axios
      .get(`/merchant?id=b0d83e91-cd7f-42fc-8ec4-6ce27ac3d66b`)
      .then(async res => {
        const transactions = res.data.transactions;
        console.log(transactions);
        this.setState({ ...this.state, transactions });
      })
      .catch(err => { 
        console.log(err);
        // this.showErrorAlert(err);
      })
      .finally(() => this.setState({ ...this.state, refreshing: false }));
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleRefresh();
    }, 1000);
  }

  renderRightContent() {
    return (
      <TouchableOpacity onPress={() => this.setState({ showSettingsModal: true })}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../assets/icons/preference.png")}
        ></Image>
      </TouchableOpacity>)
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* <StatusBar barStyle="light-content" /> */}
        {/* <Layout style={styles.container}> */}
        {/* <Banner title="Home" renderRightContent={() => this.renderRightContent()}></Banner> */}
        {/* <Button
            style={{ top: -15, paddingHorizontal: 30, borderRadius: 10 }}
            size="large"
            status="success"
            onPress={() => this.props.navigation.navigate("Scan")}
          >
            SCAN
          </Button> */}
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Scan')}
        > */}
        <Text style={{ fontSize: 50, paddingVertical: 30 }}>SCAN QR CODE</Text>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Scan')}
          size="large"
        >
          SCAN
        </Button>
        {/* </TouchableOpacity> */}
        {/* </Layout> */}
      </SafeAreaView>
    )
  }
}

export default ActionsScreen;
