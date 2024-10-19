import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { getSingleBlog } from '../../../actions/blogAction';
import Spinner from '../../../utils/Spinner';
import { toast } from 'react-toastify';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const dispatch = useDispatch();
  const { loading, blog, error } = useSelector((state) => state.blogs);
  console.log(blog)

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getSingleBlog(id));
  }, [ id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        blog && (
          <Card sx={{ margin: 2 }}>
            <CardContent>
              <Typography variant="h4">{blog.title}</Typography>
              <Typography variant="subtitle1">
                {new Date(blog.createdAt).toLocaleDateString()}
              </Typography>
              {/* <img
                src={`http://localhost:5555/Upload/${blog.image}`}
                alt={blog.title}
                style={{ width: '100%', height: 'auto' }}
              /> */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {typeof blog.description === 'string'
                  ? parse(blog.description)
                  : 'No description available.'}
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </>
  );
};

export default BlogDetail;
