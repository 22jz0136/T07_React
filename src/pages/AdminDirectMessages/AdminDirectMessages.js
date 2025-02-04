import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDirectMessages.css';
import SearchIcon from '@mui/icons-material/Search';

const AdminDirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});
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

        // ユーザー情報をオブジェクトとして保存
        const usersMap = {};
        usersData.forEach(user => {
          usersMap[user.UserID] = user; // UserIDをキーとしてユーザー情報を保存
        });
        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* 検索機能 */}
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
              <th className="fixed-th">ユーザー1</th>
              <th className="fixed-th">メールアドレス1</th>
              <th className="fixed-th">ユーザー2</th>
              <th className="fixed-th">メールアドレス2</th>
            </tr>
          </thead>
          <tbody>
            {chats.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>
                  検索結果はありません。
                </td>
              </tr>
            ) : (
              chats.map((chat, index) => (
                <tr key={chat.ChatID} className={index % 2 === 0 ? 'even-row' : ''}>
                  <td>{chat.ChatID}</td>
                  <td>{[chat.user1]?.Username || '不明'}</td>
                  <td>{[chat.user1]?.Email || '不明'}</td>
                  <td>{[chat.user2]?.Username || '不明'}</td>
                  <td>{[chat.user2]?.Email || '不明'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDirectMessages;
