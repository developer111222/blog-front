import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS, RESET_CLEAR, LOGIN_VALID, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAIL ,VERIFY_REQUEST,VERIFY_SUCCESS,VERIFY_FAIL,FORGET_PASSWORD_FAIL,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,RESEND_OTP_REQUEST,RESEND_OTP_FAIL,RESEND_OTP_SUCCESS} from "../constants/userConstant";

const initialState = {
    user: [],    // Your initial state for the user
  
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
     
case SIGNUP_REQUEST, LOGIN_REQUEST, PROFILE_REQUEST, VERIFY_REQUEST, FORGET_PASSWORD_REQUEST, RESEND_OTP_REQUEST,RESET_PASSWORD_REQUEST:
    return {
      ...state,
      loading: true,
      isAuthenticated: false, // Fix the typo here
    };
  
  // Same with SIGNUP_FAIL, LOGIN_FAIL, PROFILE_FAIL:
  case SIGNUP_FAIL:
  case LOGIN_FAIL:
  case PROFILE_FAIL:
    case VERIFY_FAIL  :
      case FORGET_PASSWORD_FAIL :
        case RESET_PASSWORD_FAIL:
          case LOGOUT_FAIL :
            case RESEND_OTP_FAIL :
    return {
      ...state,
      loading: false,
      isAuthenticated: false, // Fix the typo here
      success: false,
      error: action.payload,
    };
  
  // And SIGNUP_SUCCESS and LOGIN_SUCCESS
  case SIGNUP_SUCCESS:
    return {
      ...state,
      loading: false,
    issuccess: true,
      isAuthenticated: false, // Fix this typo
      message: action.payload.message,
    };
    case VERIFY_SUCCESS :
      return{
        ...state,
        loading: false,
        isverify: true,
        isAuthenticated: false, // Fix this typo
        message: action.payload.message,  // Optional, if you have a message to show
      }

  case LOGIN_SUCCESS: 
    return {
      ...state,
      loading: false,
      isAuthenticated: true, // Fix this typo
      success: true,
      message: action.payload.message,
    };

    case FORGET_PASSWORD_SUCCESS :
      return {
       ...state,
        loading: false,
        forgetsuccess: true,
        isAuthenticated: false, // Fix this typo
        message: action.payload.message,  // Optional, if you have a message to show
      }
      case RESET_PASSWORD_SUCCESS:
        return {
         ...state,
          loading: false,
          resetsuccess: true,
          isAuthenticated: false, // Fix this typo
          message: action.payload.message,  // Optional, if you have a message to show
        };
        case RESEND_OTP_SUCCESS :
          return{
            ...state,
            loading:false,
            resendotpsuccess:true,
            message:action.payload.message
          }
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true, // Ensure the user is authenticated on successful profile retrieval
        user: action.payload.user, // Assuming the payload contains the user data
        message: action.payload.message, // Optional, if you have a message to show
      };
      case LOGOUT_SUCCESS:
        return{
           ...state,
            loading: false,
            logsuccess:true,
            isAuthenticated: false, // Fix this typo
            logmessage: action.payload.message,  // Optional, if you have a message to show
        }
        case RESET_CLEAR:
            return {
                ...state,
                isAuthenticate: false,
                success: false,
                issuccess:false,
                error: null,
                message: null
            };
        default:
            return state;  // Always return the current state by default if the action type doesn't match
    }
};
