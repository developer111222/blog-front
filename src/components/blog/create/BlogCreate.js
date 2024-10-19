import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { createBlog,ResetClear } from '../../../actions/blogAction';  
import Editor from '../../../utils/Editor';  
import { toast } from 'react-toastify';

const BlogCreate = () => {  
    const [inputValue, setInputValue] = useState({  
        title: '',  
        content: '',  
        image: null  
    });  
    
    const dispatch = useDispatch();  

    const {loading,message,createsuccess,error}=useSelector((state)=>state.blogs)
    console.log(createsuccess,message)

    const handleChange = (e) => {  
        const { name, value, files } = e.target;  
        if (name === 'image') {  
            setInputValue(prev => ({ ...prev, [name]: files[0] }));  
        } else {  
            setInputValue(prev => ({ ...prev, [name]: value }));  
        }  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
      
        dispatch(createBlog(inputValue));  
        setInputValue({  
            title: '',  
            content: '',  
            image: null  
        });  
    };  

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(ResetClear())
        }
        if(createsuccess){
            toast.success(message);
           dispatch(ResetClear())
        }
    },[dispatch,error,createsuccess])

    return (  
        <div className="dash-container">  
            
                    <h2 className="text-center fs-2">Create a New Blog Post</h2>  
                    <form onSubmit={handleSubmit} className='p-5'>  
                   

                        <div className="my-10">  
                              
                            <input   
                                type="text"   
                                className="form-control"   
                                id='floating-input'  
                                placeholder="Heading"   
                                name='title'  
                                value={inputValue.title} // Bind input value  
                                onChange={handleChange}  
                                required  
                            />  
                        </div>  

                        <div className="my-10">  
                             
                            <Editor   
                                content={inputValue.content} // Pass current content  
                                handleChange={handleChange}  
                           
                            />  
                        </div>  

                        <div className="my-10" style={{border:'1px solid'}}>  
                          
                            <input   
                                type="file"   
                                className="form-control"  
                                placeholder='cover image' 
                                id='floating-input' 
                                name='image'  
                                onChange={handleChange}  
                                accept="image/*"  
                            />  
                        </div>  

                        <button type="submit" className="btn btn-primary">Submit Post</button>  
                    </form>  
                </div>  
         
    );  
};  

export default BlogCreate;