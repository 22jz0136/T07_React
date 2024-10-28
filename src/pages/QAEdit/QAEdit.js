// QAEdit.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';
import './QAEdit.css';

function QAEdit() {
  const { id } = useParams(); // URLから質問IDを取得

  return (
    <div>

        <Navbar/>
        <div className='columnBrake'>
          <Sidebar/>
            <form className='formEdit'>
              <div className='formText'>
                <div className='formTextarea'>
                  <label>質問内容</label>
                  <input type="text" defaultValue={`Q${id}:`} />
                  <br />
                </div>
              </div>

              <div className='formText'>
                <div className='formTextarea'>
                  <label>回答内容</label>
                  <textarea defaultValue="ここに回答を入力" />
                  <br />
                </div>
                
                
              </div>  
                <button type="submit">変更する</button>
            </form>
         
        </div>   
        
      
    </div>
  );
}

export default QAEdit;
