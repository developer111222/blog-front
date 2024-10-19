import {
    FETCH_FRIEND_REQUESTS_SUCCESS,FETCH_FRIEND_REQUESTS_REQUEST,FETCH_FRIEND_REQUESTS_FAIL,
    SEND_FRIEND_REQUEST_SUCCESS,SEND_FRIEND_REQUEST_REQUEST,SEND_FRIEND_REQUEST_FAIL,
    RESPOND_TO_FRIEND_REQUEST_SUCCESS,RESPOND_TO_FRIEND_REQUEST_REQUEST,RESPOND_TO_FRIEND_REQUEST_FAIL,
    CLEAR_REQUEST
   
  } from '../constants/socketConstant';
  
  // const initialState = {
  //   friendRequests: [],
  //   error: null,
  // };
  
  export const friendRequestsReducer = (state = {friendRequests: []}, action) => {
    switch (action.type) {
case FETCH_FRIEND_REQUESTS_REQUEST,SEND_FRIEND_REQUEST_REQUEST,RESPOND_TO_FRIEND_REQUEST_REQUEST :
  return{
...state,
loading:true
  }

      case FETCH_FRIEND_REQUESTS_SUCCESS:
        return {
          ...state,
          loading:true,
          friendRequests: action.payload.data,
        };
      case SEND_FRIEND_REQUEST_SUCCESS: return{
        ...state,
        loading:false,
        message: action.payload
      }
      case RESPOND_TO_FRIEND_REQUEST_SUCCESS:
        // Typically you might update the state here
        return {
          ...state,
          loading:false,
          message: action.payload
        };
      case FETCH_FRIEND_REQUESTS_FAIL: case SEND_FRIEND_REQUEST_FAIL: case RESPOND_TO_FRIEND_REQUEST_FAIL:
        return {
          ...state,
          loading:false,
          error: action.payload,
        };
        case CLEAR_REQUEST : return{
          ...state,
          
          error: null,
          loading: false,
          message: null,
        }
      default:
        return state;
    }
  };
  

  