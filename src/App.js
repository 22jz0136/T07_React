import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement/UserManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import UserItemList from './pages/UserItemList/UserItemList';
import UserRequestList from './pages/UserRequestList/UserRequestList';
import UserTradingHistory from './pages/UserTradingHistory/UserTradingHistory';
import QAList from './pages/QAList/QAList';
import QAEdit from './pages/QAEdit/QAEdit';
import QAadd from './pages/QAadd/QAadd';
import UserWarning from './pages/UserWarning/UserWarning';
import ProductWarning from './pages/ProductWarning/ProductWarning';
import ListedProducts from './pages/ListedProducts/ListedProducts';
import Login from './pages/Login/Login';

function App() {

    return (
        <div>
             <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<UserManagement />} />
                    <Route path="/user-profile/:id" element={<UserProfile />} />
                    <Route path="/useritemlist" element={<UserItemList />} />
                    <Route path="/userrequestlist" element={<UserRequestList />} />
                    <Route path="/usertradinghistorylist" element={<UserTradingHistory />} />
                    <Route path="/qalist" element={<QAList />} />
                    <Route path="/edit/:id" element={<QAEdit />} />
                    <Route path="/qaadd" element={<QAadd />} />
                    <Route path="/user-warning/:userId" element={<UserWarning />} />
                    <Route path="/productwarning" element={<ProductWarning />} />
                    <Route path="/listedproducts" element={<ListedProducts />} />
                </Routes>
            </BrowserRouter>
      
        </div>
    )
}

export default App