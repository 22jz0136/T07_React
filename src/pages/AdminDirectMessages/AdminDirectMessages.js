import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDirectMessages.css';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const AdminDirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // チャット情報を取得
        const response = await fetch('https://loopplus.mydns.jp/api/chat');
        if (!response.ok) throw new Error('Network response was not ok');
        const Chatsdata = await response.json();
        setChats(Chatsdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 検索機能
  const filteredChats = chats.filter(chat => {
    const user1Match = chat.user1.Username.toLowerCase().includes(searchQuery.toLowerCase());
    const user2Match = chat.user2.Username.toLowerCase().includes(searchQuery.toLowerCase());
    return user1Match || user2Match;
  });

  // 行クリック時の処理
  const handleRowClick = (chat) => {
    // セッションストレージに保存
    sessionStorage.setItem('chatID', chat.ChatID);
    sessionStorage.setItem('userID1', chat.user1.UserID); // ユーザーID1を追加
    sessionStorage.setItem('userID2', chat.user2.UserID); // ユーザーID2を追加
    sessionStorage.setItem('userName1', chat.user1.Username); // ユーザーID1を追加
    sessionStorage.setItem('userName2', chat.user2.Username); // ユーザーID2を追加
    sessionStorage.setItem('userIcon1', chat.user1.Icon); // ユーザーID1を追加
    sessionStorage.setItem('userIcon2', chat.user2.Icon); // ユーザーID2を追加

    // AdminDMDetailへ遷移
    navigate('/admin/AdminDMDetail');
  };

  return (
    <div>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='admin-dm-box'>
        <Sidebar />
        <div className='admin-dm-list'>
          {/* 検索機能 */}
          <div className="search-container">
            <div className="admin-search-move-right">
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
            <div className="table-scroll-container">
              <table className="fixed-tbody">
                <thead>
                  <tr>
                    <th className="fixed-th">チャットID</th>
                    <th className="fixed-th">ユーザー1</th>
                    <th className="fixed-th">メールアドレス1</th>
                    <th className="fixed-th">ユーザー2</th>
                    <th className="fixed-th">メールアドレス2</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChats.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>
                        検索結果はありません。
                      </td>
                    </tr>
                  ) : (
                    filteredChats.map((chat, index) => (
                      <tr
                        key={chat.ChatID}
                        className={index % 2 === 0 ? 'even-row' : ''}
                        onClick={() => handleRowClick(chat)} // 行クリック時の処理
                      >
                        <td>{chat.ChatID}</td>
                        <td>{chat.user1.Username}</td>
                        <td>{chat.user1.Email}</td>
                        <td>{chat.user2.Username}</td>
                        <td>{chat.user2.Email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default AdminDirectMessages;
