import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// BrowserRouter : HTML5의 History API 사용하여
// 페이지 새로고침 하지 않고도 주소 변경 할 수 있도록 해줌
/*
  리액트는 새로고침 되면 state들이 초기화 됨
  ( 유지 시켜 줘야함 )
*/ 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 1. 부모 컴포넌트 App 감싸주기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
