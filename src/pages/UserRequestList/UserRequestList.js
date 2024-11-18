import React from 'react';
import './UserRequestList.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Profile from '../../components/Profile/Profile';

function UserRequestList() {
  const requests = [ // 仮のデータを追加
    {
      id: 1,
      title: '商品A',
      description: '商品Aの説明',
      location: '東京',
      status: '完了',
      image: 'https://via.placeholder.com/100', // プレースホルダー画像
      expired: false,
    },
    {
      id: 2,
      title: '商品B',
      description: '商品Bの説明',
      location: '大阪',
      status: '進行中',
      image: 'https://via.placeholder.com/100',
      expired: true,
    },
    {
      id: 3,
      title: '商品C',
      description: '商品Cの説明',
      location: '福岡',
      status: '完了',
      image: 'https://via.placeholder.com/100',
      expired: false,
    },
  ];

  return (
    <div>
      <Navbar/>
      <div className='columnBrake'>
          <Sidebar/>
          <div className='mainbody'>
            <h1>リクエスト一覧</h1>
            <SearchBar/>
            <Profile/>
            <div>
              <ul className="item-list">
                {requests.length > 0 ? (
                  requests.map(request => (
                    <li key={request.id} className="item-card">
                      <div className="item-content">
                        <img src={request.image} alt={request.title} className="item-image" />
                        <div className="item-details">
                          <h3 className="item-title">{request.title}</h3>
                          <p className="item-description">{request.description}</p>
                          <p>受け渡し場所: {request.location}</p>
                          <p>ステータス: <span className={`status ${request.status === '完了' ? 'complete' : 'active'}`}>{request.status}</span></p>
                        </div>
                      </div>
                      <div className="item-actions">
                        <button className="action-button" onClick={() => alert(`Request ${request.id} を非表示にしました`)}>非表示</button>
                        {request.expired && <button className="action-button" onClick={() => alert(`Request ${request.id} の取引を完了しました`)}>取引完了</button>}
                        <button className="action-button" onClick={() => alert(`Request ${request.id} に警告を送りました`)}>警告</button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>リクエストはありません。</p>
                )}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
}

export default UserRequestList;
