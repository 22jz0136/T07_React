import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './UserProfile.css';
import Profile from '../../components/Profile/Profile';
import avatar1 from '../../img/avatar1.png';


function UserProfile() {
  const { id } = useParams(); // URLパラメータからユーザーIDを取得
  const [userData, setUserData] = useState(null); // ユーザー情報の状態を管理
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
        setUserData(data); // データを状態にセット
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar/>
        <div className='mainbody'>
          <h1>User Profile</h1>
          <SearchBar />
          {loading ? (
            <p>Loading...</p> // データがロード中の場合
          ) : userData ? (
            <Profile userData={userData} /> // id を userId として渡す
          ) : (
            <p>User data not found.</p> // ユーザー情報がない場合
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
