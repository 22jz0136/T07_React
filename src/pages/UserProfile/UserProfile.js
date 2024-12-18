import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './UserProfile.css';

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState({ user: true, items: true, requests: true });
  const [activeTab, setActiveTab] = useState('items');
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);

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

  // Filter items by current user's ID and TradeFlag
  const userItems = items.filter(item => item.UserID === parseInt(id) && item.TradeFlag === 0);

  const handleProductClick = (item) => {
    console.log('Product clicked:', item);
  };

  const Item = ({ itemId, name, userIcon, title, imageSrc, description, onClick }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon;

    return (
      <div className="product-item" onClick={onClick}>
        <div className="product-header">
          <img src={iconSrc || 'default-icon-url'} alt="Profile" className="profile-image" />
          <span className="username">{name}</span>
        </div>
        <div className='image-detail-flex'>
          <img src={imageSrc} alt={title} className="product-image" />
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

  const RequestItem = ({ id, name, time, content, imageSrc }) => {
    return (
      <div className="request-item">
        <div className="profile">
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
              {['items', 'requests', 'transactions'].map(tab => (
                <li
                  key={tab}
                  className='Profilerow'
                  onClick={() => setActiveTab(tab)}
                  style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}
                >
                  {tab === 'items' ? '出品した商品' : tab === 'requests' ? 'リクエスト' : '取引履歴'}
                </li>
              ))}
            </ul>
          </div>

          {activeTab === 'items' && (
            <div>
              <h1>出品一覧</h1>
              {loading.items ? (
                <p>Loading items...</p>
              ) : userItems.length > 0 ? (
                userItems.map(item => (
                  <Item
                    key={item.ItemID}
                    name={userData.Username}
                    userIcon={userData.Icon}
                    itemId={item.ItemID}
                    title={item.ItemName}
                    imageSrc={`https://loopplus.mydns.jp/${item.ItemImage}`}
                    description={item.Description}
                    onClick={() => handleProductClick(item)}
                  />
                ))
              ) : (
                <p>出品はありません。</p>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              <h1>リクエスト一覧</h1>
              {loading.requests ? (
                <p>Loading requests...</p>
              ) : requests.length > 0 ? (
                requests.map(request => (
                  <RequestItem
                    key={request.RequestID}
                    id={request.RequestID}
                    name={userData.Username}
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

          {/* 取引履歴のタブのコンテンツをここに追加できます */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
