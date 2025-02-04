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
import UserBan from './pages/UserBAN/UserBan';
import ProductWarning from './pages/ProductWarning/ProductWarning';
import ListedProducts from './pages/ListedProducts/ListedProducts';
import Login from './pages/Login/Login';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SearchResult from './components/SearchBar/SearchResult';
import PrivateRoute from './components/PrivateRoute';
import GoogleCallback from './components/Callback/GoogleCallback';


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
          <Route path="/admin/" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path="/admin/user-profile/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/admin/useritemlist" element={<PrivateRoute><UserItemList /></PrivateRoute>} />
          <Route path="/admin/userrequestlist" element={<PrivateRoute><UserRequestList /></PrivateRoute>} />
          <Route path="/admin/usertradinghistorylist" element={<PrivateRoute><UserTradingHistory /></PrivateRoute>} />
          <Route path="/admin/qalist" element={<PrivateRoute><QAList /></PrivateRoute>} />
          <Route path="/admin/qaadd" element={<PrivateRoute><QAadd /></PrivateRoute>} />
          <Route path="/admin/user-warning/:userId" element={<PrivateRoute><UserWarning /></PrivateRoute>} />
          <Route path="/admin/user-judgment/:userId" element={<PrivateRoute><UserBan /></PrivateRoute>} />
          <Route path="/admin/listedproducts" element={<PrivateRoute><ListedProducts /></PrivateRoute>} />
          <Route path="/admin/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path="/admin/product-warning/:productId" element={<PrivateRoute><ProductWarning /></PrivateRoute>} />
          <Route path="/admin/searchresult" element={<PrivateRoute><SearchResult /></PrivateRoute>} />
          <Route path="/admin/product-detail" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
          <Route path="/admin/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
