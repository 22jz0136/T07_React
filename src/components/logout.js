import { GoogleLogout } from 'react-google-login';

const clientId = "506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com";

// Logoutコンポーネントの定義
function Logout({ onLogout }) {
    return (
      <div id="signOutButton">
        <GoogleLogout
          clientId={clientId} // GoogleクライアントIDを指定
          buttonText={"Logout"} // ボタンのテキスト
          onLogoutSuccess={onLogout} // ログアウト成功時のコールバックを渡す
        />
      </div>
    );
  }
  
  export default Logout; 
