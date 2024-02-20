import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayList from './components/PlayList';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<PlayList/>} />
          <Route path="upload-song" element={<UploadForm/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
