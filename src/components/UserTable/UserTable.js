import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTable.css';
import { Tooltip } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';
import BlockIcon from '@mui/icons-material/Block'; 
import WarningIcon from '@mui/icons-material/Warning';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewAdmins, setViewAdmins] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const navigate = useNavigate();

  const restrictedAdminIds = [11];  // 管理者変更不可


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetch starts
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/user');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchData();
  }, []);

  // 警告送信の処理
  const sendWarning = (e, userId) => {
    e.stopPropagation();
    navigate(`/admin/user-warning/${userId}`);
  };

  // BAN処理
  const banUser = async (e, userId, isBanned) => {
    e.stopPropagation();
    const confirmMessage = isBanned
      ? 'このユーザーのBANを解除しますか？'
      : 'このユーザーをBANしますか？';

    if (window.confirm(confirmMessage)) {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/user/${userId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ BanFlag: isBanned ? 0 : 1 }),
        });

        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        const data = await response.json();
        if (data.status === 'success') {
          alert(isBanned ? 'BANが解除されました。' : 'ユーザーがBANされました。');
          setUsers((prev) =>
            prev.map((user) =>
              user.UserID === userId ? { ...user, BanFlag: isBanned ? 0 : 1 } : user
            )
          );
        } else {
          alert(`処理に失敗しました: ${data.message}`);
        }
      } catch (error) {
        alert('処理中にエラーが発生しました。');
      }
    }
  };

  // ユーザー情報をクリックして詳細ページに遷移
  const handleRowClick = (userId) => {
    navigate(`/admin/user-profile/${userId}`);
  };

  // 管理者権限の変更処理
  const toggleAdminStatus = async (e, userId, currentAdminFlag) => {
    e.stopPropagation();

    // 変更禁止のユーザーかどうかをチェック
    if (restrictedAdminIds.includes(userId)) {
      alert('このユーザーには管理者変更できません。');
      return;
    }

    if (window.confirm(`このユーザーを${currentAdminFlag === 1 ? '一般ユーザー' : '管理者'}に変更しますか？`)) {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/user/${userId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ AdminFlag: currentAdminFlag === 1 ? 0 : 1 }),
        });

        if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);

        const data = await response.json();
        if (data.status === 'success') {
          alert('ユーザーの管理者状態が変更されました。');
          setUsers((prev) =>
            prev.map((user) =>
              user.UserID === userId ? { ...user, AdminFlag: currentAdminFlag === 1 ? 0 : 1 } : user
            )
          );
        } else {
          alert(`管理者変更に失敗しました: ${data.message}`);
        }
      } catch (error) {
        alert('管理者状態変更中にエラーが発生しました。');
      }
    }
  };

  const filteredUsers = users
  .filter((user) => {
    if (viewAdmins === 'admins') return user.AdminFlag === 1;
    if (viewAdmins === 'users') return user.AdminFlag === 0;
    return true;
  })
  .filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.Email.toLowerCase().includes(query) || 
      user.Username.toLowerCase().includes(query)
    );
  });

return (
  <div>
    {/* 検索機能と表示切り替え */}
    <div className="search-container">
      <div className="user-type-selector">
        <p>表示切り替え：</p>
        <select onChange={(e) => setViewAdmins(e.target.value)}>
          <option value="all">全ユーザー表示</option>
          <option value="users">ユーザー一覧表示</option>
          <option value="admins">管理者一覧表示</option>
        </select>
      </div>
      <div className="search-move-right">
        <input
          type="text"
          placeholder="ユーザー名やメールアドレスで検索できます"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <SearchIcon style={{ color: '#757575', cursor: 'pointer' }} />
      </div>
    </div>

    {/* ユーザー情報を表示するテーブル */}
    {loading ? ( // Conditional rendering based on loading state
      <div style={{ textAlign: 'center', color: 'blue' }}>
        データを取得しています、少々お待ちください...
      </div>
    ) : (
      <table className="fixed-tbody">
        <thead>
          <tr>
            <th className="fixed-th">ユーザーID</th>
            <th className="fixed-th">ユーザー名</th>
            <th className="fixed-th">メールアドレス</th>
            <th className="fixed-th">管理者変更</th>
            <th className="fixed-th">警告</th>
            <th className="fixed-th">BAN</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: 'red' }}>
                検索結果はありません。
              </td>
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
                <td>
                  <button
                    onClick={(e) => toggleAdminStatus(e, user.UserID, user.AdminFlag)}
                    disabled={restrictedAdminIds.includes(user.UserID)}
                    className={restrictedAdminIds.includes(user.UserID) ? 'disabled-btn' : ''}
                  >
                    {user.AdminFlag === 1 ? (
                      <AdminPanelSettingsIcon style={{ color: '#01ff01' }} />
                    ) : (
                      <PersonAddIcon style={{ color: 'white' }} />
                    )}
                  </button>
                </td>
                <td>
                  <button onClick={(e) => sendWarning(e, user.UserID)}>
                    <WarningIcon />
                  </button>
                </td>
                <td>
                  <button onClick={(e) => banUser(e, user.UserID, user.BanFlag)}>
                    <Tooltip title={user.BanFlag === 1 ? 'BAN解除' : 'BANする'}>
                      {user.BanFlag === 1 ? (
                        <BlockIcon style={{ color: 'red' }} />
                      ) : (
                        <GppGoodIcon style={{ color: 'white' }} />
                      )}
                    </Tooltip>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </div>
);
};

export default UserTable;