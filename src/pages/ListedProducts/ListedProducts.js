// ListedProducts.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './ListedProducts.css';
import tvimage from '../../img/tv-image.png';
import avatar1 from '../../img/avatar1.png';

const ListedProducts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(null);

  const toggleFilter = (type) => {
    setFilter((prevFilter) => (prevFilter === type ? null : type));
  };

  const products = [
    {
      id: 1,
      username: '山田 太郎',
      profileImage: avatar1,
      date: '2024-10-25T12:00:00',
      image: tvimage,
      details: '特別な本',
      status: '譲渡',
      location: '1号館',
      type: 'ongoing',
    },
    {
      id: 2,
      username: '鈴木 花子',
      profileImage: avatar1,
      date: '2024-10-22T14:30:00',
      image: tvimage,
      details: 'ハンドメイドのアクセサリー',
      status: 'レンタル',
      location: '7号館',
      type: 'completed',
    },
    {
      id: 3,
      username: '田中 一郎',
      profileImage: avatar1,
      date: '2024-10-20T10:00:00',
      image: tvimage,
      details: 'ゲーム機',
      status: '交換',
      location: '8号館',
      type: 'hidden',
    },
    {
      id: 4,
      username: '佐藤 美紀',
      profileImage: avatar1,
      date: '2024-10-18T16:45:00',
      image: tvimage,
      details: 'スポーツ用品',
      status: '譲渡',
      location: '12号館',
      type: 'warning',
    },
    {
      id: 5,
      username: '佐々木 健',
      profileImage: avatar1,
      date: '2024-10-15T09:15:00',
      image: tvimage,
      details: '電子書籍',
      status: 'レンタル',
      location: '1号館',
      type: 'ongoing',
    },
  ];

  const filteredProducts = filter ? products.filter((product) => product.type === filter) : products;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: product }); // 商品情報もstateに渡す
  };

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='product-manager'>
          <h1>出品した商品一覧</h1>
          <SearchBar />
          <div className="filter-buttons">
            <button onClick={() => toggleFilter('ongoing')}>取引中</button>
            <button onClick={() => toggleFilter('completed')}>取引完了</button>
            <button onClick={() => toggleFilter('hidden')}>非表示</button>
            <button onClick={() => toggleFilter('warning')}>警告済商品</button>
          </div>
          <div className="products-list">
            {filteredProducts.length === 0 ? (
              <p>表示する商品がありません。</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
                  <div className="product-header">
                    <img src={product.profileImage} alt="Profile" className="profile-image" />
                    <span className="username">{product.username}</span>
                    <span className="date">{new Date(product.date).toLocaleString('ja-JP', 
                    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span><br />
                  </div>

                  <div className='image-detail-flex'>
                    <img src={product.image} alt={product.details} className="product-image" />
                    <div className="product-details">
                      <div className='product-details-title'>
                        <p >{product.details}</p>
                      </div>
                      
                      <p>{product.status}</p>
                      <p>受け渡し場所: {product.location}</p>
                    </div>
                  </div>　
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedProducts;
