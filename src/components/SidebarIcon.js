import React from 'react'

function SidebarIcon( {userImage, userName} ) {
  return (
    <div className='SidebarIcon'>
      <img src={userImage} alt="プロフィール" style={{ width: '30px', borderRadius: '50%' }} />
      <span>{userName}</span>
    </div>
  )
}

export default SidebarIcon