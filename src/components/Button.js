import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Colors,
  Styles,
  PixelSizes,
} from '../../resources';

class Button extends Component {
  render() {
    return (
      /* eslint-disable */
      <TouchableOpacity style={ this.props.alignment } onPress={ this.props.cta }>
        <View style={ [styles.view, this.props.viewStyle] }>
          <Text style={ [styles.text, this.props.textStyle] }>{ this.props.text }</Text>
          { this.props.image ?
            <Image style={ [styles.image, this.props.imageStyle] } source={ this.props.image } />
            : null
          }
        </View>
      </TouchableOpacity>
      /* eslint-enable */
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Styles.smallText,
    color: Colors.white,
    backgroundColor: Colors.transparent,
  },
  image: {
    marginLeft: PixelSizes.small,
  },
});

Button.propTypes = {
  text: PropTypes.string,
  image: PropTypes.number,
  cta: PropTypes.func,
  viewStyle: PropTypes.object,
  textStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  alignment: PropTypes.object,
};

export default Button;
