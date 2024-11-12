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
      const fakeData = {
        id: id,
        name: '山田 太郎',
        email: 'taro.yamada@example.com',
        login_at: '2024-10-16 10:00:00',
      };
      setUserData(fakeData);
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainContent'>
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
