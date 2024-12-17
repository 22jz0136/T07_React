import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './UserProfile.css';
import Profile from '../../components/Profile/Profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  }, [id]); // idを依存関係に追加

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <h1>ユーザー情報</h1>
          {loading ? (
            <p>Loading...</p>
          ) : data && data.length > 0 ? (
            <div>
            <div className='user-div'>
              {data[0].Icon ? (
                <img
                  src={`https://loopplus.mydns.jp/${data[0].Icon}`} // data[0].Iconを使用
                  alt="User Icon"
                  className="avatar-icon"
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: 40 }} />
              )}
              <div className='user-div2'>
              <h2>{data[0].Username}</h2>
              <p>{data[0].Email}</p>
              </div>
              </div>
              <Profile />
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
