import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

function ProductWarning() {
  return (
    <div>
      <Navbar/>
      <div className='columnBrake'>
          <Sidebar/>
          <div>
            <h1>商品警告画面</h1>
            <SearchBar/>
          </div>
        </div>
    </div>
  )
}

export default ProductWarning