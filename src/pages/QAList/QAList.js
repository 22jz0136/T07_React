// QAList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './QAList.css';

function QAList() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://loopplus.mydns.jp/api/qa');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        const formattedQuestions = data.map(q => ({
          id: q.QuestionID,
          question: q.QuestionContent,
          answer: q.AnswerContent,
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        alert(error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async () => {
    if (selectedQuestions.length === 0) {
        alert('削除する質問を選択してください。');
        return;
    }

    const confirmed = window.confirm('選択した質問を削除しますか？');
    if (!confirmed) return;

    try {
        const response = await fetch('https://loopplus.mydns.jp/api/qa/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedQuestions }), // 正しい形式で送信
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '削除に失敗しました');
        }

        // 削除成功後、質問を更新
        setQuestions(prevQuestions => prevQuestions.filter(q => !selectedQuestions.includes(q.id)));
        setSelectedQuestions([]); // 選択状態をリセット
        alert('質問が削除されました。');
    } catch (error) {
        console.error('Error deleting questions:', error);
        alert(error.message);
    }
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

  return (
    <div>
      <Navbar />
      <div className="columnBrake">
        <Sidebar />
        <div className='mainbody'>
          <h1>Q&A管理</h1>
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
              {questions.length > 0 ? (
                questions.map(q => (
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
                ))
              ) : (
                <li>質問がありません。</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QAList;
