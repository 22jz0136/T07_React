import React from 'react'
import avatar1 from '../../img/avatar1.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function SidebarIcon( {userImage, userName} ) {
  return (
    <div className='SidebarIcon'>
      {userImage ? (
        <img
          src={userImage}
          alt="プロフィールアイコン"
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: '50px' }} />
      )}
      <span>{userName}</span>
    </div>
  )
}

export default SidebarIcon