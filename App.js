import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

const NUMEBER_OF_ELEMENTS = 5;
const {
    height: deviceHeight,
    } = Dimensions.get('window');

export default class App extends Component {
state = {
  offset: 0,
  end: false,
}
/**
 * Calculating witch way did the user scroll and moving the ScrollView due to that scroll
 * @param { object } e - native event from scroll
 */
 handleScroll = (e) => {
    let offsetValue;
    if (this.state.offset < e.nativeEvent.contentOffset.y) {
      const offsetSlides = Math.ceil(e.nativeEvent.contentOffset.y / 400);
      offsetValue = offsetSlides * 400;
    } else {
      const offsetSlides = Math.floor(e.nativeEvent.contentOffset.y / 400);
      offsetValue = offsetSlides * 400;
    }
    if (offsetValue === (NUMEBER_OF_ELEMENTS - 1) * 400 && !this.state.end) {
      offsetValue = e.nativeEvent.contentSize.height - deviceHeight;
      this.myScroll.scrollTo({ x: 0, y: offsetValue, animated: true });
    } else if (offsetValue < 0) {
      offsetValue = 0;
    } else {
      this.myScroll.scrollTo({ x: 0, y: offsetValue, animated: true });
    }
    this.setState({
      offset: offsetValue,
    });
   }

   renderComponents = () => {
     const componentsArray = [];
     for (let i = 0; i < NUMEBER_OF_ELEMENTS; i++) {
       componentsArray.push(
         <View style={styles.container} key={i}>
           <Text style={styles.welcome}>
             Container {i + 1}
           </Text>
         </View>
       );
     }
     return componentsArray;
   }

  render() {
    return (
      <ScrollView
        ref={comp => { this.myScroll = comp; }}
        //  onMomentumScrollEnd={this.handleScroll} need to talk about this
        onScrollEndDrag={this.handleScroll}
      >
        {this.renderComponents()}
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
