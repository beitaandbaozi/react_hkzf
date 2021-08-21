import React, { Component } from 'react'
import New from '../New'
import { Route } from 'react-router'
export default class Home extends Component {
    render() {
        return (
            <div style={{backgroundColor:'red'}}>
                首页
                {/* 渲染子路由 */}
                <Route path="/home/new" component={New}></Route>
            </div>
        )
    }
}
