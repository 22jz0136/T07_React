import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const Flag = sessionStorage.getItem('admin');
  return Flag == '1' ? children : (window.location.href = "https://loopplus.mydns.jp/");
};

export default PrivateRoute;
