/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import New from '../New'
import Index from '../Index'
import './index.css'
import HouseList from '../HouseList'
import Profile from '../Profile'
import { Route } from 'react-router'
// 导入TabBar
import { TabBar } from 'antd-mobile';


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

/**
 * 问题：点击首页导航菜单，导航到找房列表时，TabBar对应的没有高亮操作
 * 原因：原来实现该功能的时候，只考虑了 点击以及第一次加载 Home组件的情况。但是，我们没有考虑不重新加载 Home组件的路由器切换状况。
 * 解决方法：
 *          思路：在路由切换的时，也执行菜单高亮的逻辑代码
 *          1. 添加 componentDidUpdate 钩子函数
 *          2. 在钩子函数中判断路由地址是否正确
 *          3.在路由地址切换时，让 菜单高亮
 */

export default class Home extends Component {
    state = {
        // 默认选中的路由地址
        selectedTab: this.props.location.pathname,
    };

    // 路由变化时，触发
    componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            // 此时，就说明路由切换了
            this.setState({
                selectedTab:this.props.location.pathname
            })

        }
    }


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
