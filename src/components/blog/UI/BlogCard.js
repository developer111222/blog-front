import * as React from 'react';  
import { styled } from '@mui/material/styles';  
import Card from '@mui/material/Card';  
import CardHeader from '@mui/material/CardHeader';  
import CardMedia from '@mui/material/CardMedia';  
import CardContent from '@mui/material/CardContent';  
import CardActions from '@mui/material/CardActions';  
import Avatar from '@mui/material/Avatar';  
import IconButton from '@mui/material/IconButton';  
import Typography from '@mui/material/Typography';  
import { red } from '@mui/material/colors';  
import MoreVertIcon from '@mui/icons-material/MoreVert';  
import { useDispatch, useSelector } from 'react-redux';  
import { getAllBlogs, ResetClear } from '../../../actions/blogAction';  
import { toast } from 'react-toastify';  
import Grid from '@mui/material/Grid';  
import parse from 'html-react-parser';  
import Spinner from '../../../utils/Spinner';
import { useNavigate } from 'react-router-dom';

export default function BlogCard() {  
  const url = 'https://blog-backend-latest-xxss.onrender.com/Upload/';  
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { loading, blog, error } = useSelector(state => state.blogs);  

  React.useEffect(() => {  
    const fetchBlogs = async () => {  
      await dispatch(getAllBlogs());  
    };  
    fetchBlogs();  
    if (error) {  
      toast.error(error);  
      dispatch(ResetClear());  
    }  
  }, [dispatch, error]);   

  return (  
    <>  
    <div className='container' style={{padding:"20px 0"}}>
      {loading ? <Spinner /> :  
      <Grid container spacing={2} >  
        {Array.isArray(blog) && blog.map((item, index) => (  
          <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }} onClick={() => navigate(`/blog/${item._id}`)}>  
            <Card sx={{ flex: 1, marginBottom: 2, display: 'flex', flexDirection: 'column' }}>  
              <CardHeader  
                avatar={  
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">  
                    R  
                  </Avatar>  
                }  
                // action={  
                //   <IconButton aria-label="settings">  
                //     <MoreVertIcon />  
                //   </IconButton>  
                // }  
                title={item.title}  
                subheader={new Date(item.createdAt).toLocaleDateString()}  
              />  
              <CardMedia  
                component="img"  
                height="194"  
                image={`${url}${item.image}`}  
                alt={item.title}  
              />  
              <CardContent sx={{ flexGrow: 1 }}>  
                <Typography variant="body2" 
                  sx={{
                    color: 'text.secondary',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                  }}>  
                  {parse(item.description)}  
                </Typography>  
              </CardContent>  
              <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Author:
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                  {item.user && item.user.email}
                </Typography>
              </CardActions> 
            </Card>  
          </Grid>  
        ))}  
      </Grid>  
      }  
      </div>
    </>  
  );  
}
  
