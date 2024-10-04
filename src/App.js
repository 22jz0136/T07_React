import './App.css';
import LogoutButton from "./components/logout";
import Login from "./components/login"; 
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Logout from "./components/logout"; 
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


const clientId = "506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com";


function App() {
  

  // ログイン状態を管理するステート
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // エラーメッセージを管理するステート
  const [error, setError] = useState('');

  // Googleログイン成功時の処理
  const responseGoogle = (response) => {
    setIsLoggedIn(true); // ログイン状態を更新
    setError(''); // エラーメッセージをクリア
  };

  // Googleログイン失敗時の処理
  const onFailure = (response) => {
    console.error(response);// エラーをコンソールに表示
    setError('Google login failed');// エラーメッセージを設定
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false); // ログアウト状態にする
    setError(''); // エラーメッセージをクリア
  };


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }

    gapi.load('client:auth2', start);
  }, []); // 依存配列を追加
  
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <Logout onLogout={handleLogout} />
        </div>
      ) :  (
        <div>
          <h1>Login with Google</h1>
          <Login 
            onSuccess={responseGoogle} // コールバックを渡す
            onFailure={onFailure} // コールバックを渡す
            error={error} // エラーメッセージを渡す
          />
          </div>
      )}
    </div>
  );
}
export default App;
