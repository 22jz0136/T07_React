import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import SidebarIcon from '../../components/Sidebar/SidebarIcon';
import './UserWarning.css';

const UserWarning = () => {
  const { userId } = useParams(); // URLパラメータからuserIdを取得
  const [user, setUser] = useState(null);
  const [warningContent, setWarningContent] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      // 偽データとしてユーザー情報を設定（実際のAPI呼び出しに置き換え）
      const userData = {
        id: userId,
        name: userId === '12345' ? '山田 太郎' : '鈴木 花子',
        email: userId === '12345' ? 'taro.yamada@example.com' : 'hanako.suzuki@example.com',
      };
      setUser(userData);
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`警告を送信しました: ユーザー「${user.name}」への警告内容: ${warningContent}`);
    setWarningContent('');
  };

  return (
    <div>
      <Navbar />
      <div className="userWarningContainer">
        <Sidebar />
        <div className="userWarningContent">
          <h1>ユーザ警告画面</h1>
          <SearchBar />
          {/* =============================================== */}
          <div className='userWarningBody'>
            {user && (
            <div className="userInfo">
              <p>ユーザー名: {user.name}</p>
              <p>メールアドレス: {user.email}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='userWarningForm'>
                <label>警告内容</label>
                <textarea
                value={warningContent}
                onChange={(e) => setWarningContent(e.target.value)}
                placeholder="警告内容を入力してください"
                required
                /><br/>
            </div>
            
            <button type="submit">警告する</button>
          </form>
          </div>
           {/* ========================================= */}
        </div>
      </div>
    </div>
  );
};

export default UserWarning;
