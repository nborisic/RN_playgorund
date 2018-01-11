import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Colors, FontsSizes } from './resources';

const NUMEBER_OF_ELEMENTS = 5;
const {
  height: deviceHeight,
} = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }
  /**
 * Calculating witch way did the user scroll and moving the ScrollView due to that scroll
 * @param { object } e - native event from scroll
 */
  handleScroll(e) {
    let offsetValue;
    let offsetSlides;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / 400);
    } else {
      offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / 400);
    }
    offsetValue = offsetSlides * 400;
    if (offsetValue === (NUMEBER_OF_ELEMENTS - 1) * 400) {
      offsetValue = e.nativeEvent.contentSize.height - deviceHeight;
    } else if (offsetValue < 0) {
      offsetValue = 0;
    }
    this.myScroll.scrollTo({ x: 0, y: offsetValue, animated: true });
    this.setState({
      offset: offsetValue,
    });
  }

  renderComponents() {
    const componentsArray = [];
    for (let i = 0; i < NUMEBER_OF_ELEMENTS; i++) {
      componentsArray.push(
        <View style={ styles.container } key={ i }>
          <Text style={ styles.welcome }>
            Container { i + 1 }
          </Text>
        </View>
      );
    }
    return componentsArray;
  }

  render() {
    return (
      <ScrollView
        ref={ comp => { this.myScroll = comp; } }
        onScrollEndDrag={ this.handleScroll }
      >
        {this.renderComponents()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderBottomWidth: 1,
    borderColor: Colors.black,
  },
  welcome: {
    fontSize: FontsSizes.medium,
    textAlign: 'center',
    margin: 10,
  },
});
