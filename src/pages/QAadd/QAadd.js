import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateフックを使う
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './QAadd.css';

function QAadd({ onAddQuestion }) {
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate(); // ページ遷移用

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 新しい質問を追加するための関数呼び出し
    onAddQuestion({
      id: Date.now(), // ユニークなIDを生成
      question: `Q: ${question}`,
      answer: `A: ${answer}`,
    });

    // 質問リストに戻る
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />
        <form className="formEdit" onSubmit={handleSubmit}>
          <div className="formText">
            <div className="formTextarea">
              <label>質問内容</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="質問を入力"
                required
              />
              <br />
            </div>
          </div>

          <div className="formText">
            <div className="formTextarea">
              <label>回答内容</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="回答を入力"
                required
              />
              <br />
            </div>
          </div>
          <button type="submit">追加する</button>
        </form>
      </div>
    </div>
  );
}

export default QAadd;
