import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class About extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text>work.co</Text>
        <Button
          title='Go back'
          onPress={ () => this.props.navigation.goBack() }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

About.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, actions)(About);
