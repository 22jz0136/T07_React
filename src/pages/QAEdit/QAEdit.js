// QAEdit.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

function QAEdit() {
  const { id } = useParams(); // URLから質問IDを取得

  return (
    <div>

        <Navbar/>
        <div className='columnBrake'>
          <Sidebar/>
          
            
            <SearchBar/>
            
                <form>
                <label>質問内容:</label>
                <input type="text" defaultValue={`Q${id}:`} />
                <br />
                <label>回答内容:</label>
                <textarea defaultValue="ここに回答を入力" />
                <br />
                <button type="submit">保存</button>
            </form>
         
        </div>   
        
      
    </div>
  );
}

export default QAEdit;
