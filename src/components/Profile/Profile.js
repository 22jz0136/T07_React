import React from 'react'
import "./Profile.css";
import { ProfileData } from './ProfileData';
import SidebarIcon from '../../components/Sidebar/SidebarIcon';

export function Profile({ userImage, userName }) {
  return (
    <div className='Profile'>
        <div className='ProfileIcon'>
            {/* <SidebarIcon userName={userName} userImage={userImage}/> */}
        </div>
        
        <ul className='ProfileList'>
            {ProfileData.map((value, key) => {
                return (
                    <li key={key} 
                    id={window.location.pathname == value.link ? "active" : ""}
                    className='Profilerow' onClick={() => {
                        window.location.pathname = value.link;
                    }}>
                        <div id='title'>{value.title}</div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Profile;
