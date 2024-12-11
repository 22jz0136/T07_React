// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // スタイルシートのインポート
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // 商品情報の状態
  const [loading, setLoading] = useState(true); // ローディング状態
  const productId = location.state?.itemId || null; // 商品IDを取得

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        alert('商品IDが取得できません。');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/item/${productId}`); // 商品詳細を取得するAPI
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data); // APIから取得したデータを設定
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('商品情報の取得に失敗しました。');
      } finally {
        setLoading(false); // ローディング完了
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <p>ロード中...</p>; // ローディング中の表示
  }

  if (!product) {
    return <p>商品情報が見つかりません。</p>; // 商品情報がない場合の表示
  }

  // 必要なデータを取得
  const {
    UserName,
    CreatedAt,
    itemImage,
    itemName,
    itemContent,
    itemId,
  } = product;

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
    navigate(`/product-warning/${itemId}`, { 
      state: { 
        productId: itemId, 
        username: UserName,  
        productName: itemName, 
        productDetails: itemContent, 
        productImage: itemImage, 
        createdAt: CreatedAt,
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
            <div key={itemId} className="productitem">
              <div className="product-header">
                <AccountCircleIcon className="avatar-icon" style={{ fontSize: '40px', color: '#374151' }} />
                <span className="username">{UserName || 'ユーザー名が取得できません'}</span>
                <span className="date">{new Date(CreatedAt).toLocaleString('ja-JP', 
                  { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span><br />
              </div>

              <div className='imagedetail-flex'>
                <img src={itemImage} alt={itemName} className="productimage" />
                <div className="productdetails">
                  <div className='product-details-title'>
                    <h2>{itemName}</h2> {/* アイテム名 */}
                    <p>{itemContent}</p> {/* アイテムの説明 */}
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
