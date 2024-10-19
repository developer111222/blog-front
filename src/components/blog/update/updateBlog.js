import * as React from 'react';  
import Button from '@mui/material/Button';  
import Dialog from '@mui/material/Dialog';  
import DialogActions from '@mui/material/DialogActions';  
import DialogContent from '@mui/material/DialogContent';  
import DialogTitle from '@mui/material/DialogTitle';  
import useMediaQuery from '@mui/material/useMediaQuery';  
import { useTheme } from '@mui/material/styles';  
import Editor from '../../../utils/Editor';  
import EditNoteIcon from '@mui/icons-material/EditNote';  
import { useDispatch, useSelector } from 'react-redux';  
import { updateBlogAction, getBlogsByUserId,ResetClear } from '../../../actions/blogAction'; // Import actions accordingly  
import { toast } from 'react-toastify';
export default function UpdateBlog({ blog }) {  
  
  const [open, setOpen] = React.useState(false);  
  const theme = useTheme();  
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));  
  const dispatch = useDispatch();  

  const {loading,error,updatesuccess}=useSelector((state)=>state.blogs)

  const [inputValue, setInputValue] = React.useState({  
    title: blog.title,  
    content: blog.description,  
    image: blog.image,  
  });  

  const handleClickOpen = () => {  
    setOpen(true);  
  };  

  const handleClose = () => {  
    setOpen(false);  
  };  

  const handleChange = (e) => {  
    const { name, value, files } = e.target;  
    if (name === 'image') {  
      setInputValue(prev => ({ ...prev, [name]: files[0] }));  
    } else {  
    }  
    setInputValue(prev => ({ ...prev, [name]: value }));  
  };  

  // const handleSubmit = async (e) => {  
  //   e.preventDefault();  
  //   const id=blog.id;
  //   console.log(id,inputValue)
  //   await dispatch(updateBlogAction(blog.id, inputValue)); // Assuming this is your update action  
  //   await dispatch(getBlogsByUserId()); // Fetch updated blogs  
  //   handleClose();  
  // };  
  const handleSubmit = async (e) => {  
    e.preventDefault();  

    try {  
      console.log('Submitting:', inputValue);  
        await dispatch(updateBlogAction(blog.id, inputValue));  
        toast.success('Update  successfully');  
        handleClose();  
        await dispatch(getBlogsByUserId());  
    } catch (error) {  
        toast.error("Error updating blog:", error);  
    }  
};

React.useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch(ResetClear())
  }
 
},[dispatch,error])


  return (  
    <React.Fragment>  
      <Button variant="outlined" onClick={handleClickOpen}>  
        <EditNoteIcon />  
      </Button>  
      <Dialog  
        fullScreen={fullScreen}  
        open={open}  
        onClose={handleClose}  
        aria-labelledby="responsive-dialog-title"  
      >  
        <DialogTitle id="responsive-dialog-title">  
          {"Update Blog"}  
        </DialogTitle>  
        <DialogContent>  
          <form onSubmit={handleSubmit}>  
            <div className="my-10">  
              <input  
                type="text"  
                className="form-control"  
                id="floating-input"  
                placeholder="Title"  
                name='title'  
                value={inputValue.title}  
                onChange={handleChange}  
                required  
              />  
            </div>  

            <div className="my-10">  
              <Editor  
                content={inputValue.content}  
                value={inputValue.content}  
                handleChange={handleChange}  
              />  
            </div>  

            <div className="my-10">  
              {inputValue.image && <p>Selected file: {inputValue.image}</p>}  
              <input  
                type="file"  
                className="form-control"  
                placeholder='Cover image'  
                id="blogImage"  
                name='image'  
                onChange={handleChange}  
                accept="image/*"  
              />  
            </div>  
          </form>  
        </DialogContent>  
        <DialogActions>  
          <Button onClick={handleClose}>Cancel</Button>  
          <Button onClick={handleSubmit} autoFocus>Update</Button>  
        </DialogActions>  
      </Dialog>  
    </React.Fragment>  
  );  
}