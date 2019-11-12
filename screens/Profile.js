import React from "react";
import { Layout, Button, Avatar, Input } from "react-native-ui-kitten";
import { StyleSheet, Image, View, Text, ActivityIndicator, StatusBar, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Banner from "../components/Banner";
import axios from "axios";
import AwardPointsStepper from "../containers/AwardPointStepper";
import RedeemPointsStepper from "../containers/RedeemPointStepper";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  pointsCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },

  text: {
    marginVertical: 10
  }
});

export default class extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    user: null,
    failed: false,
    loading: false,
    popoverVisible: false,
    isModalVisible: false,
    action: "",
    amount: "",
    gems: ""
  };

  async pullUserProfile(id) {
    this.setState({ ...this.state, loading: true });

    axios
      .get(`/user/customer/${id}`)
      // .get(`/user?userId=${id}`)
      .then(async res => {
        if (!res.data) throw "Error";
        this.setState({ user: { ...res.data } });
      })
      .catch(error => {
        if (error.message === "Network Error") {
          console.log("Network Error!");
          this.setState({
            ...this.state,
            loginMessage: "Network error",
            isErrorModalVisible: true
          });
          return;
        }
        this.setState({
          ...this.state,
          loginMessage: error.response.data.error,
          isErrorModalVisible: true
        });
        console.log(error.response.data.error);
      })
      .finally(() => {
        console.log("Finally...");
        this.setState({ ...this.state, loading: false });
      });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam("id");
    console.log(id);

    if (id) this.pullUserProfile(id);
    else console.log("No user ID passed, not passed!");
  }


  renderIcon = (value) => {
    return (
      <Text style={{ fontWeight: "300" }} category="label">{value}</Text>
    );
  };


  handleTransaction = async () => {
    try {
      const { user, amount, gems } = this.state;

      const transaction = await axios.post('/transaction/create', {
        iam: 'kayode.matthew@lmbeach',
        userId: user.id,
        gemsToDeduct: gems ? Number(gems) : 0,
        transactionTotal: amount
      })


      // console.log('transaction', JSON.stringify(transaction));
      console.log('transaction', transaction)

      this.props.navigation.navigate('Transaction', {
          discount: transaction.data.discount,
          transactionId: transaction.data.transactionId
      })
    } catch (error) {
      // console.log('error', JSON.stringify(error));
      console.log('error', error)
    }
  }


  render() {
    console.log('this.state', this.state);

    const { amount, gems } = this.state;

    const conditionallyRenderContent = () => {
      return this.state.user ? renderContent() : renderNotFound();
    };

    const renderContent = () => (
      <View
        style={{
          backgroundColor: "#fff",
          borderColor: "#ccc",
          alignItems: "center",
          marginHorizontal: 50,
          marginTop: 10
        }}
      >
        <View
          style={{
            alignItems: "center",
            padding: 30
          }}
        >
          <View style={{position: "relative"}}>
            <Image
              style={{
                tintColor: "#3498db",
                position: "absolute",
                top: 0,
                left: 0,
                width: 50,
                height: 30,
                zIndex: 999,
                resizeMode: "contain"
              }}
              source={require("../assets/icons/medal.png")}
            ></Image>

            <Avatar
              style={{
                width: 150,
                height: 150,
                backgroundColor: "#ecf0f1"
              }}
              source={require("../assets/icons/man.png")}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              color: "#57606f",
              fontSize: 35,
              fontWeight: "300"
            }}
            category="h1"
          >
            {this.state.user.name}
          </Text>
          <View style={styles.pointsCard}>
            <Text style={{ fontSize: 20, color: "#57606f" }}>points:</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginLeft: 5,
                color: "#2ed573"
              }}
            >
              {this.state.user.gemPoints.currentGems}
            </Text>
          </View>
        </View>
      </View>
    );

    const renderNotFound = () => (
      <View
        style={{
          justifyContent: "center",
          alignSelf: "stretch",
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 300,
          }}
          source={require('../assets/lottie/loading.json')}
        />
        <Text style={{ marginBottom: 120, fontSize: 18, fontWeight: "400" }}>Couldn't find that user </Text>
      </View>
    );

    const renderLoading = () => (
      <View
        style={{
          justifyContent: "center",
          alignSelf: "stretch",
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <ActivityIndicator
          style={{ marginBottom: 50 }}
          size="large"
          color="#FFC065"
        ></ActivityIndicator>
      </View>
    );

    const renderCloseBtn = () =>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
        <Image
          style={{ left: 20, width: 20, height: 20, tintColor: "#fff" }}
          source={require("../assets/icons/left-arrow.png")}
        ></Image>
      </TouchableOpacity>


    return (
      <>
        <StatusBar barStyle="light-content"></StatusBar>
        <Layout style={styles.container}>
            <Banner
                title="Profile"
                showBackButton={true}
                onBackButtonPress={() =>
                    this.props.navigation.navigate('home')
                }
            ></Banner>
            {!this.state.loading
                ? conditionallyRenderContent()
                : renderLoading()}
            <Input
                value={amount}
                style={styles.input}
                autoFocus
                keyboardType="decimal-pad"
                placeholder="Amount"
                icon={() => this.renderIcon('₦')}
                onChangeText={amount => this.setState({ amount })}
            />
            <Input
                value={gems}
                style={styles.input}
                placeholder="Gems"
                keyboardType="decimal-pad"
                onChangeText={gems => this.setState({ gems })}
            />
            <Button style={styles.button} size="large" onPress={this.handleTransaction}>
              Calculate
            </Button>
        </Layout>
      </>
    )
  }
}
