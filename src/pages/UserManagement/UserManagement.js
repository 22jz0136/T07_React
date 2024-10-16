import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './UserManagement.css';

function UserManagement() {
  return (
      <div>
        
        <Navbar/>

        <h1>利用者管理画面</h1>
        
        <Sidebar/>
      </div>
    )
}

export default UserManagement;