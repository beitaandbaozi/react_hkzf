// 导入路由配置
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// 导入首页和城市选择组件(2021-8-21)
import Home from './pages/Home';
import CityList from './pages/CityList';

function App() {
  return (
    <BrowserRouter>

      

      {/* 路由注册 */}
      <Route path='/home' component={Home}></Route>
      <Route path='/citylist' component={CityList}></Route>
      <Route path='/' exact render={() => <Redirect to='home'></Redirect>}></Route>
    </BrowserRouter>
  );
}

export default App;
