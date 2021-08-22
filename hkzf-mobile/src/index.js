import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 引入antd-mobile样式 （2021-8-21）
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


