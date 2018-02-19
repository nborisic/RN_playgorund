import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  FontsSizes,
  PixelSizes,
} from '../../resources';
import Line from './Line';

export default class TextAnimated extends Component {
  constructor() {
    super();
    this.wordsWidthArray = [];
    this.state = {
      screenWidth: Dimensions.get('window').width,
      lines: null,
    };
    setTimeout(() => {
      this.getLineByLine();
    }, 1000);
  }

  getLineByLine() {
    const { screenWidth } = this.state;
    const sortedArray = this.wordsWidthArray.sort((a, b) => {
      return a.index - b.index;
    });
    let sum = 0;
    const array = [];
    let subArray = [];
    for (let i = 0; i < sortedArray.length; i++) {
      sum += sortedArray[i].width;
      if (sum > screenWidth - PixelSizes.medium) { // offset from screen egde
        array.push(subArray);
        subArray = [sortedArray[i]];
        sum = sortedArray[i].width;
      } else {
        subArray.push(sortedArray[i]);
      }
    }
    if (subArray.length > 0) {
      array.push(subArray);
    }

    const linesAsArray = array.map(oneOfArrays => {
      return oneOfArrays.map(item => item.word);
    });

    const lines = linesAsArray.map(item => item.join(' '));

    this.setState({ lines });
  }

  handleOnLayout(event, word, index) {
    this.wordsWidthArray.push({
      word,
      index,
      width: event.nativeEvent.layout.width,
    });
  }

  renderTextAsArray(text) {
    return text.split(' ').map((word, index) => {
      return (
        <Text style={ styles.text } onLayout={ event => this.handleOnLayout(event, word, index) } key={ index }>{ word } </Text>
      );
    });
  }

  renderLines() {
    const { duration, direction } = this.props;
    const { lines } = this.state;
    return lines.map((item, index) => {
      return (
        <Line
          line={ item }
          index={ index }
          key={ index }
          duration={ duration }
          direction={ direction }
        />
      );
    });
  }

  render() {
    const { text, start } = this.props;
    const { lines } = this.state;
    return (
      <View>
        { this.renderTextAsArray(text) }
        { start && lines ? this.renderLines() : null }
      </View>
    );
  }
}

TextAnimated.propTypes = {
  text: PropTypes.string,
  duration: PropTypes.number,
  start: PropTypes.bool,
  direction: PropTypes.string,
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontsSizes.small,
    position: 'absolute',
    top: -9999,
  },
});
