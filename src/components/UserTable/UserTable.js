import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTable.css';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewAdmins, setViewAdmins] = useState('all'); // 'all', 'admins', 'users'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://loopplus.mydns.jp/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  const sendWarning = (e, userId) => {
    e.stopPropagation();
    navigate(`/user-warning/${userId}`);
  };

  const banUser = async (e, userId) => {
    e.stopPropagation();
    if (window.confirm("このユーザーをBANしますか？")) {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/user/${userId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ BanFlag: 1 }),
        });
        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
        const data = await response.json();
        if (data.status === 'success') {
          alert('ユーザーがBANされました。');
          setUsers((prev) => prev.filter((user) => user.UserID !== userId));
        } else {
          alert(`BANに失敗しました: ${data.message}`);
        }
      } catch (error) {
        alert('BAN中にエラーが発生しました。');
      }
    }
  };

  const handleRowClick = (userId) => {
    navigate(`/user-profile/${userId}`);
  };

  const filteredUsers = users.filter((user) => {
    if (viewAdmins === 'admins') return user.AdminFlag === 1;
    if (viewAdmins === 'users') return user.AdminFlag === 0;
    return true; // 'all'の場合は全ユーザー
  });

  return (
    <div>
      <div className='user-type-selector'>
        <p>表示切り替え：</p>
        <select onChange={(e) => setViewAdmins(e.target.value)}>
          <option value="all">全ユーザー表示</option>
          <option value="users">ユーザー一覧表示</option>
          <option value="admins">管理者一覧表示</option>
        </select>
      </div>
      <table className='fixed-tbody'>
        <thead>
          <tr>
            <th className='fixed-th'>ユーザーID</th>
            <th className='fixed-th'>ユーザー名</th>
            <th className='fixed-th'>メールアドレス</th>
            <th className='fixed-th'>ログイン日時</th>
            <th className='fixed-th'>警告</th>
            <th className='fixed-th'>BAN</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>読み込み中です。しばらくお待ちください。</td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr
                key={user.UserID}
                onClick={() => handleRowClick(user.UserID)}
                className={index % 2 === 0 ? 'even-row' : ''}
              >
                <td>{user.UserID}</td>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>{user.login_at}</td>
                <td>
                  <button onClick={(e) => sendWarning(e, user.UserID)}>
                    <WarningIcon />
                  </button>
                </td>
                <td>
                  <button onClick={(e) => banUser(e, user.UserID)}>
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
