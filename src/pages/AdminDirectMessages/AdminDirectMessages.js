import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDirectMessages.css';
import SearchIcon from '@mui/icons-material/Search';

const AdminDirectMessages = () => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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
              <th className="fixed-th">ユーザー</th>
              <th className="fixed-th">メールアドレス</th>
            </tr>
          </thead>
          <tbody>
            {chats.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'red' }}>
                  検索結果はありません。
                </td>
              </tr>
            ) : (
              chats.map((chat, index) => (
                <tr key={chat.ChatID} className={index % 2 === 0 ? 'even-row' : ''}>
                  <td>{chat.ChatID}</td>
                  <td>
                    {/* ユーザー名を表示するロジックを追加 */}
                    {/* ここでUserIDやUserID2からユーザー名を取得する必要があります */}
                    {`UserID: ${chat.UserID}, UserID2: ${chat.UserID2}`} {/* 仮の表示 */}
                  </td>
                  <td>{chat.Email}</td>
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
