import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './UserProfile.css';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState({ user: true, items: true, requests: true });
  const [activeTab, setActiveTab] = useState('items');
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState(0); // フィルタの状態を追加

  const fetchData = async () => {
    try {
      const response = await fetch(`https://loopplus.mydns.jp/user/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserData(data);
      setItems(data.Items);
      setRequests(data.Requests);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(prev => ({ ...prev, user: false, items: false, requests: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // フィルタリングロジック
  const userItems = items.filter(item => {
    if (filter === null) return true; // フィルタが設定されていない場合はすべて表示
    return item.TradeFlag === filter; // TradeFlagでフィルタリング
  });

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue === 'all' ? null : parseInt(selectedValue)); // "all"を選択した場合はnullに設定
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.ItemID}`, { state: { itemId: item.ItemID } }); // itemIdをstateに渡す
  };

  const Item = ({ itemId, name, userIcon, title, imageSrc, description, createdAt, onClick }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon;

    return (
      <div className="product-item" onClick={onClick}>
        <div className="product-header">
          <img src={iconSrc || 'default-icon-url'} alt="Profile" className="profile-image" />
          <span className="username">{name}</span>
          <span className="created-at">
              {new Date(createdAt).toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
        </div>
        <div className='image-detail-flex'>
          <img src={imageSrc || 'default-image-url'} alt={title} className="product-image" />
          <div className="product-details">
            <div className='product-details-title'>
              <p>{title}</p>
            </div>
            <p>{description}</p>
            </div>
        </div>
      </div>
    );
  };


  const RequestItem = ({ id, name, userIcon, time, content, imageSrc }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon;

    return (
      <div className="request-item">
        <div className="profile">
          <img src={iconSrc || 'default-icon-url'} alt="User Icon" className="request-user-icon" />
          <span className="name">{name}</span>
          <span className="time">{new Date(time).toLocaleString()}</span>
        </div>
        <div className="content">
          <p>{content}</p>
          {imageSrc && <img src={imageSrc} alt="Request" className="request-image" />}
        </div>
      </div>
    );
  };


  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <h1>ユーザー情報</h1>
          {loading.user ? (
            <p>Loading user data...</p>
          ) : userData ? (
            <div className='user-div'>
              {userData.Icon ? (
                <img
                  src={`https://loopplus.mydns.jp/${userData.Icon}`}
                  alt="User Icon"
                  className="avatar-icon"
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
              ) : (
                <AccountCircleIcon style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              )}
              <div className='user-div2'>
                <h2>{userData.Username}</h2>
                <p>{userData.Email}</p>
                <p>{userData.Comment}</p>
              </div>
            </div>
          ) : (
            <p>User data not found.</p>
          )}

          <div className='Profile'>
            <ul className='ProfileList'>
              {['items', 'requests'].map(tab => (
                <li
                  key={tab}
                  className='Profilerow'
                  onClick={() => setActiveTab(tab)}
                  style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}
                >
                  {tab === 'items' ? '物品情報' : 'リクエスト'}
                </li>
              ))}
            </ul>
          </div>

          {activeTab === 'items' && (
            <div>
              <div className="filter-dropdown">
                <label htmlFor="filter-select">ステータス :</label>
                <select id="filter-select" onChange={handleFilterChange} value={filter}>
                  <option value="0">出品中</option>
                  <option value="1">取引中</option>
                  <option value="2">取引完了</option>
                  <option value="3">削除済</option>
                </select>
              </div>
              {loading.items ? (
                <p>Loading items...</p>
              ) : userItems.length > 0 ? (
                userItems.map(item => (
                  <Item
                    key={item.ItemID}
                    name={userData.Username}
                    userIcon={userData.Icon}
                    createdAt={item.CreatedAt} // CreatedAtを渡す
                    itemId={item.ItemID}
                    title={item.ItemName}
                    imageSrc={`https://loopplus.mydns.jp/${item.ItemImage}`}
                    description={item.Description}
                    onClick={() => handleProductClick(item)} // 物品クリック時の処理
                  />
                ))
              ) : (
                filter === 0 ? <p>出品中の物品はありません。</p> :
                  filter === 1 ? <p>取引中の物品はありません。</p> :
                    filter === 2 ? <p>取引完了の物品はありません。</p> :
                      filter === 3 ? <p>削除した物品はありません。</p> :
                        <p>出品はありません。</p>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              {loading.requests ? (
                <p>Loading requests...</p>
              ) : requests.length > 0 ? (
                requests.map(request => (
                  <RequestItem
                    key={request.RequestID}
                    id={request.RequestID}
                    name={userData.Username}
                    userIcon={userData.Icon}
                    time={request.CreatedAt}
                    content={request.RequestContent}
                    imageSrc={request.RequestImage ? `https://loopplus.mydns.jp/${request.RequestImage}` : null}
                  />
                ))
              ) : (
                <p>リクエストはありません。</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
