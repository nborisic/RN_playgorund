import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

export default class TextAnimated extends Component<{}> {

  state = {
    screenWidth: Dimensions.get('window').width
  }

  componentWillMount() {
    console.log('screen', this.state.screenWidth);
  }

  handleOnLayout(event) {
    console.log(event.nativeEvent.layout);
    console.log(123123);
  }

  renderTextAsArray(text) {
    return text.split(' ').map((word, index) => { //eslint-disable-line
      return (
        <Text onLayout={() => console.log('123')} key={index}>{ word } </Text>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          { this.renderTextAsArray(this.props.text) }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
