import {
  GET_DATA_START,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
} from '../actions';


const initinalState = {
  getDataLaoding: false,
  getDataError: null,
  contentfulData: null,
  scrollData: null,
};

const actionMap = {
  [GET_DATA_START]: (state) => {
    return {
      ...state,
      getDataLaoding: true,
      getDataError: false,
    };
  },
  [GET_DATA_ERROR]: (state, action) => {
    return {
      ...state,
      getDataLaoding: false,
      getDataError: action.error,
    };
  },
  [GET_DATA_SUCCESS]: (state, action) => {
    const typeMap = {
      'cities': 'contentfulData',
      'H_guide': 'scrollData',
    };

    return {
      ...state,
      getDataLaoding: false,
      [typeMap[action.contentType]]: action.data,
    };
  },
};

export default function reduces(state = initinalState, action = {}) {
  const fn = actionMap[action.type];
  return fn ? fn(state, action) : state;
}
