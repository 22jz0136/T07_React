import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pusher from 'pusher-js';
import '../css/directMessage.css';

const DirectMessage = ({ setIsFooterVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatID = sessionStorage.getItem('chatID'); // セッションストレージからチャットIDを取得
  const userID1 = sessionStorage.getItem('userID1'); // ユーザーID1を取得
  const userID2 = sessionStorage.getItem('userID2'); // ユーザーID2を取得

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
    const pusher = new Pusher('YOUR_APP_KEY', {
      cluster: 'YOUR_APP_CLUSTER',
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
    <div className="dm-container">
      <div className="top-navigation">
        <button className="back-button" onClick={() => navigate('/messages')}>
          <ArrowBackIcon className="back-icon" />
        </button>
        <h1 className="page-title">チャットの詳細</h1>
      </div>

      <div className="dm-messages">
        {messages.map((msg) => {
          const messageDate = new Date(msg.CreatedAt);
          const formattedTime = messageDate.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });

          return (
            <div key={msg.ChatContentID} className={`message-wrapper ${msg.UserID === userID1 ? 'right' : 'left'}`}>
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
  );
};

export default DirectMessage;


// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { useSwipeable } from "react-swipeable";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Add as AddIcon, Send as SendIcon } from '@mui/icons-material';
// import Pusher from 'pusher-js';
// import '../css/directMessage.css';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';


// const DirectMessage = ({ setIsFooterVisible }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();
//   // const { name, itemName, itemId, hostUserId, otherUserId } = location.state || {};//後で直す　ルームができたときに画面遷移したページは出品者のuserIdがhostUserIdと同じものだと認識できてない
//   const { name, item, otherUserId } = location.state || {};
//   const itemName = item[0]?.ItemName;
//   const itemId = item[0]?.ItemID;
//   const hostUserId = item[0]?.UserID;

//   // プルダウンで選択されたアイテムのIDと名前の状態を管理
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const [selectedItemName, setSelectedItemName] = useState('');
//   const [selectedhostUserId, setSelectedhostUserId] = useState(null);

//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [isSending, setIsSending] = useState(false);
//   const messageEndRef = useRef(null);
//   const myId = parseInt(sessionStorage.getItem('MyID'), 10);
//   const myName = sessionStorage.getItem('MyName');
//   const [TraderID, setTraderId] = useState(undefined); // traderIdを状態として管理
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [currentItemId, setCurrentItemId] = useState(itemId); // itemIdを状態として管理

//   //ヘッダー表示フラグ
//   const [isShown, setIsShown] = useState(true)

//   //Pusherの設定
//   useEffect(() => {
//     console.log(item);
//     const pusher = new Pusher('f155afe9e8a09487d9ea', {
//       cluster: 'ap3',
//     });

//     const channel = pusher.subscribe(`chat-room-${id}`);
//     channel.bind('message-sent', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     channel.bind('message-deleted', (data) => {
//       // メッセージを削除するために再読み込み
//       fetchChatMessages(); // メッセージを再取得
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [id, itemId]);


//   //フッター非表示
//   useEffect(() => {
//     // フッターを非表示にする
//     setIsFooterVisible(false);

//     // クリーンアップ関数でフッターを再表示
//     return () => setIsFooterVisible(true);
//   }, [setIsFooterVisible]);


//   // アイテムがロードされたときに初期値を設定
//   useEffect(() => {
//     if (item && item.length > 0) {
//       setSelectedItemId(item[0].ItemID); // 最初のアイテムIDを初期値に設定
//       setSelectedItemName(item[0].ItemName); // 最初のアイテム名を初期値に設定
//       setSelectedhostUserId(item[0].UserID);
//     }
//   }, [item]);



//   // itemIdを使ってtraderIDを取得する関数
//   const fetchTraderId = async () => {
//     if (itemId !== null) {
//       try {
//         const response = await fetch(`https://loopplus.mydns.jp/api/item/${selectedItemId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTraderId(data.TraderID); // traderIdを設定
//         console.log(data.TraderID);
//       } catch (error) {
//         console.error('Error fetching trader ID:', error);
//       }
//     }
//   };

//   const fetchChatMessages = async () => {
//     try {
//       const response = await fetch(`https://loopplus.mydns.jp/api/chat/room/${id}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error('Error fetching chat messages:', error);
//     }
//   };

//   //--------------------------------------------------
//   // itemIdが変更されたときにページを再読み込み
//   //---------------------------------------------------
//   useEffect(() => {
//     if (itemId !== currentItemId) {
//       window.location.reload(); // ページを再読み込み
//     }
//   }, [itemId, currentItemId]);

//   //--------------------------------------------------
//   //　自動スクロールの条件
//   //---------------------------------------------------
//   // 初回ロード時とメッセージ更新後に限界までスクロールする
//   useEffect(() => {
//     const forceScrollToBottom = () => {
//       const dmMessagesContainer = document.querySelector('.dm-messages');
//       if (dmMessagesContainer) {
//         dmMessagesContainer.scrollTop = dmMessagesContainer.scrollHeight;
//       }
//     };

//     // 初回ロード時のスクロール（複数回試行）
//     setTimeout(forceScrollToBottom, 100);  // 100ms後
//     setTimeout(forceScrollToBottom, 300);  // 300ms後
//     setTimeout(forceScrollToBottom, 500);  // 500ms後
//   }, []);  // 初回ロード時のみ

//   useEffect(() => {
//     const scrollToBottomWithRetries = () => {
//       const dmMessagesContainer = document.querySelector('.dm-messages');
//       if (dmMessagesContainer) {
//         // 強制スクロール処理
//         dmMessagesContainer.scrollTop = dmMessagesContainer.scrollHeight;

//         // 少し遅延させてさらにスクロール位置を強制
//         setTimeout(() => {
//           dmMessagesContainer.scrollTop = dmMessagesContainer.scrollHeight;
//           if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//           }
//         }, 100);
//       }
//     };

//     scrollToBottomWithRetries();  // メッセージ更新時に確実にスクロール
//   }, [messages]);


//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       // await fetchTraderId(); // traderIDを取得
//       await fetchChatMessages(); // チャットメッセージを取得
//       setIsLoaded(true); // データの取得が完了したらisLoadedをtrueに設定
//     };

//     fetchData();
//   }, [id]);





//   return (
//     <div className="dm-container">
//       <div className="top-navigation">
//         <button className="back-button" onClick={() => navigate('/messages')}>
//           <ArrowBackIcon className="back-icon" />
//         </button>
//         <h1 className="page-title">{name}</h1>
//       </div>

//       <div className={`hidebutton ${isShown ? 'shown' : ''}`}>
//         <button onClick={handleToggleButtonClick} className="bgtop">
//           <span>▼</span>
//         </button>
//       </div>

//       <div className="dm-messages">
//         {messages.map((msg, index) => {
//           const messageDate = new Date(msg.CreatedAt); // メッセージの作成日時
//           const today = new Date();

//           // 前のメッセージの日付を取得
//           const previousMessageDate = index > 0 ? new Date(messages[index - 1].CreatedAt) : null;

//           // 日付を表示するかどうかの判断
//           const showDate = (
//             !previousMessageDate ||
//             messageDate.getDate() !== previousMessageDate.getDate() ||
//             messageDate.getMonth() !== previousMessageDate.getMonth() ||
//             messageDate.getFullYear() !== previousMessageDate.getFullYear()
//           );

//           // 日付のフォーマット
//           let formattedDateMessage = '';
//           if (showDate) {
//             formattedDateMessage = messageDate.toDateString() === today.toDateString()
//               ? '今日'
//               : `${messageDate.getMonth() + 1}/${messageDate.getDate()}`; // MM/DD形式
//           }

//           // 時間のフォーマット
//           let formattedTime = '';
//           formattedTime = messageDate.toLocaleTimeString('ja-JP', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false,
//           });

//           return (
//             <div key={msg.ChatContentID} >
//               {showDate && <div className="date-message">{formattedDateMessage}</div>} {/* 日付の表示 */}
//               <div className='message-div'>
//                 <div
//                   className={`message-wrapper ${msg.UserID === myId ? 'right' : 'left'}`}
//                   onContextMenu={(e) => {
//                     e.preventDefault();
//                   }}
//                 >
//                   <div className="message-bubble"
//                     data-chat-content-id={msg.ChatContentID}
//                   >
//                     <p className={`message-text ${msg.DisplayFlag == 0 ? 'off' : 'on'}`}>{msg.Content}</p>
//                     {msg.Image && (
//                       <img
//                         src={`https://loopplus.mydns.jp/${msg.Image}`}
//                         alt="メッセージ画像"
//                         className="message-image"
//                       />
//                     )}
//                   </div>
//                   <div className="span-time">
//                     <span className="message-time">{formattedTime}</span>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           );
//         })}
//         <div ref={messageEndRef} />
//       </div>


//       <div className="dm-input">
//         <button className="image-upload-button" onClick={openFileDialog}>
//           <AddIcon className="add-icon" />
//         </button>
//         <input
//           type="file"
//           id="image-upload"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ display: 'none' }}
//           onKeyDown={handleKeyDown}
//         />
//         <input
//           type="text"
//           placeholder="メッセージを入力..."
//           className="input-box"
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button
//           className="send-button"
//           onClick={handleSendMessage}
//           disabled={!inputValue.trim() && !imageFile || isSending}
//         >
//           <SendIcon className="send-icon" />
//         </button>
//       </div>
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogContent>
//           <DialogContentText>
//             取引を辞退されました。
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DirectMessage;
