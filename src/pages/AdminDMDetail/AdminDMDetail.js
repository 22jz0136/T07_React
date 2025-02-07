import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pusher from 'pusher-js';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AdminDMDetail.css';
import Navbar from '../../components/Navbar/Navbar';

const DirectMessage = ({ setIsFooterVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatID = sessionStorage.getItem('chatID'); // セッションストレージからチャットIDを取得
  const userID1 = sessionStorage.getItem('userID1'); // ユーザーID1を取得
  const userID2 = sessionStorage.getItem('userID2'); // ユーザーID2を取得
  const username1 = sessionStorage.getItem('userName1'); // ユーザーname1を取得
  const username2 = sessionStorage.getItem('userName2'); // ユーザーname2を取得
  const userIcon1 = sessionStorage.getItem('userIcon1'); // ユーザーname1を取得
  const userIcon2 = sessionStorage.getItem('userIcon2'); // ユーザーname2を取得
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetch(`https://loopplus.mydns.jp/api/chat/room/${chatID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();

    // Pusherの設定
    const pusher = new Pusher('f155afe9e8a09487d9ea', {
      cluster: 'ap3',
    });

    const channel = pusher.subscribe(`chat-room-${chatID}`);
    channel.bind('message-sent', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatID]);

  // 自動スクロール
  useEffect(() => {
    const dmMessagesContainer = document.querySelector('.dm-messages');
    if (dmMessagesContainer) {
      dmMessagesContainer.scrollTop = dmMessagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
        <div className='navbar'>
            <Navbar />
        </div>
        <div className='admin-dm-box'>
            <Sidebar />
            <div className='admin-dm-scroll'>
              <div className="admin-dm-container">
                  <div className="dm-messages">
                      {messages.map((msg) => {
                      const messageDate = new Date(msg.CreatedAt);
                      const formattedTime = messageDate.toLocaleTimeString('ja-JP', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                      });

                      return (
                          <div key={msg.ChatContentID} className={`message-wrapper ${msg.UserID == userID1 ? 'right' : 'left'}`}>
                          <div className="message-bubble">
                              <p className="message-text">{msg.Content}</p>
                              {msg.Image && (
                              <img
                                  src={`https://loopplus.mydns.jp/${msg.Image}`}
                                  alt="メッセージ画像"
                                  className="message-image"
                              />
                              )}
                          </div>
                          <div className="span-time">
                              <span className="message-time">{formattedTime}</span>
                          </div>
                          </div>
                      );
                      })}
                      <div ref={messageEndRef} />
                  </div>
              </div>
            </div>
            

            <div className='user-inf'>
                <div>
                    {userID1} : {username1}<br />
                    <img src={`https://loopplus.mydns.jp/${userIcon1}`}></img>
                </div>

                <div>
                    {userID2} : {username2}<br />
                    <img src={`https://loopplus.mydns.jp/${userIcon2}`}></img>
                </div>
            </div>
        </div>
    </div>

  );
};

export default DirectMessage;