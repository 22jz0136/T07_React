import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './UserBan.css';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

const UserBan = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [warningContent, setWarningContent] = useState('');
  const navigate = useNavigate();

  // ユーザー情報を取得する
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('ユーザー情報の取得に失敗しました');
        }
        const userData = await response.json();
        
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error(error);
        alert('ユーザー情報の取得に失敗しました。');
      }
    };
    fetchUser();
  }, [userId]);

  const handleBan = async() => {
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
        console.log('ユーザーがBANされました。');
      } else {
        alert(`処理に失敗しました: ${data.message}`);
      }
    } catch (error) {
      alert('処理中にエラーが発生しました。');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!warningContent) {
      alert('処罰理由を入力してください');
      return;
    }
  
    // 確認ポップアップを表示
    const confirmSend = window.confirm('本当にBANしますか？');
    if (!confirmSend) {
      return; // ユーザーがキャンセルした場合は処理を中断
    }

    await handleBan();
  
    try {
      const response = await fetch('https://loopplus.mydns.jp/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: userId, 
          Content: `あなたはBANされました!\n理由：${warningContent}`,
          WarnFlag: 2,
        }),
      });
  
      if (!response.ok) {
        throw new Error('BANに失敗しました');
      }
      alert(`ユーザーをBANしました!`);
      setWarningContent('');
      navigate(`/admin/`);
    } catch (error) {
      console.error(error);
      alert('BANに失敗しました。');
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="userWarningContainer">
        <Sidebar />
        <div className="userWarningContent">
          <div className='userwarning-container'>
            <div className='title-warning'>
              <WarningAmberOutlinedIcon fontSize="large" style={{ marginLeft: '10px' }}/> 
              <p>ユーザーBAN</p>
            </div>
            <div>
              {user && (
                <div className="userInfo">
                  <p>ユーザー名: <strong>{user.Username}</strong></p>
                  <p>メールアドレス: <strong>{user.Email}</strong></p>
                </div>
              )}

              <form className='form-userwarning' onSubmit={handleSubmit}>
                <div className='userWarningForm'>
                  <label style={{ marginLeft: '10px' }}>BAN理由 </label>
                  <textarea
                    value={warningContent}
                    onChange={(e) => setWarningContent(e.target.value)} 
                    placeholder="処罰理由を入力してください"
                    required
                  /><br />
                  
                </div>
                
                <div className='userwarning-button'>
                  <button type="submit">BANする</button>
                </div>
              
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBan;
