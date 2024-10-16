import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

function ItemManagement() {
  return (
    <div>
      
      <Navbar/>
      <div className='columnBrake'>
          <Sidebar/>
          <h1>物品管理画面</h1>
        </div>
    </div>
  )
}

export default ItemManagement