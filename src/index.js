import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';


ReactDOM.render(
    <GoogleOAuthProvider clientId="506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);


