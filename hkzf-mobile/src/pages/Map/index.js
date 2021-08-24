import React, { Component } from 'react'
import './index.scss'

export default class index extends Component {
    componentDidMount(){
        // 初始化地图实例
        const map = new window.BMapGL.Map("container");
        // 设置中心点
        const  point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图
        map.centerAndZoom(point, 15); 
    }
    render() {
        return (
            <div className='map'>
                <div id='container'></div>
            </div>
        )
    }
}
