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

            if (data.status == 'success') {
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

  

  return (
    <div>
      
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
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>読み込み中です。しばらくお待ちください。</td>
            </tr>
          ) : (
            users.map(user => (
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
