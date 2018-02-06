import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {
  Colors,
  FontsSizes,
} from '../../resources';

class SplashScreen extends Component {
  constructor() {
    super();

    this.state = {
      fadeAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 2500,
      }
    ).start();
  }
  render() {
    const opacityObject = {
      opacity: this.state.fadeAnimation,
    };

    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>{ 'work'.toUpperCase() }</Text>
        <Animated.Text style={ [styles.star, opacityObject] }>★★</Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
    paddingVertical: '20%',
    height: '100%',
  },
  text: {
    color: Colors.white,
    fontSize: FontsSizes.medium,
    fontWeight: 'bold',
  },
  star: {
    color: Colors.white,
    fontSize: FontsSizes.small,
  },
});

export default SplashScreen;
