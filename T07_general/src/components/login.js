import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess, onFailure, error }) => {
  return (
    <div>
      {error && <p>{error}</p>}
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
      />
    </div>
  );
};

export default Login;
