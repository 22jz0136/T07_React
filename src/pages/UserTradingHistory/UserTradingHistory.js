import React from 'react';
import './UserTradingHistory.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Profile from '../../components/Profile/Profile';

// 仮のデータ
const transactions = [
  { id: 1, sender: 'あなた', message: 'こんにちは！', time: '2024-10-20 14:30' },
  { id: 2, sender: '相手', message: 'お疲れ様です。', time: '2024-10-20 14:31' },
  { id: 3, sender: 'あなた', message: '取引はどうなりましたか？', time: '2024-10-20 14:32' },
  { id: 4, sender: '相手', message: 'もう少し待ってください。', time: '2024-10-20 14:33' },
];

function UserTradingHistory() {
  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div>
          <h1>取引履歴一覧</h1>
          <SearchBar />
          <Profile />
          <div>
            <h2>取引履歴</h2>
            <ul className="message-list">
              {transactions.map(transaction => (
                <li key={transaction.id} className={`message-card ${transaction.sender === 'あなた' ? 'your-message' : 'other-message'}`}>
                  <div className="message-content">
                    <p className="message-sender">{transaction.sender}</p>
                    <p className="message-text">{transaction.message}</p>
                    <span className="message-time">{transaction.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTradingHistory;
