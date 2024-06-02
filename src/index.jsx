import React from "react";
import Login from "./LoginForm/LoginForm";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import Page from './Page';
import Connect from './Connect';
import Register from './LoginForm/RegisterForm';
import BlogDetails from './BlogDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Index.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Page" element={<Page/>} />
        <Route path="/Connect" element={<Connect />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/blog/get/:id" element={<BlogDetails />} />
        <Route path="/news" element={<Navigate to="/home" />} />
        <Route index element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);