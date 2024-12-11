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
        return; // 商品IDがない場合は処理を終了
      }

      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/item/${productId}`); // 商品詳細を取得するAPI
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched product details:', data); // デバッグ用

        setProduct(data); // APIから取得したデータを設定
      } catch (error) {
        console.error('Error fetching product details:', error);
        alert('商品情報の取得に失敗しました。'); // エラーメッセージ
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
    ItemID,
    ItemName,
    Description,
    ItemImage,
    CreatedAt,
  } = product;

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <div className='productmanager'>
            <SearchBar />
            <div key={ItemID} className="productitem">
              <div className="product-header">
                <AccountCircleIcon className="avatar-icon" style={{ fontSize: '40px', color: '#374151' }} />
                <span className="username">{'ユーザー名が取得できません'}</span> {/* ユーザー名の取得が必要な場合は別途APIを呼ぶ必要があります */}
                <span className="date">{new Date(CreatedAt).toLocaleString('ja-JP', 
                  { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span><br />
              </div>

              <div className='imagedetail-flex'>
                <img src={`https://loopplus.mydns.jp/${ItemImage}`} alt={ItemName} className="productimage" /> {/* 画像のURLを修正 */}
                <div className="productdetails">
                  <div className='product-details-title'>
                    <h2>{ItemName}</h2> {/* アイテム名 */}
                    <p>{Description}</p> {/* アイテムの説明 */}
                  </div>
                </div>
              </div>

              <div className='product-actions'>
                <button onClick={() => alert('非表示にしました')}>非表示</button>
                <button onClick={() => alert('取引が完了しました')}>取引完了</button>
                <button onClick={() => alert('警告しました')}>警告する</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
