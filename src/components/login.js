import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 

function Login({ onSuccess, onFailure, error }) {
    const handleLoginSuccess = (credentialResponse) => {
        const userObject = jwtDecode(credentialResponse.credential); // JWTをデコード
        onSuccess(userObject); // App.jsから渡された成功時のコールバック
    };

    const handleLoginError = (error) => {
        onFailure(error); // App.jsから渡された失敗時のコールバック
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>} 
        </div>
    );
}

export default Login;
