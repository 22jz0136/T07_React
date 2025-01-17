// QAManager.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QAList from './QAList';
import QAadd from './QAadd';

function QAManager() {
  return (
    <Routes>
      <Route path="/admin/qalist" element={<QAList />} />
      <Route path="/admin/qaadd" element={<QAadd />} />
    </Routes>
  );
}

export default QAManager;
