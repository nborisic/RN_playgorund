import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import {
  Colors,
  FontsSizes,
  PixelSizes,
  BorderSizes } from '../../resources';
import { numberOfElements, elementHeight } from '../../utils/scroll';
import TextAnimated from './TextAnimated';


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

  componentWillMount() {
    this.props.getData();
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

  renderComponents() {
    const componentsArray = [];
    const text = this.props.data.contentfulData.items[0].fields.shortDescritpion;
    for (let i = 0; i < numberOfElements; i++) {
      componentsArray.push(
        <View style={ styles.container } key={ i }>
          <TextAnimated
            text={ text }
            duration={ 1500 }
            navigation={ this.props.navigation }
          />
        </View>
      );
    }
    return componentsArray;
  }

  render() {
    if (!this.props.data.contentfulData) {
      return (<View><Text>Loading...</Text></View>);
    }
    return (
      <ScrollView
        ref={ comp => { this.myScroll = comp; } }
        onScrollEndDrag={ this.handleScroll }
        overScrollMode='never'
      >
        {this.renderComponents()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: elementHeight,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderBottomWidth: BorderSizes.thin,
    borderColor: Colors.white,
  },
  welcome: {
    fontSize: FontsSizes.medium,
    textAlign: 'center',
    margin: PixelSizes.medium,
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

Scroll.propTypes = {
  getData: PropTypes.func,
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default connect(mapStateToProps, actions)(Scroll);
