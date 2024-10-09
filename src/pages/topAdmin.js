import '../css/topAdmin.css';
import React from 'react';
import { Link } from 'react-router-dom';

function TopAdmin({ userImage, userName }) {
  return (
    <div className='header'>
      <h1>Top Admin画面</h1>
        <div className='loginProfile'> 
          <img src={userImage} alt="プロフィール" style={{ width: '30px', borderRadius: '50%' }} />
          <span>{userName}</span>
        </div>

        <div className='managementList'>
          <ul>
            <li> <Link to="/top">TopUser</Link></li>
            <li><Link to="/usermanagement">利用者を管理する</Link></li>
            <li><Link to="/itemmanagement">物品を管理する</Link></li>
            <li><Link to="/qamanagement">Q&Aを管理する</Link></li>
            <li>ログアウト</li>
        </ul>
        </div>
        

    </div>
  );
}

export default TopAdmin;
