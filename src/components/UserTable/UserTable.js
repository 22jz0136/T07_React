import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import './UserTable.css';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ナビゲート用のフック

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        { id: 12345, name: "山田 太郎", email: "taro.yamada@example.com", login_at: "2024-10-16 10:00:00" },
        { id: 67890, name: "鈴木 花子", email: "hanako.suzuki@example.com", login_at: "2024-10-15 09:30:00" },
      ];
      setUsers(fakeData);
    };
    fetchData();
  }, []);

  const sendWarning = (e, userId) => {
    e.stopPropagation(); // クリックイベントの伝播を防止
    navigate(`/user-warning/${userId}`); // 警告ページにユーザーIDを渡して遷移
  };

  const banUser = (e, userId) => {
    e.stopPropagation(); // クリックイベントの伝播を防止
    alert('ユーザーがBanされました。');
  };

  const handleRowClick = (userId) => {
    // ユーザーのプロフィールページに遷移し、ユーザーIDを渡す
    navigate(`/user-profile/${userId}`);
  };

  return (
    <div>
      <h1>ユーザー一覧</h1> 
      <table>
        <thead>
          <tr>
            <th>ユーザーID</th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>ログイン日時</th>
            <th>警告</th>
            <th>BAN</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>データがありません</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id} onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.login_at}</td>
                <td>
                  <button onClick={(e) => sendWarning(e, user.id)}>
                    <WarningIcon />
                  </button>
                </td>
                <td>
                  <button onClick={(e) => banUser(e, user.id)}>
                    <NotInterestedIcon />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
