import React, { Component } from 'react'
import './index.scss'
// 引入组件
import NavHead from '../../components/NavHead'

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
                {/* 顶部导航  */}
                <NavHead>地图找房</NavHead>
                {/* 地图容器元素 */}
                <div id='container'></div>
            </div>
        )
    }
}
