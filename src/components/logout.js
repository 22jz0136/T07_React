import React from 'react';
import { googleLogout } from '@react-oauth/google'; // googleLogoutをインポート

function Logout({ onLogout }) {
  const handleLogout = () => {
    googleLogout(); // ログアウト処理
    onLogout(); // コールバックを呼び出す
  };

  return (
    <div id="signOutButton">
      <button onClick={handleLogout}>Logout</button> {/* ボタンをクリックでログアウト */}
    </div>
  );
}

export default Logout;
