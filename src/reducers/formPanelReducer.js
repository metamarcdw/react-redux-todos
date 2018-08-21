import { FORM_PANEL_UPDATE } from '../actions/types';

const initialState = {
  'text': ''
};

export default function(state=initialState, action) {
  switch (action.type) {
    case FORM_PANEL_UPDATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
