import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
} from 'react-native';
import City from './City';
import * as actions from '../../actions';

const cities = [
  {
    name: 'Belgrade',
    text: 'Belgrade bla bla bla',
  },
  {
    name: 'New York',
    text: 'New York bla bla bla',
  },
  {
    name: 'Portland',
    text: 'Portland bla bla bla',
  },
  {
    name: 'Rio de Janeiro',
    text: 'Rio de Janeiro bla bla bla',
  },
  {
    name: 'São Paulo',
    text: 'São Paulo bla bla bla',
  },
];

class CityList extends Component {
  renderCities() {
    return cities.map((item, index) => {
      return (
        <City key={ index } name={ item.name } image={ item.image } />
      );
    });
  }
  render() {
    return (
      <ScrollView>
        { this.renderCities() }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.contentfulData,
  };
};

export default connect(mapStateToProps, actions)(CityList);
