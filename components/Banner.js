import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-ui-kitten";

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#2B41AF",
  },
  imageStyle: {
    margin: "auto",
    width: 200,
    height: 100,
    resizeMode: "contain"
  }
});

export default function Banner(props) {
  return (
    <View style={styles.banner}>
      <View style={{ position: "absolute", top: "50%", left: 10 }}>
        {props.showBackButton ? (
          <TouchableOpacity onPress={props.onBackButtonPress}>
            <Image
              style={{ left: 20, width: 20, height: 20, tintColor: "#fff" }}
              source={require("../assets/icons/left-arrow.png")}
            ></Image>
          </TouchableOpacity>
        ) : null}
      </View>
      <View>
        <Text
          category="h4"
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "500",
            paddingTop: 30,
            paddingBottom: 20
          }}
        >
          {props.title}
        </Text>
      </View>

      <View style={{ position: "absolute", top: "50%", right: 25 }}>
        {props.renderRightContent ? props.renderRightContent() : null}
      </View>
    </View>
  );
}
