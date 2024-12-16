import React, { useState, useEffect } from 'react';
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
  const [products, setProducts] = useState([]); // 商品リストの状態
  const [loading, setLoading] = useState(true); // ローディング状態
  const [user, setUser] = useState(null); // ユーザー情報の状態

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/user/');
        if (response.ok) {
          const data = await response.json();
          setUser(data); // ユーザー情報を設定
        } else {
          console.error('ユーザー情報の取得に失敗しました');
        }
      } catch (error) {
        console.error('エラーが発生しました', error);
      }
    };

    fetchUserData(); // ユーザー情報を取得
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/item'); // 商品の一覧を取得するAPI
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // APIから取得したデータを設定
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // ローディング完了
      }
    };

    fetchProducts();
  }, []);

  const toggleFilter = (type) => {
    setFilter((prevFilter) => (prevFilter === type ? null : type));
  };

  const filteredProducts = filter ? products.filter((product) => product.type === filter) : products;

  const handleProductClick = (product) => {
    navigate(`/product/${product.ItemID}`, { state: { itemId: product.ItemID } }); // itemIdをstateに渡す
  };

  if (loading) return <div className="loading"><img src="/Loading.gif" alt="Loading" /></div>;

  // Itemコンポーネントの定義
  const Item = ({ itemId, name, userIcon, title, imageSrc, description, onClick }) => {
    const iconSrc = userIcon && userIcon.startsWith('storage/images/')
      ? `https://loopplus.mydns.jp/${userIcon}`
      : userIcon || avatar1; // デフォルトアイコンを使用

    return (
      <div className="product-item" onClick={onClick}>
        <div className="product-header">
          <img src={iconSrc} alt="Profile" className="profile-image" />
          <span className="username">{name}</span>
        </div>
        <div className='image-detail-flex'>
          <img src={imageSrc || tvimage} alt={title} className="product-image" />
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

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
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
                filteredProducts.map((item) => (
                  <Item
                    key={item.ItemID}
                    name={item.User ? item.User.UserName : '不明'}
                    userIcon={item.User ? item.User.Icon : avatar1} // アイコンを渡す
                    itemId={item.ItemID}
                    title={item.ItemName}
                    imageSrc={`https://loopplus.mydns.jp/${item.ItemImage}`} // 画像のURL
                    description={item.Description}
                    onClick={() => handleProductClick(item)} // 商品クリック時の処理
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedProducts;
