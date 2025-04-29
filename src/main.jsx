import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'swiper/css';
import 'swiper/css/pagination';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
  <App />
</BrowserRouter>
);
