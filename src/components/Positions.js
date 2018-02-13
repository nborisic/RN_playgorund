import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Colors } from '../../resources';
import Scroll from './Scroll';
import TextAnimated from './TextAnimated';
import * as actions from '../../actions';

const {
  height: deviceHeight,
} = Dimensions.get('window');

class Positions extends Component {
  renderPositions() {
    const { params } = this.props.navigation.state;
    const jobs = params.positions;
    return jobs.map((item, index) => {
      return (
        <View
          key={ index }
          style={ styles.view }
        >
          <TextAnimated
            text={ item.position }
            duration={ 1500 }
          />
        </View>
      );
    });
  }
  render() {
    return (
      <Scroll>{ this.renderPositions() }</Scroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

const styles = StyleSheet.create({
  view: {
    height: deviceHeight,
    backgroundColor: Colors.black,
  },
});

Positions.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, actions)(Positions);
