import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './UserWarning.css';

const UserWarning = () => {
  const { userId } = useParams(); // URLパラメータからuserIdを取得
  const [user, setUser] = useState(null);
  const [warningContent, setWarningContent] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/user/${userId}`); // ユーザー情報を取得するAPI
        if (!response.ok) {
          throw new Error('ユーザー情報の取得に失敗しました');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
        alert('ユーザー情報の取得に失敗しました。');
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`警告を送信しました: ユーザー「${user?.Username}」への警告内容: ${warningContent}`);
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
          <div className='userWarningBody'>
            {user && (
              <div className="userInfo">
                <p>ユーザー名: {user.Username}</p>
                <p>メールアドレス: {user.Email}</p>
              </div>
            )}

            <form className='form' onSubmit={handleSubmit}>
              <div className='userWarningForm'>
                <label>警告内容</label>
                <textarea
                  value={warningContent}
                  onChange={(e) => setWarningContent(e.target.value)}
                  placeholder="警告内容を入力してください"
                  required
                /><br />
              </div>

              <button type="submit">警告する</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWarning;
