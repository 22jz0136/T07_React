import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import './UserTable.css';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewAdmins, setViewAdmins] = useState(false); // 管理者表示かユーザー表示かを切り替える状態
  const navigate = useNavigate(); // ナビゲート用のフック

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
    e.stopPropagation(); // クリックイベントの伝播を防止
    navigate(`/user-warning/${userId}`); // 警告ページにユーザーIDを渡して遷移
  };

  const banUser = async (e, userId) => {
    e.stopPropagation(); 

    if (window.confirm("このユーザーをBANしますか？")) {
        try {
            const response = await fetch(`https://loopplus.mydns.jp/api/user/${userId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ BanFlag: 1 }), 
            });

            if (!response.ok) {
                throw new Error(`HTTPエラー: ${response.status}`);
            }

            const data = await response.json();
            console.log('data', data.status);

            if (data.status === 'success') {
                alert('ユーザーがBANされました。');
                // ユーザーリストを再取得する場合:
                setUsers((prevUsers) => prevUsers.filter((user) => user.UserID !== userId));
            } else {
                alert(`BANに失敗しました: ${data.message}`);
            }
        } catch (error) {
            console.error('BAN中にエラーが発生しました:', error);
            alert('BAN中にエラーが発生しました。');
        }
    }
  };

  const handleRowClick = (userId) => {
    // ユーザーのプロフィールページに遷移し、ユーザーIDを渡す
    navigate(`/user-profile/${userId}`);
  };

  // 管理者だけ表示するか、ユーザーだけ表示するかでフィルタリング
  const filteredUsers = users.filter(user => viewAdmins ? user.AdminFlag === 1 : user.AdminFlag === 0);

  return (
    <div>
      <div className='user-type-selector'>
        <p>表示切り替え：</p>
        <select onChange={(e) => setViewAdmins(e.target.value === 'admins')}>
          <option value="users">ユーザー一覧を表示</option>
          <option value="admins">管理者一覧を表示</option>
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
            filteredUsers.map(user => (
              <tr key={user.UserID} onClick={() => handleRowClick(user.UserID)} style={{ cursor: 'pointer' }}>
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
