import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors, FontsSizes } from './resources';

export default class Line extends Component {
  constructor() {
    super();

    this.state = {
      randomSentenceArray: null,
      stop: false,
      widthAnimation: new Animated.Value(0),
    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.widthAnimation,
      {
        toValue: 350,
        duration: this.props.duration,
      }
    ).start();
    this.makeWord();
  }

  makeWord() {
    const { duration } = this.props;
    const pool = 'abcdefghijklmnopqrstuvwxyz';
    const spinningRandom = setInterval(() => {
      const randomSentenceArray = [];
      const sentenceArray = this.props.line.split(' ');
      sentenceArray.map(word => {
        let randomWord = '';
        for (let i = 0; i < word.length; i++) {
          let singleLetter = pool.charAt(Math.floor(Math.random() * pool.length));
          singleLetter = word.charAt(i) === word.charAt(i).toUpperCase() ? singleLetter.toUpperCase() : singleLetter;
          randomWord += singleLetter;
        }
        randomSentenceArray.push(randomWord);
        return true;
      });
      this.setState({
        randomSentenceArray,
      });
    }, duration / 20);
    setTimeout(() => {
      clearInterval(spinningRandom);
      this.setState({
        stop: true,
      });
    }, duration);
  }

  renderRandomWords() {
    const { randomSentenceArray } = this.state;
    return randomSentenceArray ? randomSentenceArray.map((item, index) => {
      return (
        <Text style={ styles.text } key={ index }>{ item } </Text>
      );
    }) : null;
  }

  render() {
    const { line } = this.props;
    const { stop, widthAnimation } = this.state;
    return (
      <Animated.View
        style={{ width: widthAnimation, paddingLeft: 10, flexDirection: 'column' } } // eslint-disable-line
      >
        { stop ? <Text style={ styles.text }>{ line }</Text> : this.renderRandomWords() }
      </Animated.View>
    );
  }
}

Line.propTypes = {
  line: PropTypes.string,
  duration: PropTypes.number,
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    backgroundColor: 'blue',
    height: FontsSizes.medium,
  },
  lineStyle: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
