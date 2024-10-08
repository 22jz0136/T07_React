import '../css/topAdmin.css';
import React from 'react';
import { Link } from 'react-router-dom';

function TopAdmin({ userImage, userName }) {
  return (
    <div className='header'>

        <div className='navi'>
            <h1>Top Admin画面</h1>
            {/* プロフィール画像の表示 */}
            <img src={userImage} alt="プロフィール" style={{ width: '30px', borderRadius: '50%' }} />

            {/* ユーザー名の表示 */}
            <span>{userName}</span>
        </div>

        <ul>
          <li> <Link to="/top">TopUser</Link></li>
        </ul>

    </div>
  );
}

export default TopAdmin;
