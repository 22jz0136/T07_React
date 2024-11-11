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
import UserWarning from './pages/UserWarning/UserWarning';
import ProductWarning from './pages/ProductWarning/ProductWarning';
import ListedProducts from './pages/ListedProducts/ListedProducts';

function App() {

    return (
        <div>
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
                    <Route path="/userwarning" element={<UserWarning />} />
                    <Route path="/user-warning/:userId" element={<UserWarning />} />
                    <Route path="/productwarning" element={<ProductWarning />} />
                    <Route path="/listedproducts" element={<ListedProducts />} />
                </Routes>
            </BrowserRouter>
      
        </div>
    )
}

export default App