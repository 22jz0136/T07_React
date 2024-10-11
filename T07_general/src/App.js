import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; 
import Login from './components/login';
import Logout from './components/logout';
import TopUser from './pages/top';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "1068738150155-o2oiickccidjh4erqlb2b7fdc0iur48a.apps.googleusercontent.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const responseGoogle = (credentialResponse) => {
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
    console.log('User Info:', decodedToken);
    setIsLoggedIn(true);
    navigate('/top');
  };

  const onFailure = (error) => {
    console.error('Login failed:', error);
    setError('Google login failed');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Logout onLogout={handleLogout} />
          </>
        ) : (
          <div>
            <h1>ログイン</h1>
            <Login onSuccess={responseGoogle} onFailure={onFailure} error={error} />
          </div>
        )}
        <Routes>
          <Route path="/top" element={<TopUser />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
aaaaaa