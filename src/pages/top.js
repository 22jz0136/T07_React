import React from 'react';
import '../css/top.css';
import searchIcon from './src/img/search.png';
import bellIcon from './src/img/bell-icon.png';
import homeIcon from './src/img/home-icon.png';
import searchFooterIcon from './src/img/search-icon.png';
import uploadIcon from './src/img/upload-icon.png';
import messageIcon from './src/img/message-icon.png';
import myPageIcon from './src/img/mypage-icon.png';
import avatar1 from './src/img/avatar1.png';
import tvImage from './src/img/tv-image.png';
import heartIcon from './src/img/heart.png';

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
      <button className="tab active">出品物一覧</button>
      <button className="tab">リクエスト</button>
    </div>
  );
}

function Item({ name, time, imageSrc, title, description, location }) {
  return (
    <div className="item">
      <div className="profile">
        <img src={avatar1} alt="Avatar" className="avatar" />
        <div className="profile-info">
          <span className="name">{name}</span>
          <span className="time">{time}</span>
        </div>
      </div>
      <div className="item-content">
        <img src={imageSrc} alt="Item Image" className="item-image" />
        <div className="item-info">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="action-buttons">
            <button className="button trade">譲渡</button>
          </div>
          <span className="location">{location}</span>
          <img src={heartIcon} className="heart" alt="お気に入り" />
        </div>
      </div>
    </div>
  );
}

function ItemList() {
  return (
    <div className="listing">
      <Item
        name="日本電子"
        time="3秒前"
        imageSrc={tvImage}
        title="55インチのスマートテレビ"
        description="最新の4K対応で、55インチのスマートテレビ"
        location="受け渡し場所：12号館"
      />
      <Item
        name="日本電子"
        time="3秒前"
        imageSrc={tvImage}
        title="55インチのスマートテレビ"
        description="最新の4K対応で、55インチのスマートテレビ"
        location="受け渡し場所：12号館"
      />
      <Item
        name="日本電子"
        time="3秒前"
        imageSrc={tvImage}
        title="55インチのスマートテレビ"
        description="最新の4K対応で、55インチのスマートテレビ"
        location="受け渡し場所：12号館"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <nav className="bottom-nav">
        <img src={homeIcon} alt="Home" className="footer-icon" />
        <img src={searchFooterIcon} alt="Search" className="footer-icon" />
        <img src={uploadIcon} alt="Upload" className="footer-icon" />
        <img src={messageIcon} alt="Message" className="footer-icon" />
        <img src={myPageIcon} alt="My Page" className="footer-icon" />
      </nav>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <TabBar />
      <ItemList />
      <Footer />
    </div>
  );
}

export default App;
