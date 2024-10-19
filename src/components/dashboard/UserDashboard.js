import * as React from 'react';  
import PropTypes from 'prop-types';  
import Box from '@mui/material/Box';  
import Typography from '@mui/material/Typography';  
import { createTheme } from '@mui/material/styles';  
import DashboardIcon from '@mui/icons-material/Dashboard';  
import { AppProvider } from '@toolpad/core/AppProvider';  
import { DashboardLayout } from '@toolpad/core/DashboardLayout';  
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  
import BarChartIcon from '@mui/icons-material/BarChart';  
import Profile from '../authenticate/Profile';  
import BlogCreate from '../blog/create/BlogCreate';  
import GetBlog from '../blog/get/GetBlog';
import ResponsiveAppBar from '../authenticate/avtar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Userprofile ,userlogout} from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const NAVIGATION = [  
   {  
      segment: 'dashboard',  
      title: 'Dashboard',  
      icon: <DashboardIcon />,  
   },  
   {  
      segment: 'profile',  
      title: 'Profile',  
      icon: <ShoppingCartIcon />,  
   },  
   {  
      segment: 'blog',  
      title: 'Blog',  
      icon: <BarChartIcon />,  
   },
   {  
      segment: 'all',  
      title: 'all',  
      icon: <BarChartIcon />,  
   },   
];  

// const demoTheme = createTheme({  
//    cssVariables: {  
//       colorSchemeSelector: 'data-toolpad-color-scheme',  
//    },  
//    colorSchemes: { light: true, dark: true },  
//    breakpoints: {  
//       values: {  
//          xs: 0,  
//          sm: 600,  
//          md: 600,  
//          lg: 1200,  
//          xl: 1536,  
//       },  
//    },  
// });  

function DemoPageContent({ pathname }) {  
   let content;  

   switch (pathname) {  
      case '/profile':  
         content = <Profile />;  
         break;  
      case '/blog':  
         content = <BlogCreate />;  
         break;  
         case '/all':  
         content = <GetBlog />;  
         break; 
      default:  
         content = <Typography>Dashboard content for {pathname}</Typography>;  
   }  

   return (  
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>  
    {content}  
</Box>
   );  
}  

DemoPageContent.propTypes = {  
   pathname: PropTypes.string.isRequired,  
};  

function DashboardLayoutAccount(props) {  
   // const { window } = props;  
   const dispatch = useDispatch();
const navigate=useNavigate()

   const { loading, error, user,logmessage,logsuccess,isAuthenticated } = useSelector(state => state.users);

   console.log(user.email)
   React.useEffect(() => {
      if(!isAuthenticated){
      
        dispatch(Userprofile());
      }
        }, [dispatch,isAuthenticated]);
      
        React.useEffect(() => {
          if (error) {
            toast.error(error);
          }
        }, [error]);
      
        
   const [session, setSession] = React.useState({  
      user: {  
         name: `${user.email}`,  
        
         image: 'https://avatars.githubusercontent.com/u/19550456',  
      },  
   });  

   const authentication = React.useMemo(() => {  
      return {  
         signOut: () => {
            dispatch(userlogout())
            // toast.success("user logout");
            navigate('/')
            
            if(logsuccess){
            toast.success(logmessage);

                navigate('/')
             }
          },
}}, [logmessage,logsuccess]);  

   const [pathname, setPathname] = React.useState('/dashboard');  

   const router = React.useMemo(() => {  
      return {  
         pathname,  
         searchParams: new URLSearchParams(),  
         navigate: (path) => setPathname(String(path)),  
      };  
   }, [pathname]);  

   // Remove this const when copying and pasting into your project.  
   // const demoWindow = window !== undefined ? window() : undefined;  

   return (  
      // preview-start  
      <AppProvider  
         session={session}  
         authentication={authentication}  
         navigation={NAVIGATION}  
         router={router}  
         // theme={demoTheme}  
         // window={demoWindow}  
      >  
         <DashboardLayout>  
            <DemoPageContent pathname={pathname} />  
         </DashboardLayout>  
      </AppProvider>  
      // preview-end  
   );  
}  

DashboardLayoutAccount.propTypes = {  
   /**  
    * Injected by the documentation to work in an iframe.  
    * Remove this when copying and pasting into your project.  
    */  
   window: PropTypes.func,  
};  

export default DashboardLayoutAccount;