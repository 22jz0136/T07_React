import './App.css';
import Login from "./components/login"; 
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Logout from "./components/logout"; 
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import TopAdmin from './pages/topAdmin';
import TopUser from './pages/top';
import TopUser2 from './pages/top2';
import ItemListing from './pages/ItemListing';



const clientId = "506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com";

function App() {

  // ログイン状態を管理するステート
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // エラーメッセージを管理するステート
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

  // const navigate = useNavigate(); // navigate 関数を取得

  // Googleログイン成功時の処理
  const responseGoogle = (response, navigate) => { 
    console.log("ログインできた！");
    setIsLoggedIn(true); // ログイン状態を更新
    setUser(response.profileObj); // Googleプロフィール情報を保存
    setUserName(response.profileObj.name);
    setUserImage(response.profileObj.imageUrl);
    setError(''); // エラーメッセージをクリア
    // navigate('/topadmin'); // ログイン成功後にtopadminに移動
  };

  // Googleログイン失敗時の処理
  const onFailure = (response) => {
    console.error(response);// エラーをコンソールに表示
    setError('Google login failed');// エラーメッセージを設定
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsLoggedIn(false); // ログアウト状態にする
    setError(''); // エラーメッセージをクリア
    console.log('ログアウト成功');
    setUserName('');
    setUserImage('');
  };


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }

    gapi.load('client:auth2', start);
  }, []); // 依存配列を追加
  
  return (
    
      <div className="App">
        {isLoggedIn ? (
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<TopAdmin userName={userName} userImage={userImage} />} />
                <Route path="/topadmin" element={<TopAdmin userName={userName} userImage={userImage} />} /> 
                <Route path="/top" element={<TopUser userName={userName} userImage={userImage} />} />
                <Route path="/top2" element={<TopUser2 userName={userName} userImage={userImage} />} />
                <Route path="/usermanagement" element={<UserManagement userName={userName} userImage={userImage} />} />
                <Route path="/itemmanagement" element={<ItemManagement userName={userName} userImage={userImage} />} />
                <Route path="/qamanagement" element={<QAManagement userName={userName} userImage={userImage} />} />
                <Route path="/sidebar" element={<Sidebar userName={userName} userImage={userImage} />} />
              </Routes>
            </Router>
            <Logout onLogout={handleLogout}/>
            
          </div>
        ) : (
          <div className='container'>
            <h1>ログイン</h1>
            <Login 
              onSuccess={responseGoogle} // コールバックを渡す
              onFailure={onFailure} // コールバックを渡す
              error={error} // エラーメッセージを渡す
            />
          </div>
        )}
      </div>
    
  );
}
export default App;
