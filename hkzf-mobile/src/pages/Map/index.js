import React, { Component } from 'react'

// import './index.scss'
import styles from './index.module.css'

import axios from 'axios'


// 引入组件
import NavHead from '../../components/NavHead'
//  解决脚手架全局变量访问的问题
const BMapGL = window.BMapGL
// 覆盖物样式
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}

export default class index extends Component {
    // 初始化地图
    initMap() {
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
        myGeo.getPoint(label, async (point) => {
            if (point) {
                // 初始化地图
                map.centerAndZoom(point, 11);
                // 标记物
                // map.addOverlay(new BMapGL.Marker(point))

                // 添加常用控件
                map.addControl(new BMapGL.ScaleControl())
                map.addControl(new BMapGL.ZoomControl())

                /**
                 * 渲染所有区的覆盖物
                 * 1、获取房源数据
                 * 2、遍历数据，创建覆盖物，给每个覆盖物添加唯一标识
                 * 3、给覆盖物添加单击事件
                 * 4、在单击事件中，获取到当前单击项的唯一标识
                 * 5、放大地图（级别为13）调用clearOverlays()方法清楚当前覆盖物
                 */
                const { data: { body } } = await axios.get(`http://localhost:8080/area/map?id=${value}`)
                // console.log(body);
                body.forEach(item => {
                    // 为每一条数据创建覆盖物
                    const { coord: { latitude, longitude } } = item
                    const areaPoint = new BMapGL.Point(longitude, latitude)
                    const opts = {
                        position: areaPoint,
                        offset: new BMapGL.Size(-35, -35)
                    }
                    const label = new BMapGL.Label('', opts)

                    // 每个覆盖物添加唯一标识
                    label.id = item.value

                    //设置房源覆盖物的内容
                    label.setContent(`
                <div class="${styles.bubble}">
                    <p class="${styles.name}">${item.label}</p>
                    <p>${item.count}套</p>
                </div>
                `)

                    // 设置样式
                    label.setStyle(labelStyle)

                    //  给覆盖物添加单击事件
                    label.addEventListener('click', () => {
                        console.log('房源覆盖物被点击了', label.id);
                        // 放大地图，以当前点击的覆盖物为中心放大地图
                        // 第一个参数，坐标对象
                        // 第二个参数，放大级别
                        map.centerAndZoom(areaPoint, 13);
                        // 清除覆盖物
                        setTimeout(() => {
                            map.clearOverlays()
                        }, 0);
                    })


                    // 添加覆盖物到地图中
                    map.addOverlay(label)
                })
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
