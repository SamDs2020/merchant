import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-ui-kitten";

export default props => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
      <Image
          style={{
            height: 30,
            width: 30,
            marginRight: 20,
            resizeMode: "contain"
          }}
          source={require("../assets/gem.png")}
        ></Image>
        <View>
          <Text style={{ fontSize: 17, fontWeight: "400", marginBottom: 8 }}>
            AWARD 300 gems to 123-xxx-xxx
          </Text>
          <Text style={{ fontWeight: "200", color: "#636e72" }}>
            20/1/2019 @ 19:00am
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
