import { createClient } from 'contentful';
import { clientToken, handbookGuideModel } from '../utils/contentful';

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


const client = createClient(clientToken);

export function getData() {
  return function (dispatch) {
    dispatch(getDataStart());
    client.getEntries({
      content_type: handbookGuideModel,
    })
      .then(data => dispatch(getDataSuccess(data)))
      .catch(error => dispatch(getDataError(error)));
  };
}
