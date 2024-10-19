import { CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAIL, RESET_CLEAR, GET_BLOG_REQUEST, GET_BLOG_SUCCESS, GET_SINGLE_BLOG_REQUEST, GET_SINGLE_BLOG_FAIL, GET_SINGLE_BLOG_SUCCESS, UPDATE_SINGLE_BLOG_REQUEST, UPDATE_SINGLE_BLOG_SUCCESS, UPDATE_SINGLE_BLOG_FAIL,GET_ALL_BLOG_REQUEST,GET_ALL_BLOG_SUCCESS,GET_ALL_BLOG_FAIL, DELETE_SINGLE_BLOG_REQUEST,DELETE_SINGLE_BLOG_SUCCESS,DELETE_SINGLE_BLOG_FAIL } from "../constants/blogConstant";

const initialState = {
    blog: [],    // Your initial state for the blog
    loading: false,
    success: false,
    message: null,
    error: null,
};

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BLOG_REQUEST, GET_BLOG_REQUEST, GET_SINGLE_BLOG_REQUEST, UPDATE_SINGLE_BLOG_FAIL, GET_ALL_BLOG_REQUEST, DELETE_SINGLE_BLOG_REQUEST :
            return {
                loading: true,
                success: false,
                message: null,
                error: null,
            };
        case CREATE_BLOG_SUCCESS:
            return {
                loading: false,
                createsuccess: true,
                message: action.payload.message,
                error: null,

            }
        case GET_BLOG_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                error: null,
                blog: action.payload.blogs,
            }
        case GET_SINGLE_BLOG_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                error: null,
                blog: action.payload.blog,
            }
            case UPDATE_SINGLE_BLOG_SUCCESS :
                return {
                   ...state,
                    loading: false,
                    updatesuccess: true,
                    message: action.payload.message,
                    error: null,
                  
                }
           
        case DELETE_SINGLE_BLOG_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                error: null,
                
            }
       
        case GET_ALL_BLOG_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                error: null,
                blog: action.payload.blog,
            }
   

        case CREATE_BLOG_FAIL, GET_BLOG_REQUEST, GET_SINGLE_BLOG_FAIL, UPDATE_SINGLE_BLOG_FAIL, GET_ALL_BLOG_FAIL, DELETE_SINGLE_BLOG_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload,
                createsuccess:false,
                updatesuccess:false,
            }
        case RESET_CLEAR:
            return {
                blog: [],
                loading: false,
                success: false,
                message: null,
                error: null,
            }
        default: return state
    }
}