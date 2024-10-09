import React from 'react';
import { SidebarData } from './SidebarData';
import SidebarIcon from './SidebarIcon';

function Sidebar({ userImage, userName }) {
  return (
    <div className='Sidebar'>
        <SidebarIcon userName={userName} userImage={userImage}/>
        <ul className='SidebarList'>
            {SidebarData.map((value, key) =>  {
                return (
                    <li key={key} 
                    id={window.location.pathname == value.link ? "active" : ""}
                    className='row' onClick={() => {
                        window.location.pathname = value.link;
                    }}>
                        <div id='icon'>{value.icon}</div>
                        <div id='title'>{value.title}</div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Sidebar