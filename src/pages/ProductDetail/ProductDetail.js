import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetail.css'; // スタイルシートのインポート
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProductDetail = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null); // 商品情報の状態
  const [user, setUser] = useState(null); // ユーザー情報の状態
  const [loading, setLoading] = useState(true); // ローディング状態

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productId = location.state?.itemId;

      if (!productId) {
        alert('商品IDが取得できません。');
        setLoading(false);
        return; // 商品IDがない場合は処理を終了
      }

      try {
        // 商品詳細を取得するAPI
        const response = await fetch(`https://loopplus.mydns.jp/api/item/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched product details:', data); // デバッグ用

        setProduct(data); // APIから取得したデータを設定

        // ユーザー情報を取得
        const userResponse = await fetch(`https://loopplus.mydns.jp/api/user/${data.UserID}`);
        if (!userResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await userResponse.json();
        console.log('Fetched user details:', userData); // デバッグ用

        setUser(userData); // ユーザー情報を設定
      } catch (error) {
        console.error('Error fetching product or user details:', error);
        alert('商品情報またはユーザー情報の取得に失敗しました。'); // エラーメッセージ
      } finally {
        setLoading(false); // ローディング完了
      }
    };

    fetchProductDetails();
  }, [location.state]);

  if (loading) return <div className="loading"><img src="/Loading.gif" alt="Loading" /></div>;

  if (!product) {
    return <p>商品情報が見つかりません。</p>; // 商品情報がない場合の表示
  }

  // 必要なデータを取得
  const {
    ItemID,
    ItemName,
    Description,
    ItemImage,
    UpdatedAt,
  } = product;

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <div className='productmanager'>
            <SearchBar />
            <div className='productitem-scroll'>
              <div key={ItemID} className="productitem">
                <div className="product-header">
                  {user?.Icon ? (
                    <img
                      src={`https://loopplus.mydns.jp/${user.Icon}`}
                      alt="User Icon"
                      className="avatar-icon"
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                  ) : (
                    <AccountCircleIcon style={{ fontSize: 40 }} />
                  )}
                  <span className="username">{user?.Username ?? 'ユーザー名が取得できません'}</span>
                  <span className="date">
                    {UpdatedAt
                      ? new Date(UpdatedAt).toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      : '日付情報なし'}
                  </span>
                  <br />
                </div>

                <div className='productdetails-flex'>
                  <div className='imagedetail-flex'>
                    <img
                      src={`https://loopplus.mydns.jp/${ItemImage}`}
                      alt={ItemName || 'アイテム名なし'}
                      className="productimage"
                    />
                    <div className="productdetails">
                      <div className='product-details-title'>
                        <h2>{ItemName || 'アイテム名なし'}</h2>
                        <p>{Description || '説明がありません'}</p>
                      </div>
                    </div>
                  </div>

                  <div className='product-actions'>
                    <button on
                      Click={() => alert('非表示にしました')}>非表示</button>
                    <button onClick={() => alert('取引が完了しました')}>取引完了</button>
                    <button onClick={() => alert('警告しました')}>警告する</button>
                  </div>
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
