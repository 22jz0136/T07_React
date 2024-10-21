import React from 'react'
import avatar1 from '../../img/avatar1.png';

// function SidebarIcon( {userImage, userName} ) {
//   return (
//     <div className='SidebarIcon'>
//       <img src={userImage} alt="プロフィールアイコン" style={{ width: '30px', borderRadius: '50%' }} /><br></br>
//       <span>{userName}22jz01xx@jec.ac.jp</span>
//     </div>
//   )
// }

function SidebarIcon() {
  return (
    <div className='SidebarIcon'>
      <img src={avatar1} alt="プロフィールアイコン" style={{ width: '50px', borderRadius: '50%' }} /><br />
      <span>22jz01xx@jec.ac.jp</span>
    </div>
  );
}

export default SidebarIcon