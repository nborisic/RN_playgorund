import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Modal,
  Text,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Colors,
  PixelSizes,
  Times,
  RotateDegrees,
} from '../../resources';
import TextAnimated from './TextAnimated';
import ClickableView from './ClickableView';
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
      direction: 'down',
      modalVisible: false,
      modalIndex: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.runAnimation();
    }, Times.positionsFirstDuration);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeScreen !== nextState.activeScreen) {
      Animated.timing(
        this.state.opacityValue,
        {
          toValue: 0,
          duration: 0,
        }).start(() => setTimeout(() => {
        this.runAnimation();
      }, Times.positionsOnChangeDuration));
    }
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

  handleScroll(e) {
    let offsetValue;
    let offsetSlides;
    const { params } = this.props.navigation.state;
    const jobs = params.positions;
    let direction;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / deviceHeight);
      direction = 'down';
    } else {
      offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / deviceHeight);
      direction = 'up';
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
      direction,
    });
  }

  handleClick(i) {
    this.setState({
      modalVisible: true,
      modalIndex: i,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  renderPositions() {
    const { params } = this.props.navigation.state;
    const jobs = params.positions;
    return jobs.map((item, index) => {
      return (
        <ClickableView
          key={ index }
          style={ styles.view }
          cta={ () => this.handleClick(index) }
        >
          <View style={ styles.animatedView }>
            <TextAnimated
              text={ item.position }
              duration={ Times.textAnimatedDuration }
              start={ index === this.state.activeScreen - 1 }
              direction={ this.state.direction }
            />
            <TextAnimated
              text={ item.moreInfo }
              duration={ Times.textAnimatedDuration }
              start={ index === this.state.activeScreen - 1 }
              direction={ this.state.direction }
            />
          </View>
        </ClickableView>
      );
    });
  }

  renderModal() {
    const { params } = this.props.navigation.state;
    const descriptionsArray = params.positions[this.state.modalIndex].description;
    return (
      <Modal
        visible={ this.state.modalVisible }
        animationType='slide'
        onRequestClose={ () => this.closeModal() }
      >
        <View style={ styles.modal }>
          <Button
            cta={ () => this.closeModal() }
            text='X'
            alignment={ {
                width: PixelSizes.big,
                height: PixelSizes.big,
                position: 'absolute',
                top: PixelSizes.big,
                right: PixelSizes.big,
            } }
            textStyle={ {
              color: Colors.black,
            } }
          />
          <ScrollView>
            <View style={ styles.modalContent }>
              { descriptionsArray.map((item, index) => {
                return (
                  <Text
                    style={ styles.modalText }
                    key={ index }
                  >{ item }
                  </Text>
                );
              }) }
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar barStyle={ this.state.modalVisible ? 'dark-content' : 'light-content' } />
        <Button
          image={ require('../images/arrow.png') } //eslint-disable-line
          alignment={ {
              width: PixelSizes.small,
              zIndex: 1,
              marginTop: PixelSizes.medium,
              marginLeft: PixelSizes.big,
              transform: [{ rotate: RotateDegrees.halfCircle }],
          } }
          cta={ () => this.props.navigation.goBack() }
        />
        <Animated.Image
          source={ require('../images/wc.png') } //eslint-disable-line
          style={ [styles.image, { opacity: this.state.opacityValue }] }
        />
        <View style={ styles.overlay } />
        <ScrollView
          onScrollEndDrag={ this.handleScroll }
          overScrollMode='never'
          ref={ comp => { this.myScroll = comp; } }
        >
          { this.renderPositions() }
          { this.renderModal() }
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
  modal: {
    paddingHorizontal: PixelSizes.small,
    paddingBottom: PixelSizes.small,
    paddingTop: PixelSizes.xlarge,
    position: 'relative',
  },
  modalText: {
    marginBottom: PixelSizes.medium,
  },
  animatedView: {
    justifyContent: 'space-between',
    height: '70%',
  },
});

Positions.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, actions)(Positions);
