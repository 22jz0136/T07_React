import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateフックを使う
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './QAadd.css'; // QAEdit.jsと同じCSSを使用

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
    navigate('/qalist');
  };

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />
        <div className="mainbody">
          <div className="qaedit-form">
            <h2>新しい質問追加</h2>
            <div className="qaedit-question-form">
              <div className="qaedit-question">
                <label>質問</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="質問を入力"
                  required
                />
              </div>
              <div className="qaedit-question">
                <label>回答</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力"
                  required
                />
              </div>
              <div className="qaedit-button">
                <button onClick={handleSubmit}>追加する</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QAadd;
