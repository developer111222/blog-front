import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { Userprofile } from "../actions/userAction";

const ProtectedRoute = ({ component: Component, requireAdmin = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, isAuthenticated } = useSelector(state => state.users);





  useEffect(() => {

    if (!loading) {
      if (!isAuthenticated) {
       dispatch(Userprofile());
     if(!user){
      navigate("/signup");
     }
       
      } 
      else if (requireAdmin && user?.role !== "admin") {
        navigate("/");
      }
    
    }
  }, [loading, isAuthenticated, user, navigate, requireAdmin]);

  if (loading) {
    return <Spinner />;
  }

  return isAuthenticated && (!requireAdmin || user?.role === "admin") ? <Component /> : null;
};

export default ProtectedRoute;
