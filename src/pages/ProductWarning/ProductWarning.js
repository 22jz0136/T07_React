// ProductWarning.js
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/SearchBar/SearchBar';

const ProductWarning = () => {
  const { productId } = useParams(); 
  const location = useLocation();   
  const { username, productName, productDetails, productLocation, productImage, profileImage, date, status } = location.state || {};

  return (
    <div>
      <Navbar />
      <div className='columnBrake'>
        <Sidebar />
        <div className='mainbody'>
          <div className='productmanager'>
            <SearchBar />
            <div key={productId} className="productitem">
              <div className="product-header">
                  <img src={profileImage} alt="Profile" className="profile-image" />
                  <span className="username">{username}</span>
                  <span className="date">{new Date(date).toLocaleString('ja-JP', 
                    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span><br />
              </div>

              <div className='imagedetail-flex'>
                  <img src={productImage} alt={productDetails} className="productimage" />
                  <div className="productdetails">
                    <div className='product-details-title'>
                      <p>{productDetails}</p>
                    </div>
                    <p>希望取引方法:{status}</p>
                    <div className='poduct-location'>
                      <p>受け渡し場所: <span className="location-text">{productLocation}</span></p>
                    </div>
                  </div>
                  </div>
                  {/* <form className='form' onSubmit={handleSubmit}>
                    <div className='userWarningForm'>
                        <label>警告内容</label>
                        <textarea
                        value={warningContent}
                        onChange={(e) => setWarningContent(e.target.value)}
                        placeholder="警告内容を入力してください"
                        required
                        /><br/>
                    </div>
                    
                    <button type="submit">警告する</button>
                  </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWarning;
