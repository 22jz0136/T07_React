import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
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
            
            <SearchBar/>
            <div className='usertable'>
              <UserTable/>
            </div>
            
          </div>
          
          
        </div>

        

        
        
      </div>
    )
}

export default UserManagement;