import React from 'react';
import ReactDOM from 'react-dom';

// 引入antd-mobile样式 （2021-8-21）
import 'antd-mobile/dist/antd-mobile.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'
// 引入react-virtualized样式
import 'react-virtualized/styles.css'

import './index.css'
// 应该将 组件 的导入放在样式导入后面，从而避免样式覆盖的问题
import App from './App';
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


