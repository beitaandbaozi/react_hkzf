import React, { Component } from 'react'

// import './index.scss'
import styles from './index.module.css'


// 引入组件
import NavHead from '../../components/NavHead'
//  解决脚手架全局变量访问的问题
const BMapGL  = window.BMapGL


export default class index extends Component {
    // 初始化地图
    initMap(){
            /**
         * 根据定位展示当前城市
         * 1.获取当前定位城市
         * 2.使用地址解析器解析当前城市坐标
         * 3.调用 centerAndZoom() 方法在地图中展示当前城市，并设置缩放级别为11
         * 4.在地图中展示该城市，并添加比例尺和平移缩放控件
         */

        // 获取当前定位的城市
        // localStorage里面是字符串 记得要转化
        const { label, value } = JSON.parse(localStorage.getItem('localCity'))
        console.log(label, value);


        // 初始化地图实例
        const map = new BMapGL.Map("container");
        // 设置中心点
        // const point = new window.BMapGL.Point(116.404, 39.915);

        //创建地址解析器实例
        const myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, (point) => {
            if (point) {
                // 初始化地图
                map.centerAndZoom(point, 11);
                // 标记物
                // map.addOverlay(new BMapGL.Marker(point))

                // 添加常用控件
                map.addControl(new BMapGL.ScaleControl())
                map.addControl(new BMapGL.ZoomControl())

                /**
                 * 创建文本覆盖物
                 * 1.创建 Label 实例对象
                 * 2.调用 setStyle() 方法设置样式
                 * 3.在 map 对象上调用 addOverlay() 方法，将文本覆盖物添加到地图中
                 */
                const opts = {
                    position:point
                }
                const label = new BMapGL.Label('beita',opts)
                // 设置样式
                label.setStyle({
                    color:'lightblue'
                })
                // 添加覆盖物到地图中
                map.addOverlay(label)



            }
        }, label)


        // 初始化地图
        // map.centerAndZoom(point, 15);
    }
    componentDidMount() {
        this.initMap()
    }
    render() {
        return (
            <div className={styles.map}>
                {/* 顶部导航  */}
                <NavHead>地图找房</NavHead>
                {/* 地图容器元素 */}
                <div id='container' className={styles.container}></div>
            </div>
        )
    }
}
