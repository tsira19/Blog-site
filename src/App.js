import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Post from './Post';
import Contact from './Contact';
import Page from './Page';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Connect" element={<Connect />} />
          <Route path="/Page" element={<Page/>}></Route>
          <Route path="/" element={<Home />} /> {/* Default Route */}
        </Routes>
      </Layout>
    </Router>
    
  );
};

export default App;
