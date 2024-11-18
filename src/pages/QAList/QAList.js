// QAList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './QAList.css';

function QAList() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { id: 1, question: 'サイトの利用方法について教えてください。', answer: 'サイトにアクセスし、アカウントを作成してから商品の検索や購入が可能です。' },
    { id: 2, question: 'パスワードを忘れた場合はどうすればいいですか？', answer: 'ログイン画面の「パスワードを忘れた場合」リンクから再設定できます。' },
    { id: 3, question: '配送にはどれくらいの時間がかかりますか？', answer: '通常、注文後2～3営業日以内に発送されます。' },
  ]);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleDelete = () => {
    const newQuestions = questions.filter(q => !selectedQuestions.includes(q.id));
    setQuestions(newQuestions);
    setSelectedQuestions([]);
  };

  const handleNavigateToAdd = () => {
    navigate('/qaadd');
  };

  const handleEdit = (id) => {
    navigate(`/qalist/${id}`);
  };

  const handleSelect = (id) => {
    setSelectedQuestions(prevState =>
      prevState.includes(id)
        ? prevState.filter(q => q !== id)
        : [...prevState, id]
    );
  };

  const handleNavigateToDetail = (question) => {
    navigate('/qadetail', { state: question }); // 詳細画面に質問情報を渡して遷移
  };

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />
        <div className='mainbody'>
          <h1>Q&A管理</h1>
          <SearchBar />
          <div className="qa-list">
            <div className='add-delete-button'>
              <button className="add-button" onClick={handleNavigateToAdd}>
                ＋ 質問を追加
              </button>
              <button className="delete-button" onClick={handleDelete} disabled={selectedQuestions.length === 0}>
                削除
              </button>
            </div>
            
            <ul className="question-list">
              {questions.map(q => (
                <li key={q.id} className="question-item">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleSelect(q.id)}
                  />

                  <div className="qa-content" onClick={() => handleEdit(q.id)}>
                    <p><strong>{q.question}</strong></p>
                    <p>{q.answer}</p>
                  </div>
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
