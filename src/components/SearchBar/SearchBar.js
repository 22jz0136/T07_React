import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search'; // MUIの検索アイコンをインポート

export default function SearchBar() {
    return (
        <div className='searchBar'>
            <input type="text" placeholder="利用者IDを入力してください..." />
            <SearchIcon className="searchIcon" /> {/* アイコンを表示 */}
        </div>
    );
}
