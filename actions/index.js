import { createClient } from 'contentful';

export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';


function getDataStart() {
  return {
    type: GET_DATA_START,
  };
}

function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}

function getDataError(error) {
  return {
    type: GET_DATA_SUCCESS,
    error,
  };
}


const client = createClient({
  space: 'sduryu1qgysh',
  accessToken: '78e6c2a2d85a58f3cc2fd4a2817020045b30778012c2814f81593b48ee6e919c',
});

export function getData() {
  return function (dispatch) {
    dispatch(getDataStart());
    client.getEntries({
      content_type: 'H_guide',
    })
      .then(data => dispatch(getDataSuccess(data)))
      .catch(error => dispatch(getDataError(error)));
  };
}
