import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './UserProfile.css';
import Profile from '../../components/Profile/Profile';
import avatar1 from '../../img/avatar1.png';
import { data } from 'autoprefixer';


function UserProfile() {
  const { id } = useParams(); // URLパラメータからユーザーIDを取得
  const [data, setUserData] = useState(null); // ユーザー情報の状態を管理
  const [loading, setLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // APIからデータを取得
        const response = await fetch(`https://loopplus.mydns.jp/admin/user/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data', data);
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar/>
        <div className='mainbody'>
          <h1>User Profile1</h1>
          <SearchBar />
          {loading ? (
            <p>Loading...</p> 
          ) : data ? (
            <div>
              <img src={`https://loopplus.mydns.jp/${data[0].Icon}`} alt="User Icon" />
              <h2>{data[0].Username}</h2>
              <p>{data[0].Email}</p>
              <Profile/> 
            </div>
            
          ) : (
            <p>User data not found.</p> 
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
