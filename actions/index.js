import { createClient } from 'contentful';
import { clientToken, handbookGuideModel, handbookCitiesModel } from '../utils/contentful';

export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';

// export const GET_SCROLL_DATA_START = 'GET_SCROLL_DATA_START';
// export const GET_SCROLL_ERROR = 'GET_SCROLL_ERROR';
// export const GET_SCROLL_SUCCESS = 'GET_SCROLL_SUCCESS';


function getDataStart() {
  return {
    type: GET_DATA_START,
  };
}

function getDataSuccess(data, contentType) {
  return {
    type: GET_DATA_SUCCESS,
    data,
    contentType,
  };
}

function getDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error,
  };
}


const client = createClient(clientToken);

function getContentTypeByModel(model) {
  let contentType;
  switch (model) {
    case 'Cities':
      contentType = handbookCitiesModel;
      break;
    case 'Scroll':
      contentType = handbookGuideModel;
      break;
    default:
      return null;
  }
  return contentType;
}

export function getData(model) {
  return function (dispatch) {
    const contentType = getContentTypeByModel(model);
    dispatch(getDataStart());
    client.getEntries({
      content_type: contentType,
    })
      .then(data => dispatch(getDataSuccess(data, contentType)))
      .catch(error => dispatch(getDataError(error)));
  };
}
