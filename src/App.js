// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Userprofile } from './actions/userAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveAppBar from './components/header/Header';
import Home from './components/home/Home';
import Signup from './components/authenticate/signup';
import Login from './components/authenticate/Login' ;
import OtpVerify from './components/authenticate/OtpVerify';
import AdminDashboard from './components/dashboard/AdminDashboard';
import FriendRequest from './components/websocket/SocketCon';
import ProtectedRoute from './utils/ProtectedRoute';
import store from './store';
import { useSelector } from 'react-redux';
import Profile from './components/authenticate/Profile';
import BlogCreate from './components/blog/create/BlogCreate';
import UserDashboard from './components/dashboard/UserDashboard';
import BlogDetail from './components/blog/UI/BlogDetail';
import BlogCard from './components/blog/UI/BlogCard';
import ForgetPassword from './components/authenticate/ForgetPassword';
import ResetPassword from './components/authenticate/ResetPassword';
import UpdateBlog from './components/blog/update/updateBlog';
import MobileHeader from './components/header/MobileHeader';


function App() {

 

  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <ResponsiveAppBar  />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
 <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/blog" element={<BlogCard />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
         
          <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile } />} />
          <Route path="/create-blog" element={<ProtectedRoute component={BlogCreate } />} />
          {/* <Route path="/update-blog" element={<ProtectedRoute component={UpdateBlog } />} /> */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
       
          <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} requireAdmin={true} />} />

       
          {/* <Route 
            path="/socket" 
            element={
              <ProtectedRoute>
                <FriendRequest />
              </ProtectedRoute>
            } 
          /> */}
        </Routes>
      </Router>

      {/* Global Toast Notification Configuration */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <MobileHeader/>
    </div>
  );
}

export default App;
