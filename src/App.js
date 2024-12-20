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
          <Route path="/" element={<UserManagement />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/useritemlist" element={<UserItemList />} />
          <Route path="/userrequestlist" element={<UserRequestList />} />
          <Route path="/usertradinghistorylist" element={<UserTradingHistory />} />
          <Route path="/qalist" element={<QAList />} />
          <Route path="/qaadd" element={<QAadd />} />
          <Route path="/user-warning/:userId" element={<UserWarning />} />
          <Route path="/listedproducts" element={<ListedProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product-warning/:productId" element={<ProductWarning />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/product-detail" element={<ProductDetail />} /></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
