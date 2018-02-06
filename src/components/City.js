import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Colors } from '../../resources';
import * as actions from '../../actions';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

class City extends Component {
  getImageForCity() {
    let imageSource;
    /*eslint-disable */
    switch(this.props.name) {
      case 'Belgrade':
        imageSource = require('../images/bg.jpg');
        break;
      case 'New York':
        imageSource = require('../images/ny.jpg');
        break;
      case 'São Paulo':
        imageSource = require('../images/sp.jpg');
        break;
      case 'Portland':
        imageSource = require('../images/pl.jpg');
        break;
      case 'Rio de Janeiro':
        imageSource = require('../images/ro.jpg');
        break;
        default:
        return null;
    }
    /* eslint-enable */
    return imageSource;
  }

  render() {
    return (
      <View style={ styles.container }>
        <ImageBackground source={ this.getImageForCity() } style={ styles.image }>
          <Text>{ this.props.name }</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'relative',
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

City.propTypes = {
  name: PropTypes.string,
};

export default connect(mapStateToProps, actions)(City);
