import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDirectMessages.css';
import { Tooltip } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';
import BlockIcon from '@mui/icons-material/Block'; 
import WarningIcon from '@mui/icons-material/Warning';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

const AdminDirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [viewAdmins, setViewAdmins] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetch starts
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/showAllChats');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchData();
  }, []);

 
  

  // ユーザー情報をクリックして詳細ページに遷移
//   const handleRowClick = (userId) => {
//     navigate(`/admin/user-profile/${userId}`);
//   };

return (
  <div>
    {/* 検索機能と表示切り替え */}
    <div className="search-container">
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

    {/* チャット情報を表示するテーブル */}
    {loading ? ( 
      <div className='loading-state' style={{ textAlign: 'center', color: 'gray' }}>
        データを取得しています、少々お待ちください...
      </div>
    ) : (
      <table className="fixed-tbody">
        <thead>
          <tr>
            <th className="fixed-th">チャットID</th>
            <th className="fixed-th">ユーザー</th>
            <th className="fixed-th">メールアドレス</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{chats.ChatsID}</td>
                <td>
                    {user.Username}<br />
                    {user.Username2}
                </td>
                <td>{chats.Email}</td>
            </tr>
          {/* {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: 'red' }}>
                検索結果はありません。
              </td>
            </tr>
          ) : (
            filteredUsers.map((chats, index) => (
              <tr
                key={chats.ChatsID}
                onClick={() => handleRowClick(chats.ChatsID)}
                className={index % 2 === 0 ? 'even-row' : ''}
              >
                <td>{chats.ChatsID}</td>
                <td>
                    {user.Username}<br />
                    {user.Username2}
                </td>
                <td>{chats.Email}</td>
              </tr>
            ))
          )} */}
        </tbody>
      </table>
    )}
  </div>
);
};

export default AdminDirectMessages;