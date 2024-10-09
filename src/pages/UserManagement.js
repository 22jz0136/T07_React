import React from 'react'
import Sidebar from '../components/Sidebar';
import '../css/UserManagement.css';

function UserManagement({userImage, userName}) {
  return (
    
    <div className='UserManagement'>
        <Sidebar userName={userName} userImage={userImage}/>
    </div>
    
  )
}

export default UserManagement;