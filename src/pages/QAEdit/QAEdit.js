// QAEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './QAEdit.css';

const QAEdit = () => {
  const { id } = useParams(); // URLパラメータからidを取得
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 質問データを取得（仮のデータとして）
    const questionData = {
      1: { question: 'サイトの利用方法について教えてください。', answer: 'サイトにアクセスし、アカウントを作成してから商品の検索や購入が可能です。' },
      2: { question: 'パスワードを忘れた場合はどうすればいいですか？', answer: 'ログイン画面の「パスワードを忘れた場合」リンクから再設定できます。' },
      3: { question: '配送にはどれくらいの時間がかかりますか？', answer: '通常、注文後2～3営業日以内に発送されます。' },
    };

    setQuestion(questionData[id]); // idに基づいて質問を取得
  }, [id]);

  const handleSave = () => {
    // 編集内容を保存する処理（ここでは仮の処理）
    navigate('/qalist'); // 保存後にQ&Aリスト画面に戻る
  };

  return (
    <div>
        <Navbar/>
        <div className='columnBrake'>
          <Sidebar/>
          <div className='mainbody'>
            <div className='qaedit-form'>
              <h2>質問の編集</h2>
              {question ? (
                <div className='qaedit-question-form'>
                  <div className='qaedit-question'>
                    <label>質問</label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                    />
                  </div>
                  <div className='qaedit-question'>
                    <label>回答</label>
                    <textarea
                      value={question.answer}
                      onChange={(e) => setQuestion({ ...question, answer: e.target.value })}
                    />
                  </div>

                  <div className='qaedit-button'>
                    <button onClick={handleSave}>保存</button>
                  </div>
                  
                </div>
              ) : (
                <p>読み込み中...</p>
              )}
            </div>
            
          </div>
        </div>
    </div>      
  );
};

export default QAEdit;
