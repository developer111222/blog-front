import { FETCH_FRIEND_REQUESTS_SUCCESS,FETCH_FRIEND_REQUESTS_REQUEST,FETCH_FRIEND_REQUESTS_FAIL,
    SEND_FRIEND_REQUEST_SUCCESS,SEND_FRIEND_REQUEST_REQUEST,SEND_FRIEND_REQUEST_FAIL,
    RESPOND_TO_FRIEND_REQUEST_SUCCESS,RESPOND_TO_FRIEND_REQUEST_REQUEST,RESPOND_TO_FRIEND_REQUEST_FAIL
    ,CLEAR_REQUEST} from '../constants/socketConstant'
    import getsiteurl from "../utils/getsiteurl";
import axios from 'axios';
import { toast } from 'react-toastify';

    const API_URL = getsiteurl();

    // Fetch friend requests
export const fetchFriendRequests = (userId) => async (dispatch) => {
console.log(userId,"lkjhg")
    try {
      dispatch({ type: FETCH_FRIEND_REQUESTS_REQUEST}); // Clear previous requests if any
      const data = await axios.get(`${API_URL}/api/vi/friend-requests/${userId}`, {
        // params: userId , 
                withCredentials: true,
      });
    
      dispatch({
        type: FETCH_FRIEND_REQUESTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      
      dispatch({ type: FETCH_FRIEND_REQUESTS_FAIL, 
       payload: error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message,
       });
    }
  };
  
  // Send a friend request
  export const sendFriendRequest = (details) => async (dispatch) => {
   console.log(details);
    try {
      dispatch({type:SEND_FRIEND_REQUEST_REQUEST})
      const {data}=await axios.post(`${API_URL}/api/vi/friend-request/send`,  details, {withCredentials: true });
      console.log(data,"data");
      dispatch({ type: SEND_FRIEND_REQUEST_SUCCESS,payload: data});
    
    } catch (error) {
      
      dispatch({ type: SEND_FRIEND_REQUEST_FAIL, 
        payload: error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message,});
    }
  };
  
  // Respond to a friend request
  export const respondToRequest = (acceptrequest) => async (dispatch) => {

    console.log(acceptrequest,"lokk");
    try {
      dispatch({type:RESPOND_TO_FRIEND_REQUEST_REQUEST})
     const {data}= await axios.post(`${API_URL}/api/vi/friend-request/respond`, acceptrequest, { withCredentials: true });
      dispatch({ type: RESPOND_TO_FRIEND_REQUEST_SUCCESS,payload:data });
      
    } catch (error) {
      
      dispatch({ type: RESPOND_TO_FRIEND_REQUEST_FAIL,
        payload: error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message, });
    }
  };


  // Clear request
  export const clearRequest = () => async (dispatch) => {
    dispatch({ type: CLEAR_REQUEST });
  };
  

//reducer.js