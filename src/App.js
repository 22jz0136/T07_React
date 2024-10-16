import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './pages/UserManagement/UserManagement';
import ItemManagement from './pages/ItemManagement/ItemManagement';

function App() {

    return (
        <div className='App'>
             <BrowserRouter>
                <Routes>
                    <Route path="/usermanagement" element={<UserManagement />} />
                    <Route path="/itemmanagement" element={<ItemManagement />} />
                    {/* <Route path="*" element={<NoMatch />} /> */}
                </Routes>
            </BrowserRouter>
      
        </div>
    )
}

export default App