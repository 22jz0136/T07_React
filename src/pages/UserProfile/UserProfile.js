import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './UserProfile.css';
import Profile from '../../components/Profile/Profile';

function UserProfile() {
  const { id } = useParams();  // URLパラメータからユーザーIDを取得
  const [userData, setUserData] = useState(null);  // ユーザー情報の状態を管理

  useEffect(() => {
    const fetchUserData = async () => {
      // APIからデータを取得（ここではダミーデータを使用）
      const response = await fetch(`https://loopplus.mydns.jp/admin/user/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <h1>User Profile</h1>
          <SearchBar />
          {userData ? (
            <Profile user={userData} />  // userDataをProfileコンポーネントに渡す
          ) : (
            <p>Loading...</p>  // データがロード中の場合
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
