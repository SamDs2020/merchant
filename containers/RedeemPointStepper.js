import React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import StepIndicator from "react-native-step-indicator";
import { Input, Button } from "react-native-ui-kitten";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { ViewPager } from "rn-viewpager";

const steps = ["", "", "", "", ""];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#2B41AF",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#2B41AF",
  stepStrokeUnFinishedColor: "#bdc3c7",
  separatorFinishedColor: "#2B41AF",
  separatorUnFinishedColor: "#bdc3c7",
  stepIndicatorFinishedColor: "#2B41AF",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#2B41AF",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#bdc3c7",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#2B41AF"
};

const styles = {
  container: {
    flex: 1,
    overflow: "hidden",
    paddingVertical: 30
  },

  root: {
    flex: 1
  },

  step: {
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white"
  },

  step_content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },

  step_controls: {
    paddingHorizontal: 20,
    marginBottom: 30
  },

  text: {
    fontSize: 18,
    fontWeight: "300",
    color: "#7f8c8d"
  }
};

const VIEWPAGER_REF = "viewPager";

export default class extends React.Component {
  state = {
    receieptId: null,
    errors: false,
    authenticated: false,
    processing: false,
    currentPosition: 0,
    pointsToDeduct: 0
  };

  changePage(index) {
    this.setPage(index);
    this.setState({ ...this.state, currentPosition: index });
  }

  async authenticate() {
    if (
      (await LocalAuthentication.hasHardwareAsync()) &&
      LocalAuthentication.isEnrolledAsync()
    ) {
      const options = {
        promptMessage: "Confirm the transaction",
        fallbackLabel: "Enter passcode instead"
      };
      const auth = await LocalAuthentication.authenticateAsync(options);
      if (!auth.success) {
        console.log(auth.error);
        this.setState({ ...this.state, errors: true });
        return;
      }
      this.setState({ ...this.state, authenticated: true });

      setTimeout(() => {
        this.changePage(3);

        /* fake it till you make it */
        setTimeout(() => {
          this.changePage(4);

          setTimeout(() => {
            this.props.complete();
          }, 2000);
        }, 3000);
      }, 500);
    }
  }

  validateFirstStep() {
    if (this.state.receieptId && this.state.receieptId.trim()) {
      /* add regex validatiion for receipt id here */
      this.changePage(1);
    }
  }

  validateSecondStep() {
    if (this.state.pointsToDeduct && this.state.pointsToDeduct.trim()) {
      /* add regex validatiion for receipt id here */
      this.changePage(2);
    }
  }

  proceedToConfirmation() {
    this.changePage(0);
  }

  setPage(selectedPage) {
    this.refs[VIEWPAGER_REF].setPage(selectedPage);
  }

  render() {
    return (
      <View style={styles.container}>
        <StepIndicator
          customStyles={customStyles}
          stepCount={steps.length}
          currentPosition={this.state.currentPosition}
          labels={steps}
        />
        <ViewPager
          scrollEnabled={false}
          ref={VIEWPAGER_REF}
          style={{ flex: 1 }}
        >
          <View style={styles.step}>
            <View style={styles.step_content}>
              <Text style={styles.text}>Enter the receipt ID</Text>
              <Input
                onChangeText={text =>
                  this.setState({ ...this.state, receieptId: text })
                }
                value={this.state.receieptId}
                style={{ marginHorizontal: 20, marginTop: 20 }}
                selectionColor="#676B7F"
                keyboardType="number-pad"
                placeholderTextColor="white"
                placeholder="Receipt ID"
              />
            </View>
            <View
              style={[
                styles.step_controls,
                { alignSelf: "stretch", alignItems: "flex-end" }
              ]}
            >
              <TouchableOpacity
                style={{ marginTop: 20 }}
                status="success"
                onPress={() => this.validateFirstStep()}
              >
                <Text style={styles.text}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.step_content}>
              <Text style={styles.text}>Enter points to deduct</Text>
              <Input
                onChangeText={text =>
                  this.setState({ ...this.state, pointsToDeduct: text })
                }
                value={this.state.pointsToDeduct}
                style={{ marginHorizontal: 20, marginTop: 20 }}
                selectionColor="#676B7F"
                keyboardType="number-pad"
                placeholderTextColor="white"
                placeholder="Points"
              />
            </View>
            <View
              style={[
                styles.step_controls,
                {
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-between"
                }
              ]}
            >
              <TouchableOpacity
                style={{ marginTop: 20 }}
                status="success"
                onPress={() => this.changePage(this.state.currentPosition - 1)}
              >
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                status="success"
                onPress={() => this.validateSecondStep()}
              >
                <Text style={styles.text}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.step_content}>
              <Text style={styles.text}>Confirm Transaction</Text>
              <Button
                disabled={this.state.authenticated}
                onPress={() => this.authenticate()}
                status="success"
                size="large"
                style={{ marginTop: 20 }}
              >
                {!this.state.authenticated ? "Confirm" : "Confirmed!"}
              </Button>
            </View>

            <View
              style={[
                styles.step_controls,
                {
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-between"
                }
              ]}
            >
              <TouchableOpacity onPress={() => this.changePage(1)}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.step_content}>
              <Text style={styles.text}>Waiting for user to confirm</Text>

              <ActivityIndicator
                style={{ paddingTop: 35 }}
                size="large"
                color="#2B41AF"
              ></ActivityIndicator>
            </View>

            <View style={[styles.step_controls]}>
              <TouchableOpacity onPress={() => this.changePage(4)}>
                <Text style={[styles.text, { color: "#e74c3c" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.step}>
            <View style={styles.step_content}>
              <Text style={([styles.text], { fontSize: 20 })}>
                Transaction Complete!
              </Text>

              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginLeft: -20,
                  marginTop: 30,
                  marginBottom: 20
                }}
                source={require("../assets/icons/confetti.png")}
              ></Image>
            </View>
          </View>
        </ViewPager>
      </View>
    );
  }
}
