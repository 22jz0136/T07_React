import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Profile from '../../components/Profile/Profile';
import tvImage from '../../img/tv-image.png'; 
import './UserItemList.css';

function UserItemList({ userId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockItems = [
    {
      id: 1,
      title: 'ITEM 1',
      description: 'This is a description for Item 1.',
      image: tvImage,
      location: '1号館',
      status: '受付中',
      expired: false,
    },
    {
      id: 2,
      title: 'ITEM 2',
      description: 'This is a description for Item 2.',
      image: tvImage,
      location: '8号館',
      status: '完了',
      expired: true,
    },
    {
      id: 3,
      title: 'ITEM 3',
      description: 'This is a description for Item 3.',
      image: tvImage,
      location: '12号館',
      status: '受付中',
      expired: false,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleHide = (id) => {
    alert(`Item ${id} を非表示にしました`);
  };

  const handleComplete = (id) => {
    alert(`Item ${id} の取引を完了しました`);
  };

  const handleWarn = (id) => {
    alert(`Item ${id} に警告を送りました`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />

        <div>
          <h1>出品した商品一覧</h1>
          <SearchBar />
          <Profile />

          <div>
            <ul className="item-list">
              {items.map(item => (
                <li key={item.id} className="item-card">
                  <div className="item-content">
                    <img src={item.image} alt={item.title} className="item-image" />
                    <div className="item-details">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                      <p>受け渡し場所: {item.location}</p>
                      <p>
                        ステータス: <span className={`status ${item.status === '完了' ? 'complete' : 'active'}`}>{item.status}</span>
                      </p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => handleHide(item.id)}>非表示</button>
                      {item.expired && <button onClick={() => handleComplete(item.id)}>取引完了</button>}
                      <button onClick={() => handleWarn(item.id)}>警告</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItemList;
