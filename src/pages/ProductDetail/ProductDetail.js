// ProductDetail.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return <p>商品情報が見つかりません。</p>;
  }

  // 非表示ボタンのハンドラ
  const handleHideProduct = () => {
    console.log('非表示ボタンがクリックされました。');
    alert('商品を非表示にしました');
  };

  // 取引完了ボタンのハンドラ
  const handleCompleteTransaction = () => {
    console.log('取引完了ボタンがクリックされました。');
    alert('取引が完了しました');
  };

  // 警告するボタンのハンドラ
  const handleWarnUser = () => {
    console.log('警告するボタンがクリックされました。');
    navigate(`/product-warning/${product.id}`, { 
      state: { 
        productId: product.id, 
        username: product.username,  
        productName: product.name, 
        productDetails: product.details, 
        productLocation: product.location, 
        productImage: product.image, 
        profileImage: product.profileImage,
        status: product.status,
        date: product.date
        } 
    });
  };

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <div className='productmanager'>
            <SearchBar />
            <div key={product.id} className="productitem">
              <div className="product-header">
                <img src={product.profileImage} alt="Profile" className="profile-image" />
                <span className="username">{product.username}</span>
                <span className="date">{new Date(product.date).toLocaleString('ja-JP', 
                  { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span><br />
              </div>

              <div className='imagedetail-flex'>
                <img src={product.image} alt={product.details} className="productimage" />
                <div className="productdetails">
                  <div className='product-details-title'>
                    <p>{product.details}</p>
                  </div>
                  <p>希望取引方法:{product.status}</p>
                  <div className='poduct-location'>
                    <p>受け渡し場所: <span className="location-text">{product.location}</span></p>
                  </div>
                </div>

                <div className='product-actions'>
                  <button onClick={handleHideProduct}>非表示</button>
                  <button onClick={handleCompleteTransaction}>取引完了</button>
                  <button onClick={handleWarnUser}>警告する</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
