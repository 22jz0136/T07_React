import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './UserManagement.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserTable from '../../components/UserTable/UserTable';

function UserManagement() {
  return (
      <div>
        <Navbar/>
        <div className='columnBrake'>
          <Sidebar/>
          <div>
            <h1>利用者管理画面</h1>
            <SearchBar/>
            <UserTable/>
          </div>
          
          
        </div>

        

        
        
      </div>
    )
}

export default UserManagement;