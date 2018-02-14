import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Colors,
  Times,
} from '../../resources';
import City from './City';
import * as actions from '../../actions';

const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');

class CityList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      activeScreen: 1,
      opacityValue: new Animated.Value(Colors.backgroundOpacity),
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.getData('Cities');
  }

  componentDidMount() {
    this.runAnimation();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeScreen !== nextState.activeScreen) {
      Animated.timing(
        this.state.opacityValue,
        {
          toValue: Colors.backgroundOpacity,
          duration: Times.backgroundImageDuration,
        }).start(() => this.runAnimation());
    }
  }

  getImageForCity() {
    let imageSource;
    /*eslint-disable */
    switch(this.state.activeScreen) {
      case 1:
        imageSource = require('../images/bg.jpg');
        break;
      case 2:
        imageSource = require('../images/ny.jpg');
        break;
      case 3:
        imageSource = require('../images/sp.jpg');
        break;
      case 4:
        imageSource = require('../images/pl.jpg');
        break;
      case 5:
        imageSource = require('../images/ro.jpg');
        break;
        default:
        return null;
    }

    /* eslint-enable */
    return imageSource;
  }

  runAnimation() {
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: 1,
        duration: Times.backgroundImageDuration,
      }
    ).start();
  }

  /**
 * Calculating witch way did the user scroll and moving the ScrollView due to that scroll
 * @param { object } e - native event from scroll
 */
  handleScroll(e) {
    let offsetValue;
    let offsetSlides;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / deviceHeight);
    } else {
      offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / deviceHeight);
    }
    offsetValue = offsetSlides * deviceHeight;
    if (offsetValue === this.props.data.items.length * deviceHeight) {
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

  handleTranslatedTitleClick() {
    this.myScroll.scrollTo({
      x: 0,
      y: this.state.offset + deviceHeight,
      animated: true,
    });

    this.setState({
      offset: this.state.offset + deviceHeight,
      activeScreen: this.state.activeScreen + 1,
    });
  }

  renderCities() {
    const array = this.props.data && this.props.data.items;
    const cities = array && array.sort((a, b) => {
      return new Date(a.sys.createdAt) - new Date(b.sys.createdAt);
    });
    return this.props.data ? cities.map((item, index) => {
      return (
        <City
          handleTranslatedTitleClick={ () => this.handleTranslatedTitleClick() }
          info={ item }
          key={ index }
          isActive={ this.state.activeScreen === index + 1 }
          navigation={ this.props.navigation }
        />
      );
    }) : null;
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar barStyle='light-content' />
        <Animated.Image source={ this.getImageForCity() } style={ [styles.image, { opacity: this.state.opacityValue }] } />
        <View style={ styles.overlay } />
        <ScrollView
          onScrollEndDrag={ this.handleScroll }
          overScrollMode='never'
          ref={ comp => { this.myScroll = comp; } }
        >
          { this.renderCities() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: deviceHeight,
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

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData.contentfulData,
  };
};

CityList.propTypes = {
  getData: PropTypes.func,
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default connect(mapStateToProps, actions)(CityList);
