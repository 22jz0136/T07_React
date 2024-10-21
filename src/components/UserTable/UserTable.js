import React, { useEffect, useState } from 'react'; // Reactと必要なフックをインポート
// import axios from 'axios'; // APIリクエスト用にaxiosをインポート
import './UserTable.css'; // CSSファイルをインポート
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';

const UserTable = () => {
  const [users, setUsers] = useState([]); // ユーザー情報を格納する状態を定義

  useEffect(() => {
    // コンポーネントがマウントされたときに実行される副作用を定義
    const fetchData = async () => {
      try {
        // Laravel APIからユーザーデータを取得（現在はコメントアウト）
        // const response = await axios.get('http://your-laravel-api-url/api/users');
        // setUsers(response.data); // 取得したデータを状態に保存

        // 偽のデータをセット（Laravel側が終わったらこの部分を修正）
        const fakeData = [
          {
            id: 12345,
            name: "山田 太郎",
            email: "taro.yamada@example.com",
            login_at: "2024-10-16 10:00:00"
          },
          {
            id: 67890,
            name: "鈴木 花子",
            email: "hanako.suzuki@example.com",
            login_at: "2024-10-15 09:30:00"
          },
        ];
        setUsers(fakeData); // 偽のデータを状態に保存
      } catch (error) {
        console.error('Error fetching user data:', error); // エラーログを表示
      }
    };

    fetchData(); // データを取得する関数を呼び出し
  }, []); // 空の依存配列により、コンポーネントの初回レンダリング時のみ実行される

  // 警告を送信する関数
  const sendWarning = async (userId) => {
    try {
      // 指定したユーザーに警告メッセージを送信するAPIリクエストを実行（現在はコメントアウト）
      // await axios.post(`http://your-laravel-api-url/api/users/${userId}/warn`);
      alert('警告メッセージが送信されました。'); // 成功メッセージを表示（モック）
    } catch (error) {
      console.error('Error sending warning:', error); // エラーをログに記録
    }
  };

  // ユーザーをBanする関数
  const banUser = async (userId) => {
    try {
      // 指定したユーザーをBanするAPIリクエストを実行（現在はコメントアウト）
      // await axios.post(`http://your-laravel-api-url/api/users/${userId}/ban`);
      alert('ユーザーがBanされました。'); // 成功メッセージを表示（モック）
    } catch (error) {
      console.error('Error banning user:', error); // エラーをログに記録
    }
  };

  return (
    <div>
      <h1>ユーザー一覧</h1> 
      <table>
        <thead>
          <tr>
            <th>ユーザーID</th>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th>ログイン日時</th>
            <th>警告</th>
            <th>BAN</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>データがありません</td> {/* データがない場合のメッセージ */}
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>          {/* ユーザーID */}
                <td>{user.name}</td >        {/* ユーザー名 */}
                <td>{user.email}</td>        {/* メールアドレス */}
                <td>{user.login_at}</td>     {/* ログイン日時 */}
                <td>
                  {/* 警告ボタン。クリック時にsendWarning関数を呼び出す */}
                  <button onClick={() => sendWarning(user.id)}><WarningIcon/></button>
                </td>
                <td>
                  {/* Banボタン。クリック時にbanUser関数を呼び出す */}
                  <button onClick={() => banUser(user.id)}><NotInterestedIcon/></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable; // コンポーネントをエクスポート
