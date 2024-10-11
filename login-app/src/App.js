// App.js
import React, { useState } from 'react'; // useStateをインポート
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Router, Routes, Routeをインポート
import Login from './Login';


const clientId = "506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com";

const App = () => {
    // ログイン状態を管理するステート
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // エラーメッセージを管理するステート
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');

    // Googleログイン成功時の処理
    const responseGoogle = (userObject) => { 
        console.log("ログインできた！");
        setIsLoggedIn(true); // ログイン状態を更新
        setUserName(userObject.name); // JWTからユーザー名を設定
        setUserImage(userObject.picture); // JWTからユーザー画像を設定
        setError(''); // エラーメッセージをクリア
    };

    // Googleログイン失敗時の処理
    const onFailure = (response) => {
        console.error(response); // エラーをコンソールに表示
        setError('Google login failed'); // エラーメッセージを設定
    };

    // ログアウト処理
    const handleLogout = () => {
        setIsLoggedIn(false); // ログアウト状態にする
        setError(''); // エラーメッセージをクリア
        console.log('ログアウト成功');
        setUserName('');
        setUserImage('');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App">
                {isLoggedIn ? (
                    <div>
                      
                    
                    </div>
                ) : (
                    <div className='container'>
                        <h1>ログイン</h1>
                        <Login 
                            onSuccess={responseGoogle} // コールバックを渡す
                            onFailure={onFailure} // コールバックを渡す
                            error={error} // エラーメッセージを渡す
                        />
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;
