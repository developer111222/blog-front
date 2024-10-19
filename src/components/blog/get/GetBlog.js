import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { DataGrid } from '@mui/x-data-grid';  
import Paper from '@mui/material/Paper';  
import { toast } from 'react-toastify';  
import { getBlogsByUserId, ResetClear, deleteBlogAction } from '../../../actions/blogAction';  
import UpdateBlog from '../update/updateBlog';  
import DeleteIcon from '@mui/icons-material/Delete';  
import AddLinkIcon from '@mui/icons-material/AddLink';

const BASE_URL = 'https://blog-backend-latest-xxss.onrender.com/Upload/';  

export default function DataTable() {  
  const dispatch = useDispatch();  
  const { loading, blog, error } = useSelector(state => state.blogs);  
  const [rows, setRows] = useState([]);  

  useEffect(() => {  
    if (error) {  
      toast.error(error);  
      dispatch(ResetClear());  
    }  
    dispatch(getBlogsByUserId());  
  }, [dispatch, error]);  

  useEffect(() => {
    if (blog) {
      setRows(blog.map(item => ({
        id: item._id,  
        title: item.title,  
        description: item.description,  
        image: item.image,   
        date: new Date(item.createdAt).toLocaleDateString(),  
      })));
    }
  }, [blog]);

  const handleDelete = (id) => {  
    dispatch(deleteBlogAction(id))
      .then(() => {
        setRows((prevRows) => prevRows.filter(row => row.id !== id));
        toast.success("Blog deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete blog");
      });
  };  

  const columns = [  
    { field: 'id', headerName: 'ID', width: 70 },  
    { field: 'title', headerName: 'Title', width: 300 },  
    { field: 'link', headerName: 'link', width: 100,
      renderCell: (params) => (  
        <a href={`https://blog-front-tau-five.vercel.app/blog/${params.row.id}`} target="_blank" rel="noopener noreferrer">  
      view blog
        </a>  
      ),

     },  
    {  
      field: 'image',  
      headerName: 'Image',  
      width: 130,  
      renderCell: (params) => (  
        <img  
          src={`${BASE_URL}${params.value}`}  
          alt={params.value}  
          style={{ width: '100%', height: 'auto', borderRadius: '4px' }}  
        />  
      ),  
    },  
    { field: 'date', headerName: 'Date', width: 130 },  
    {  
      field: 'edit',  
      headerName: 'Edit',  
      width: 100,  
      renderCell: (params) => <UpdateBlog blog={params.row} />,  
    },  
    {  
      field: 'delete',  
      headerName: 'Delete',  
      width: 100,  
      renderCell: (params) => (  
        <DeleteIcon  
          onClick={() => handleDelete(params.row.id)}  
          style={{ cursor: 'pointer' }}  
        />  
      ),  
    },  
  ];  

  return (  
    <div className="container ms-auto">  
      <Paper sx={{ height: 400, width: '100%' }}>  
        <DataGrid  
          rows={rows}  
          columns={columns}  
          pageSize={5}  
          rowsPerPageOptions={[5, 10]}  
          checkboxSelection  
          disableSelectionOnClick  
          loading={loading}  
        />  
      </Paper>  
    </div>  
  );  
}
