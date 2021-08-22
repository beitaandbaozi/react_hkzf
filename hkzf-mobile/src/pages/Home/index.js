/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import New from '../New'
import Index from '../Index'
import HouseList from '../HouseList'
import Profile from '../Profile'
import { Route } from 'react-router'
// 导入TabBar
import { TabBar } from 'antd-mobile';
import './index.css'

/**
 * TabBar数据
 */
const tabItems = [
    {
        title: '首页',
        icon: 'icon-ind',
        path: '/home'
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list'
    },
    {
        title: '资讯',
        icon: 'icon-infom',
        path: '/home/news'
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile'
    },
]



export default class Home extends Component {
    state = {
        // 默认选中的路由地址
        selectedTab: this.props.location.pathname,
    };

    //  TabBar-item
    renderTabBarItem() {
        return tabItems.map(item => (
            <TabBar.Item
                title={item.title}
                key={item.title}
                icon={
                    <i className={`iconfont ${item.icon}`}></i>
                }
                selectedIcon={<i className={`iconfont ${item.icon}`}></i>
                }
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.setState({
                        selectedTab: item.path,
                    });
                    // 路由跳转
                    this.props.history.push(item.path)
                }}
            >
            </TabBar.Item>
        

        ))
    }
        


    render() {
        // console.log(this.props.location.pathname)
        return (
            <div className='home'>
                {/* 渲染子路由 */}
                <Route path="/home" exact component={Index}></Route>
                <Route path="/home/list" component={HouseList}></Route>
                <Route path="/home/news" component={New}></Route>
                <Route path="/home/profile" component={Profile}></Route>
                


                {/* TabBar */}
                <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent={true}>
                    {this.renderTabBarItem()}
                </TabBar>
            </div>
        )
    }
}
