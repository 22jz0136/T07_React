import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './QAList.css';

function QAList() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { id: 1, question: 'Q1: サイトの利用方法について教えてください。', answer: 'A1: サイトにアクセスし、アカウントを作成してから商品の検索や購入が可能です。' },
    { id: 2, question: 'Q2: パスワードを忘れた場合はどうすればいいですか？', answer: 'A2: ログイン画面の「パスワードを忘れた場合」リンクから再設定できます。' },
    { id: 3, question: 'Q3: 配送にはどれくらいの時間がかかりますか？', answer: 'A3: 通常、注文後2～3営業日以内に発送されます。' },
  ]);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleDelete = () => {
    const newQuestions = questions.filter(q => !selectedQuestions.includes(q.id));
    setQuestions(newQuestions);
    setSelectedQuestions([]);
  };

  const handleAdd = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleNavigateToAdd = () => {
    navigate('/qaadd'); // 質問追加ページに遷移
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // 編集ページに遷移
  };

  const handleSelect = (id) => {
    setSelectedQuestions(prevState =>
      prevState.includes(id)
        ? prevState.filter(q => q !== id)
        : [...prevState, id]
    );
  };

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />
        <div>
          <h1>Q&A管理</h1>
          <SearchBar />
          <div className="qa-list">
            <button className="add-button" onClick={handleNavigateToAdd}>
              ＋ 質問を追加
            </button>
            <button className="delete-button" onClick={handleDelete} disabled={selectedQuestions.length === 0}>
              削除
            </button>
            <ul className="question-list">
              {questions.map(q => (
                <li key={q.id} className="question-item">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleSelect(q.id)}
                  />
                  <span>{q.question}</span>
                  <button className="edit-button" onClick={() => handleEdit(q.id)}>編集</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QAList;
