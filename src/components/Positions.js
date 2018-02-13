import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Colors, PixelSizes } from '../../resources';
import TextAnimated from './TextAnimated';
import Button from './Button';
import * as actions from '../../actions';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

class Positions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      activeScreen: 1,
      opacityValue: new Animated.Value(0),
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(
        this.state.opacityValue,
        {
          toValue: 1,
          duration: 500,
        }
      ).start();
    }, 3000);
  }

  getImageForPosition() {
    let imageSource;
    /*eslint-disable */
    switch(this.state.activeScreen) {
      case 1:
        imageSource = require('../images/wc.png');
        break;
      case 2:
        imageSource = require('../images/dev.jpg');
        break;
      case 3:
        imageSource = require('../images/qa.jpg');
        break;
      case 4:
        imageSource = require('../images/dev.jpg');
        break;
        default:
        return null;
    }
    /* eslint-enable */
    return imageSource;
  }

  handleScroll(e) {
    let offsetValue;
    let offsetSlides;
    const { params } = this.props.navigation.state;
    const jobs = params.positions;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / deviceHeight);
    } else {
      offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / deviceHeight);
    }
    offsetValue = offsetSlides * deviceHeight;
    if (offsetValue === jobs.length * deviceHeight) {
      offsetValue = e.nativeEvent.contentSize.height - deviceHeight;
    } else if (offsetValue < 0) {
      offsetValue = 0;
    }
    this.myScroll.scrollTo({ x: 0, y: offsetValue, animated: true });
    this.setState({
      offset: offsetValue,
      activeScreen: (offsetValue / deviceHeight) + 1,
    });
  }

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
      <View style={ styles.container }>
        <Button
          text='Go back'
          alignment={ {
              width: 100,
              zIndex: 1,
              marginTop: 15,
          } }
          cta={ () => this.props.navigation.goBack() }
        />
        <Animated.Image
          source={ this.getImageForPosition() }
          style={ [styles.image, { opacity: this.state.opacityValue }] }
        />
        <View style={ styles.overlay } />
        <ScrollView
          onScrollEndDrag={ this.handleScroll }
          overScrollMode='never'
          ref={ comp => { this.myScroll = comp; } }
        >
          { this.renderPositions() }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  view: {
    height: deviceHeight,
    backgroundColor: Colors.transparent,
    // position: 'relative',
    paddingTop: PixelSizes.xlarge,
    paddingBottom: PixelSizes.xxlarge,
  },
  image: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    backgroundColor: Colors.black,
    opacity: Colors.overlayOpacity,
    height: deviceHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

Positions.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, actions)(Positions);
