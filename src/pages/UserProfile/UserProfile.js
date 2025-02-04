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
  const [loading, setLoading] = useState({ user: true, items: true, requests: true, warnings: true });
  const [activeTab, setActiveTab] = useState('items');
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [filter, setFilter] = useState(0); // フィルタの状態を追加
  const [requestFilter, setRequestFilter] = useState(1); // リクエストフィルタの初期値を1（表示中）に設定


  const fetchData = async () => {
    try {
      const response = await fetch(`https://loopplus.mydns.jp/api/user/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Data', data);
      setUserData(data);
      setItems(data.Items);
      setRequests(data.Requests);
      setWarnings(data.Warnings);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(prev => ({ ...prev, user: false, items: false, requests: false, warnings: false }));
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

  const filteredRequests = requests.filter(request => {
    return requestFilter === 0 ? request.DisplayFlag === 0 : request.DisplayFlag === 1; // ステータスに基づいてフィルタリング
  });

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilter(selectedValue === 'all' ? null : parseInt(selectedValue)); // "all"を選択した場合はnullに設定
  };

  const handleRequestFilterChange = (event) => {
    setRequestFilter(parseInt(event.target.value)); // 選択された値を状態にセット
  };

  const handleProductClick = (item) => {
    navigate(`/admin/product/${item.ItemID}`, { state: { itemId: item.ItemID } }); // itemIdをstateに渡す
  };

  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`https://loopplus.mydns.jp/api/request/${id}`, {
        method: 'PUT', // PUTメソッドを使用
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ DisplayFlag: 0 }), // DisplayFlagを0に設定
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // エラーメッセージを取得
        throw new Error(`Failed to delete request: ${errorMessage}`);
      }

      // リクエストをローカル状態から削除
      setRequests(prevRequests => prevRequests.filter(request => request.RequestID !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleReShowRequest = async (id) => {
    try {
      const response = await fetch(`https://loopplus.mydns.jp/api/request/${id}`, {
        method: 'PUT', // PUTメソッドを使用
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ DisplayFlag: 1 }), // DisplayFlagを1に設定
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // エラーメッセージを取得
        throw new Error(`Failed to re-show request: ${errorMessage}`);
      }

      // リクエストをローカル状態から更新
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.RequestID === id ? { ...request, DisplayFlag: 1 } : request
        )
      );
    } catch (error) {
      console.error('Error re-showing request:', error);
    }
  };



  const Item = ({ itemId, name, userIcon, title, imageSrc, description, createdAt, onClick }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon;

    const truncatedTitle = title.length > 14 
    ? title.slice(0, 14) + '…' 
    : title;
  
    const truncatedDescription = description.length > 10 
    ? description.slice(0, 10) + '…' 
    : description;

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
              <p>{truncatedTitle}</p>
            </div>
            <p>{truncatedDescription}</p>
          </div>
        </div>
      </div>
    );
  };

  const RequestItem = ({ id, name, userIcon, time, content, imageSrc, displayFlag, onDelete, onReShow }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon;

    return (
      <div >
        <div className="request-item">
        <div className="profile">
          <img src={iconSrc || 'default-icon-url'} alt="User Icon" className="request-user-icon" />
          <span className="name">{name}</span>
          <span className="time">{new Date(time).toLocaleString()}</span>
        </div>
        <div className="content">
          <div className='title-button-div'>
            <p>{content}</p>
            {displayFlag === 1 && <button onClick={onDelete} className="delete-button">削除</button>}
            {displayFlag === 0 && <button onClick={onReShow} className="re-show-button">再表示</button>}
          </div>
          {imageSrc && <img src={imageSrc} alt="Request" className="request-image" />}
          <div className='title-button-div'>
          </div>
        </div>
      </div>
      </div>
      
    );
  };

  const Warning = ({ id, content, time }) => {

    return (
      <div >
        <div className="request-item">
          <div className="profile">
            <span className="time">日時：{new Date(time).toLocaleString()}</span>
          </div>
          <div className="content">
              <p className='warn-p'>内容</p>
              <p>{content}</p>
          </div>
        </div>
      </div>
      
    );
  };
  
  const filteredUserItems = items.filter(item => {
    const matchesTradeFlag = filter == null ? true : item.TradeFlag == filter; 
    // const isMyItem = item.UserID == userData.UserID;
    // const isNotMyItem = item.UserID !== userData.UserID; 
  
    // const matchesUserFilter =
    //   (showMyItems && isMyItem) || 
    //   (showOthersItems && isNotMyItem );
  
    // return matchesTradeFlag && matchesUserFilte
    return matchesTradeFlag ; 
  });
  
  

  return (
    <div>
      <div className="navbar">
          <Navbar />
      </div>
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          {/* <h1>ユーザー情報</h1> */}
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
              {['items', 'requests', 'warnings'].map(tab => ( // 'warnings' タブを追加
                <li
                  key={tab}
                  className='Profilerow'
                  onClick={() => setActiveTab(tab)}
                  style={{ fontWeight: activeTab === tab ? 'bold' : 'normal' }}
                >
                  {tab === 'items' ? '物品情報' : tab === 'requests' ? 'リクエスト' : '警告'}
                </li>
              ))}
            </ul>
          </div>


          {activeTab === 'items' && (
            <div className='filter-flex'>
              <div className="filter-dropdown">
                  <div className="filter-select-flex">
                    {/* <label htmlFor="filter-select">商品状態 :</label> */}
                    <select className="filter-select" onChange={handleFilterChange} value={filter}>
                      <option value="0">出品中</option>
                      <option value="1">取引中</option>
                      <option value="2">取引完了</option>
                      <option value="3">削除済</option>
                    </select>
                  </div>

              </div>
              <div className="admin-products-list">
              {loading.items ? (
                <p>Loading items...</p>
              ) : filteredUserItems.length > 0 ? (
                filteredUserItems.map(item => (
                  <Item
                    key={item.ItemID}
                    name={userData.Username}
                    userIcon={userData.Icon}
                    createdAt={item.CreatedAt}
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
            </div>
          )}

          {activeTab === 'requests' && (
            <div className='overflow-request'>
              <div className="filter-dropdown">
                <label htmlFor="request-filter-select">ステータス :</label>
                <select id="request-filter-select" onChange={handleRequestFilterChange} value={requestFilter}>
                  <option value="1">表示中</option>
                  <option value="0">削除済</option>
                </select>
              </div>
              {loading.requests ? (
                <p>Loading requests...</p>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <RequestItem
                    key={request.RequestID}
                    id={request.RequestID}
                    name={userData.Username}
                    userIcon={userData.Icon}
                    time={request.CreatedAt}
                    content={request.RequestContent}
                    imageSrc={request.RequestImage ? `https://loopplus.mydns.jp/${request.RequestImage}` : null}
                    onDelete={() => handleDeleteRequest(request.RequestID)} // 削除処理を渡す
                    onReShow={() => handleReShowRequest(request.RequestID)} // 再表示処理を渡す
                    displayFlag={request.DisplayFlag} // DisplayFlagを渡す
                  />
                ))
              ) : (
                <p>リクエストはありません。</p>
              )}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className='overflow-request'>
              <div className="filter-dropdown">
                <p className={warnings.length === 1 ? 'warn-yellow' : (warnings.length > 1 ? 'warn-red' : '')}>
                  警告回数：{warnings.length}
                </p>
              </div>
              {loading.warnings ? (
                <p>Loading warnings...</p>
              ) : warnings.length > 0 ? (
                warnings.map(warning => (
                  <Warning
                    key={warning.AnnounceID}
                    id={warning.AnnounceID}
                    time={warning.CreatedAt}
                    content={warning.Content}
                  />
                ))
              ) : (
                <p>この人に対する警告はありません</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

