import React from 'react';
import { SidebarData } from './SidebarData';
import { Link, useNavigate } from 'react-router-dom';
import "./Sidebar.css";

function Sidebar({ userImage, userName }) {
  const navigate = useNavigate(); 

  // ログアウト処理をSidebar.js内で行う
  const handleLogout = () => {
    // 確認ポップアップを表示
    const confirmLogout = window.confirm("ログアウトしてもよろしいですか？");

    if (confirmLogout) {
      try {
        fetch('https://loopplus.mydns.jp/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                sessionStorage.clear(); // Clear all session storage
                window.location.href = "https://loopplus.mydns.jp/login";
            } else {
                const errorData = response.json();
                console.error("ログアウトエラー:", errorData.message);
                alert("ログアウトに失敗しました。再試行してください。");
            }
        })
        .catch(error => console.error('エラー:', error));
      } catch (error) {
        alert("ネットワークエラーが発生しました。再試行してください。");
      }
    }
  };

  return (
    <div className='Sidebar'>
        <ul className='SidebarList'>
            {SidebarData.map((value, key) => {
                if (value.title === "ログアウト") {
                    // ログアウト項目の処理
                    return (
                        <li key={key} className='row' style={{ cursor: 'pointer' }} onClick={handleLogout}>
                            <div id='icon'>{value.icon}</div>
                            <div id='title'>{value.title}</div>
                        </li>
                    );
                }

                return (
                    <li key={key} id={window.location.pathname === value.link ? "active" : ""} className='row'>
                        <Link to={value.link} className='row'>
                            <div id='icon'>{value.icon}</div>
                            <div id='title'>{value.title}</div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  );
}

export default Sidebar;
