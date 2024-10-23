import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement/UserManagement';
import ItemManagement from './pages/ItemManagement/ItemManagement';
import UserItemList from './pages/UserItemList/UserItemList';
import UserRequestList from './pages/UserRequestList/UserRequestList';
import UserTradingHistory from './pages/UserTradingHistory/UserTradingHistory';

function App() {

    return (
        <div className='App'>
             <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserManagement />} />
                    <Route path="/itemmanagement" element={<ItemManagement />} />
                    <Route path="/useritemlist" element={<UserItemList />} />
                    <Route path="/userrequestlist" element={<UserRequestList />} />
                    <Route path="/usertradinghistorylist" element={<UserTradingHistory />} />
                </Routes>
            </BrowserRouter>
      
        </div>
    )
}

export default App