import {
  FETCH_libraries_SUCCESS,
  FETCH_libraries_FAILURE,
} from '../types';

const initialState = {
  isLoaded: false,
  showError: false,
  libraries: [],
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_libraries_SUCCESS:
      return {...state, isLoaded: true, libraries: [...action.payload] };
    case FETCH_libraries_FAILURE:
      return {...state, showError: true };
    default: return state;
  }
}