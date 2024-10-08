import React from 'react';
import '../css/top2.css';
import searchIcon from '../img/search.png';
import bellIcon from '../img/bell-icon.png';
import homeIcon from '../img/home-icon.png';
import searchFooterIcon from '../img/search-icon.png';
import uploadIcon from '../img/upload-icon.png';
import messageIcon from '../img/message-icon.png';
import myPageIcon from '../img/mypage-icon.png';
import avatar1 from '../img/avatar1.png';
import tvImage from '../img/tv-image.png';


function Header() {
    return (
      <header>
        <div className="top-bar">
          <div className="search-container">
            <input type="text" className="search-box" placeholder="欲しいものを探す" />
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
          </div>
          <img src={bellIcon} alt="Notifications" className="icon bell-icon" />
        </div>
      </header>
    );
  }

function TabBar() {
  return (
    <div className="tab-bar">
      <button className="tab">出品物一覧</button>
      <button className="tab active">リクエスト</button>
    </div>
  );
}

function RequestItem({ avatar, name, time, description, imageSrc }) {
  return (
    <div className="request-item">
      <div className="profile">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="profile-info">
          <span className="name">{name}</span>
          <span className="time">{time}</span>
        </div>
      </div>
      <div className="content">
        <p>{description}</p>
        {imageSrc && <img src={imageSrc} alt="Request" className="request-image" />}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img src={homeIcon} alt="Home" className="footer-icon" />
      <img src={searchFooterIcon} alt="Search" className="footer-icon" />
      <img src={uploadIcon} alt="Upload" className="footer-icon" />
      <img src={messageIcon} alt="Message" className="footer-icon" />
      <img src={myPageIcon} alt="My Page" className="footer-icon" />
    </footer>
  );
}

function RequestList() {
  return (
    <div className="request-list">
      <RequestItem
        avatar={avatar1}
        name="電子太郎"
        time="12時間前"
        description="最新の4K対応で、55インチのスマートテレビが欲しいなあ。高画質で映画とかゲームを楽しみたいし、音質もいいモデルがいいなあ。あと、AIアシスタントが搭載されてたら嬉しい！"
      />
      <RequestItem
        avatar={avatar1}
        name="日本電子"
        time="3秒前"
        description="お前が欲しい"
        imageSrc={tvImage}
      />
      <RequestItem
        avatar={avatar1}
        name="電子太郎"
        time="1日前"
        description="最新の4K対応で、55インチのスマートテレビが欲しいなあ。高画質で映画とかゲームを楽しみたいし、音質もいいモデルがいいなあ。あと、AIアシスタントが搭載されてたら嬉しい！"
      />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <TabBar />
      <RequestList />
      <Footer />
    </div>
  );
}

export default App;
