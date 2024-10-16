import React from 'react'

function SidebarIcon( {userImage, userName} ) {
  return (
    <div className='SidebarIcon'>
      <img src={userImage} alt="プロフィールアイコン" style={{ width: '30px', borderRadius: '50%' }} /><br></br>
      <span>{userName}22jz01xx@jec.ac.jp</span>
    </div>
  )
}

export default SidebarIcon