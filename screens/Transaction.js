
import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { Layout, Button, Avatar, Input } from 'react-native-ui-kitten'
import axios from 'axios'



export default class Transaction extends Component {
  state = {
    value: '',
  };

  onChangeText = (value) => {
    this.setState({ value });
  };


  handleAward = async () => {
    try {
      const transactionId = this.props.navigation.getParam(
        'transactionId',
        '5dc8a76c4f40fc00176e1295'
      );
      const tran = await axios.post('/transaction/transaction', {
        refId: this.state.value,
        transactionId
      });

      console.log('tran', tran);
      this.props.navigation.navigate('Home')
    } catch (error) {
      console.log("error", error);
      console.log('error', error.response)
    }
  }

	render() {
		const discount = this.props.navigation.getParam('discount', 10)
		const transactionId = this.props.navigation.getParam(
      'transactionId',
      '5dc8a76c4f40fc00176e1295'
		)
		// const gem = 23;
		// const transactionId = "5dc8a76c4f40fc00176e1295";
		return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.container}> */}
        <View style={styles.top}>
          <Text style={{ fontSize: 130 }}>{discount}%</Text>
          <Text style={{ fontSize: 20 }}>Discount</Text>
        </View>

        <Input
          style={styles.input}
          value={this.state.value}
          onChangeText={this.onChangeText}
          placeholder="Enter Transaction ID"
        />
        <Button style={styles.button} onPress={this.handleAward} size="large">
          Award Gem Points
        </Button>
        <View style={styles.mid}>
          <Text style={{ margin: 20 }}>OR</Text>

          <Button
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('Capture', { transactionId })
            }
            size="large"
          >
            Capture Receipt
          </Button>
        </View>
        {/* </View> */}
      </SafeAreaView>
    )
	}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6fa'
  },
  top: {
    // flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mid: {
    // flex: 0.3,
    marginTop: 30
  },
  input: {
    flex: 1,
    marginHorizontal: 4
  }
})

// https://moni-server.herokuapp.com/api/transaction/create