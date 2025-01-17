// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement/UserManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import UserItemList from './pages/UserItemList/UserItemList';
import UserRequestList from './pages/UserRequestList/UserRequestList';
import UserTradingHistory from './pages/UserTradingHistory/UserTradingHistory';
import QAList from './pages/QAList/QAList';
import QAadd from './pages/QAadd/QAadd';
import UserWarning from './pages/UserWarning/UserWarning';
import ProductWarning from './pages/ProductWarning/ProductWarning';
import ListedProducts from './pages/ListedProducts/ListedProducts';
import Login from './pages/Login/Login';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SearchResult from './components/SearchBar/SearchResult';


function App() {
  
  const [requests, setRequests] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const handleRequestAdded = (newRequest) => {
    setRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<Login setIsFooterVisible={setIsFooterVisible} />} />
          <Route path="/admin/" element={<UserManagement />} />
          <Route path="/admin/user-profile/:id" element={<UserProfile />} />
          <Route path="/admin/useritemlist" element={<UserItemList />} />
          <Route path="/admin/userrequestlist" element={<UserRequestList />} />
          <Route path="/admin/usertradinghistorylist" element={<UserTradingHistory />} />
          <Route path="/admin/qalist" element={<QAList />} />
          <Route path="/admin/qaadd" element={<QAadd />} />
          <Route path="/admin/user-warning/:userId" element={<UserWarning />} />
          <Route path="/admin/listedproducts" element={<ListedProducts />} />
          <Route path="/admin/product/:id" element={<ProductDetail />} />
          <Route path="/admin/product-warning/:productId" element={<ProductWarning />} />
          <Route path="/admin/searchresult" element={<SearchResult />} />
          <Route path="/admin/product-detail" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
