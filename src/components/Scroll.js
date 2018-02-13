import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { numberOfElements, elementHeight } from '../../utils/scroll';

const {
  height: deviceHeight,
} = Dimensions.get('window');

class Scroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  /**
 * Calculating witch way did the user scroll and moving the ScrollView due to that scroll
 * @param { object } e - native event from scroll
 */
  handleScroll(e) {
    let offsetValue;
    let offsetSlides;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / elementHeight);
    } else {
      offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / elementHeight);
    }
    offsetValue = offsetSlides * elementHeight;
    if (offsetValue === (numberOfElements - 1) * elementHeight) {
      offsetValue = e.nativeEvent.contentSize.height - deviceHeight;
    } else if (offsetValue < 0) {
      offsetValue = 0;
    }
    this.myScroll.scrollTo({ x: 0, y: offsetValue, animated: true });
    this.setState({
      offset: offsetValue,
    });
  }

  render() {
    return (
      <ScrollView
        ref={ comp => { this.myScroll = comp; } }
        onScrollEndDrag={ this.handleScroll }
        overScrollMode='never'
      >
        { this.props.children }
      </ScrollView>
    );
  }
}

Scroll.propTypes = {
  children: PropTypes.array,
};

export default Scroll;
