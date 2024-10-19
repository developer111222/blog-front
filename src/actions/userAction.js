import axios from "axios";
import getsiteurl from "../utils/getsiteurl";
import { 
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,PROFILE_REQUEST,PROFILE_SUCCESS,PROFILE_FAIL,
  RESET_CLEAR ,VERIFY_REQUEST,VERIFY_SUCCESS,VERIFY_FAIL,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS,FORGET_PASSWORD_FAIL,RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST
} from "../constants/userConstant";
import Cookies from "universal-cookie";



const url = getsiteurl();


//------signup----------
export const usersignup = (email,password) => async (dispatch) => {
    console.log(email);
    try {
        dispatch({ type: SIGNUP_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };
        
        // Send the email wrapped in an object
        const { data } = await axios.post(`${url}/api/sign`, { email,password }, config); 
        
        dispatch({ type: SIGNUP_SUCCESS, payload: data });  
    } catch (error) {
        dispatch({ 
            type: SIGNUP_FAIL, 
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message,
        });
    }
};


//------user login----------
export const userlogin = (email,password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(`${url}/api/login`, {email,password}, {
            withCredentials: true, // Allow cookies to be sent and received
        });

        
        dispatch({ type: LOGIN_SUCCESS, payload: data });
     
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message,
        });
    }
};

export const otpverify = (email, otp) => async (dispatch) => {
   
    try {
        dispatch({ type: VERIFY_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Allow cookies to be sent and received
        };
        

        // Send both email and otp in the request body
        const { data } = await axios.post(`${url}/api/otp`, {email,otp}, config);

        // Assuming the token is set by the backend in the cookies
        dispatch({ type: VERIFY_SUCCESS, payload: data });

        // Optionally navigate or perform other actions on success
    } catch (error) {
        dispatch({
            type: VERIFY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


//---------------------------FORGET PASSWORD------------------------

export const forgetpassword = (email) => async (dispatch) => {
    console.log(email, 'for');
    try {
        dispatch({ type: FORGET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };

        // Send the email in the request body
        const { data } = await axios.post(`${url}/api/forget-password`, { email }, config);

        dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });

        // Optionally navigate or perform other actions on success
    } catch (error) {
        dispatch({
            type: FORGET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


//---------------------------RESET PASSWORD------------------------

export const resetPassword =(token,newPassword)=> async(dispatch)=>{
    console.log(token,newPassword);
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };

        const {data}=await axios.post(`${url}/api/reset-password`,{token,newPassword},config)

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    }
    catch (error) {
dispatch({type:RESET_PASSWORD_FAIL,
    payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message,
})
    }
}


//-------Logout---------
export const userlogout = () => async (dispatch) => {
    try {
      

       const {data}= await axios.post(`${url}/api/logout`,null,{
            withCredentials: true  // Allow cookies to be sent and received
        });  // Assuming you have a logout endpoint
        dispatch({ type: LOGOUT_SUCCESS,payload:data });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message,
        });
    }
};


//------------user profile------------



export const Userprofile=()=> async(dispatch)=>{
    try {
        dispatch({ type: PROFILE_REQUEST });

// console.log(token)
const {data}=await axios.get(`${url}/api/profile`,{
    withCredentials: true
})


dispatch({type:PROFILE_SUCCESS,payload:data});
    } catch(error){
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message,
        });
    }
}


//-------Reset clear---
export const ResetClear = () => async (dispatch) => {
    dispatch({ type: RESET_CLEAR });
};