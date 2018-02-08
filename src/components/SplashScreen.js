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
  Styles,
  PixelSizes,
  Times,
} from '../../resources';

class SplashScreen extends Component {
  constructor() {
    super();

    const availableColors = [Colors.black, Colors.red, Colors.white];
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    this.state = {
      fadeAnimation: new Animated.Value(0),
      color: { backgroundColor: randomColor },
    };
  }

  componentDidMount() {
    this.runAnimation();
  }

  getTitleText() {
    let text;
    switch (this.state.color.backgroundColor) {
      case Colors.black:
        text = 'co';
        break;
      case Colors.red:
        text = 'work';
        break;
      case Colors.white:
        text = '&';
        break;
      default:
        return null;
    }
    return text;
  }

  runAnimation() {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: Times.splashScreenDuration,
      }
    ).start(() => {
      Animated.timing(
        this.state.fadeAnimation,
        {
          toValue: 0,
          duration: Times.splashScreenDuration,
        }
      ).start(() => this.runAnimation());
    });
  }

  render() {
    const opacityObject = {
      opacity: this.state.fadeAnimation,
    };

    const shouldBeBlack = this.state.color.backgroundColor === Colors.white;
    const titleAndStarColor = shouldBeBlack ? { color: Colors.black } : { color: Colors.white };

    return (
      <View style={ [styles.container, this.state.color] }>
        <Text style={ [styles.text, titleAndStarColor] }>{ this.getTitleText().toUpperCase() }</Text>
        <Animated.Text style={ [styles.star, opacityObject, titleAndStarColor] }>★★</Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: PixelSizes.large,
    paddingVertical: PixelSizes.xlarge,
    height: '100%',
  },
  text: {
    ...Styles.mediumText,
  },
  star: {
    fontSize: FontsSizes.small,
  },
});

export default SplashScreen;
