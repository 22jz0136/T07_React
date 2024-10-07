import React from 'react';


function TopAdmin({ userImage, userName }) {
  return (
    <div className='header'>
      <h1>Top Admin画面</h1>
      {/* プロフィール画像の表示 */}
      <img src={userImage} alt="プロフィール" style={{ width: '30px', borderRadius: '50%' }} />

      {/* ユーザー名の表示 */}
      <span>{userName}</span>
    </div>
  );
}

export default TopAdmin;
