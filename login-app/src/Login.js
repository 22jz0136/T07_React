import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const userData = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    setUser(userData);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt={user.name} />
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          clientId="506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com" // ここでclientIdを指定
        />
      )}
    </div>
  );
};

export default Login;
