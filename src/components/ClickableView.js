import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ClickableView extends Component {
  render() {
    return (
      <TouchableOpacity onPress={ this.props.cta } style={ this.props.style }>
        <View>
          { this.props.children }
        </View>
      </TouchableOpacity>
    );
  }
}

ClickableView.propTypes = {
  children: PropTypes.object,
  style: PropTypes.number,
  cta: PropTypes.func,
};
