import { CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAIL, RESET_CLEAR, GET_BLOG_REQUEST, GET_BLOG_SUCCESS, GET_BLOG_FAIL, GET_SINGLE_BLOG_REQUEST,GET_SINGLE_BLOG_SUCCESS,GET_SINGLE_BLOG_FAIL, UPDATE_SINGLE_BLOG_REQUEST,UPDATE_SINGLE_BLOG_SUCCESS,UPDATE_SINGLE_BLOG_FAIL,GET_ALL_BLOG_REQUEST,GET_ALL_BLOG_SUCCESS,GET_ALL_BLOG_FAIL, DELETE_SINGLE_BLOG_REQUEST,DELETE_SINGLE_BLOG_SUCCESS,DELETE_SINGLE_BLOG_FAIL } from "../constants/blogConstant";
import getsiteurl from "../utils/getsiteurl";
import axios from "axios"

const url = getsiteurl();

export const createBlog = (inputValue) => async (dispatch) => { console.log(inputValue);
    try {
        dispatch({ type: CREATE_BLOG_REQUEST })
        const formData = new FormData();
        for (let key in inputValue) {
            formData.append(key, inputValue[key])
        }
        
        const config = { 
            headers: { 
                'Content-Type': 'multipart/form-data' 
            },
            withCredentials: true  // Ensure withCredentials is part of the config object
        };
        

        const { data } = await axios.post(`${url}/api/create-blog`, formData, config)

        dispatch({ type: CREATE_BLOG_SUCCESS, payload: data })

    }
    catch (error) {
dispatch({type:CREATE_BLOG_FAIL,
    payload: error.response && error.response.data.message
    ? error.response.data.message
    : error.message,
})
    }

}


//-----------------------------------GET BLOG BY USER------


export const getBlogsByUserId = () => async (dispatch) => {

    try {
       dispatch( {type:GET_BLOG_REQUEST})

       const { data } = await axios.get(`${url}/api/get-blog`,{
        withCredentials: true
       })

       dispatch({ type: GET_BLOG_SUCCESS, payload: data })
        
    } catch (error) {
        dispatch({type:GET_BLOG_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


//------------------GET SINGLE BLOG-------------------

export const getSingleBlog = (id) => async (dispatch) => {
    console.log(id,"id")
    try {
        dispatch({ type: GET_SINGLE_BLOG_REQUEST });

        const { data } = await axios.get(`${url}/api/get-single-blog/${id}`, {
          
        });

        dispatch({ type: GET_SINGLE_BLOG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_SINGLE_BLOG_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message,
        });
    }
};

//--------------------------------UPDATE SINGLE BLOG BY ID---------------------

export const updateBlogAction=(id,inputValue)=> async(dispatch)=>{

    console.log(id,inputValue,"id,value")
    try {
        dispatch({ type: UPDATE_SINGLE_BLOG_REQUEST });

        const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('content', inputValue.content);
    if (inputValue.image) {
        formData.append('image', inputValue.image);
    }
        
        const config = {  
            headers: {  
                'Content-Type': 'multipart/form-data',  
            },  
            withCredentials: true,  
        };  

        const {data}=await axios.patch(`${url}/api/update-blog/${id}`, formData, config)
        dispatch({type:UPDATE_SINGLE_BLOG_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:UPDATE_SINGLE_BLOG_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message,
        })
    }
}


//-------------DELETE BLOG---------------

export const deleteBlogAction=(id)=> async(dispatch)=>{

    try {
        dispatch({ type: DELETE_SINGLE_BLOG_REQUEST });

        const { data } = await axios.delete(`${url}/api/delete-blog/${id}`, {
            withCredentials: true,
        });

        dispatch({ type: DELETE_SINGLE_BLOG_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({ type: DELETE_SINGLE_BLOG_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message,

        })
    }
}


//------------------------------GET ALL BLOGS---------------


export const getAllBlogs = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ALL_BLOG_REQUEST });

        const { data } = await axios.get(`${url}/api/get-all-blogs`);

        dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data });
        
    } catch (error) {
        dispatch({ type: GET_ALL_BLOG_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message,

        })
    }
}

export const ResetClear = () => async (dispatch) => {
    dispatch({ type: RESET_CLEAR });
};