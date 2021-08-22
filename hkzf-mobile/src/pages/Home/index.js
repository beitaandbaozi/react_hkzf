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

export default class Home extends Component {
    state = {
        // 默认选中的路由地址
        selectedTab: this.props.location.pathname,
    };
   
    render() {
        // console.log(this.props.location.pathname)
        return (
            
            <div className='home'>
                {/* 渲染子路由 */}
                <Route path="/home/index" component={Index}></Route>
                <Route path="/home/list" component={HouseList}></Route>
                <Route path="/home/news" component={New}></Route>
                <Route path="/home/profile" component={Profile}></Route>
                {/* TabBar */}

                <TabBar
                    tintColor="#21b97a"
                    barTintColor="white"
                    noRenderContent={true}
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={
                            <i className='iconfont icon-ind'></i>
                        }
                        selectedIcon={<i className='iconfont icon-ind'></i>
                        }
                        selected={this.state.selectedTab === '/home/index'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/index',
                            });
                            // 路由跳转
                            this.props.history.push('/home/index')
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className='iconfont icon-findHouse'></i>
                        }
                        selectedIcon={
                            <i className='iconfont icon-findHouse'></i>
                        }
                        title="找房"
                        key="Koubei"
                        selected={this.state.selectedTab === '/home/list'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/list',
                            });
                            this.props.history.push('/home/list')
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className='iconfont icon-infom'></i>
                        }
                        selectedIcon={
                            <i className='iconfont icon-infom'></i>
                        }
                        title="资讯"
                        key="Friend"
                        selected={this.state.selectedTab === '/home/news'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/news',
                            });
                            this.props.history.push('/home/news')
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-my'></i>}
                        selectedIcon={<i className='iconfont icon-my'></i>}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === '/home/profile'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/home/profile',
                            });
                            this.props.history.push('/home/profile')
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}
