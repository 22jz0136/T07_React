import { GoogleLogin} from 'react-google-login';

const clientId = "506551363779-1752jnu0oeua2lr415m1vdjs4gp50ltt.apps.googleusercontent.com";

function Login({ onSuccess, onFailure, error }) {
    return (
      <div id="signInButton">
        <GoogleLogin
          clientId={clientId}
          buttonText='Googleでログイン'
          onSuccess={onSuccess} // App.jsから渡された成功時のコールバック
          onFailure={onFailure} // App.jsから渡された失敗時のコールバック
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージの表示 */}
      </div>
    );
  }
  
  export default Login;