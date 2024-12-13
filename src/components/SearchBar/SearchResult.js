import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import '../../pages/ProductDetail/ProductDetail.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SearchResult() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const [user, setUser] = useState(null);  // ユーザー情報を保持する状態
  const [loading, setLoading] = useState(true);  // ローディング状態

  useEffect(() => {
    // ユーザー情報を取得するAPIリクエスト
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/user/'); 
        if (response.ok) {
          const data = await response.json();
          setUser(data); // 取得したユーザー情報を状態にセット
          setLoading(false); // ローディングを終了
        } else {
          console.error('ユーザー情報の取得に失敗しました');
          setLoading(false);
        }
      } catch (error) {
        console.error('エラーが発生しました', error);
        setLoading(false);
      }
    };

    fetchUserData(); // ユーザー情報を取得
  }, []); // 初回マウント時にのみ実行

  useEffect(() => {
    // location.state と location.state.results が存在するか確認
    if (location.state && Array.isArray(location.state.results)) {
      setResults(location.state.results);
      console.log("検索結果:", location.state.results); // デバッグ用
    } else {
      console.log("検索結果がありません");
    }
  }, [location.state]);

  if (loading) return <div className="loading"><img src="/Loading.gif" alt="Loading" /></div>;

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <div className='productmanager'>
            <SearchBar />
            <h2>検索結果画面</h2>

            <div className='productdetails-flex'>
              {results && results.length > 0 ? (
                <ul>
                  {results.map((item, index) => (
                    <li key={index}>
                      <div className="productitem">
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
                          <span className="username">
                            {user?.Username ?? 'ユーザー名が取得できません'}
                          </span>
                          <span className="date">
                            {item.UpdatedAt ? (
                              new Date(item.UpdatedAt).toLocaleString('ja-JP', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            ) : (
                              '日付情報なし'
                            )}
                          </span>
                          <br />
                        </div>

                        <div className='productdetails-flex'>
                          <div className='imagedetail-flex'>
                            <img
                              src={item.ItemImage ? `https://loopplus.mydns.jp/${item.ItemImage}` : 'default_image_url'}
                              alt={item.ItemName || 'アイテム名なし'}
                              className="productimage"
                            />
                            <div className="productdetails">
                              <div className='product-details-title'>
                                <h2>{item.ItemName || 'アイテム名なし'}</h2> {/* アイテム名 */}
                                <p>{item.Description || '説明がありません'}</p> {/* アイテムの説明 */}
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
                    </li>
                  ))}
                </ul>
              ) : (
                <p>検索結果がありません。</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
