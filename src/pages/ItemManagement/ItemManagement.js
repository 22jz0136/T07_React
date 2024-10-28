import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './ItemManagement.css';
import Profile from '../../components/Profile/Profile';


function ItemManagement() {
  return (
    <div> 
      <Navbar/>
      <div className='columnBrake'>
          <Sidebar/>
          <div>
            <h1>物品管理画面</h1>
            <SearchBar/>
            <Profile/>
          </div>
        </div>
    </div>
  )
}

export default ItemManagement