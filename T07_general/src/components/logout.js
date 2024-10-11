// components/logout.js
import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <button onClick={onLogout}>ログアウト</button>
  );
};

export default Logout;
