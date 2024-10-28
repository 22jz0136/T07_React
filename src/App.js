import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement/UserManagement';
import ItemManagement from './pages/ItemManagement/ItemManagement';
import UserItemList from './pages/UserItemList/UserItemList';
import UserRequestList from './pages/UserRequestList/UserRequestList';
import UserTradingHistory from './pages/UserTradingHistory/UserTradingHistory';
import QAList from './pages/QAList/QAList';
import QAEdit from './pages/QAEdit/QAEdit';
import QAadd from './pages/QAadd/QAadd';

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
                    <Route path="/qalist" element={<QAList />} />
                    <Route path="/edit/:id" element={<QAEdit />} />
                    <Route path="/qaadd" element={<QAadd />} />
                </Routes>
            </BrowserRouter>
      
        </div>
    )
}

export default App