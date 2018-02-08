import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import {
  Colors,
  Styles,
  BorderSizes,
  PixelSizes,
} from '../../resources';
import * as actions from '../../actions';

const {
  height: deviceHeight,
} = Dimensions.get('window');

class City extends Component {
  splitSentence(sentence) {
    const findLastComma = sentence.lastIndexOf(',');
    const sentenceCut = sentence.slice(0, findLastComma);
    const findLastCommaInCuttedSentence = sentenceCut.lastIndexOf(',');
    const firstPart = sentenceCut.slice(0, findLastCommaInCuttedSentence);
    const cutSecondSentence = sentence.slice(findLastCommaInCuttedSentence + 2, sentence.length);
    const secondPart = cutSecondSentence.slice(0, cutSecondSentence.lastIndexOf(',') + 1);
    const thirdPart = cutSecondSentence.slice(cutSecondSentence.lastIndexOf(',') + 2);
    // + 2 is removing comma, and space
    const array = [firstPart, secondPart, thirdPart];
    return array.map((item, index) => {
      return (
        <Text style={ styles.description } key={ index }>{ item }</Text>
      );
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View>
          <Text
            style={ this.props.isActive ? styles.title : styles.titleTranslated }
            onPress={ this.props.isActive ? null : this.props.handleTranslatedTitleClick }
          >{ this.props.info.name }
          </Text>
          { this.splitSentence(this.props.info.description) }
        </View>
        <Button
          alignment={ {
            alignSelf: 'flex-end',
            marginRight: PixelSizes.medium,
          } }
          text='Read more'
          image={ require('../images/arrow.png') } //eslint-disable-line
          cta={ () => this.props.navigation.navigate('Scroll') }
          viewStyle={ {
            borderBottomColor: Colors.white,
            borderBottomWidth: BorderSizes.thin,
          } }
          imageStyle={ {
            height: PixelSizes.medium,
          } }
        />
      </View>
    );
  }
  /* eslint-enable */
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: PixelSizes.medium,
    paddingTop: PixelSizes.xlarge,
    paddingBottom: PixelSizes.xxlarge,
    height: deviceHeight,
  },
  title: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    ...Styles.title,
  },
  titleTranslated: {
    top: -PixelSizes.xxxlarge,
    backgroundColor: Colors.transparent,
    color: Colors.white,
    ...Styles.title,
  },
  description: {
    backgroundColor: Colors.transparent,
    color: Colors.gray,
    ...Styles.customTwo,
    paddingRight: PixelSizes.medium,
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

City.propTypes = {
  info: PropTypes.object,
  navigation: PropTypes.object,
  isActive: PropTypes.bool,
  handleTranslatedTitleClick: PropTypes.func,
};

export default connect(mapStateToProps, actions)(City);
