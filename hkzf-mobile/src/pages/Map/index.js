import React, { Component } from 'react'

// import './index.scss'
import styles from './index.module.css'

import axios from 'axios'

import { Link } from 'react-router-dom'

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

export default class Map extends Component {
    state = {
        housesList: [],
        isShowList: false
    }
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
        this.map = map
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
                this.renderOverlays(value)
            }
        }, label)
    }

    /**
     * 渲染覆盖物入口
     * 1、接受区域id参数，获取该区域下的房源数据
     * 2、获取房源类型以及下级地图的缩放级别
     */
    async renderOverlays(id) {
        const { data: { body } } = await axios.get(`http://localhost:8080/area/map?id=${id}`)

        //  调用 getTypeAndZoom 方法获取级别和类型
        const { nextZoom, type } = this.getTypeAndZoom()

        // 创建覆盖物
        body.forEach(item => {
            this.createOverlays(item, nextZoom, type)
        });

    }
    /**
     * 计算要绘制的覆盖物类型和下一个缩放级别
     * 区     -> 11，范围：>=10 < 12
     * 镇     -> 13，范围：>=12 <14
     * 小区   -> 15，范围：>=14 <16
     */
    getTypeAndZoom() {
        // 调用地图的getZoom（）方法，来获取当前缩放级别
        const zoom = this.map.getZoom()
        let nextZoom, type
        if (zoom >= 10 && zoom < 12) {
            // 区
            // 定义级别
            nextZoom = 13
            // 绘制圆形覆盖物（区和镇）
            type = 'circle'
        } else if (zoom >= 12 && zoom < 14) {
            // 镇
            nextZoom = 15
            type = 'circle'
        } else if (zoom >= 14 && zoom < 16) {
            type = 'rect'
        }
        return { nextZoom, type }
    }
    // 创建覆盖物
    createOverlays(data, zoom, type) {
        const {
            coord: { latitude, longitude },
            label: areaName,
            count,
            value
        } = data
        const areaPoint = new BMapGL.Point(longitude, latitude)
        if (type === 'circle') {
            //  区或镇
            this.createCircle(areaPoint, areaName, count, value, zoom)
        } else {
            // 小区
            this.createRect(areaPoint, areaName, count, value)
        }
    }
    // 创建区、镇覆盖物
    createCircle(point, name, count, id, zoom) {
        const opts = {
            position: point,
            offset: new BMapGL.Size(-35, -35)
        }
        const label = new BMapGL.Label('', opts)

        // 每个覆盖物添加唯一标识
        label.id = id

        //设置房源覆盖物的内容
        label.setContent(`
    <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
    </div>
    `)

        // 设置样式
        label.setStyle(labelStyle)

        //  给覆盖物添加单击事件
        label.addEventListener('click', () => {
            // 调用 renderOverlays 方法，获取该区域下的房源数据
            this.renderOverlays(id)

            // 放大地图，以当前点击的覆盖物为中心放大地图
            // 第一个参数，坐标对象
            // 第二个参数，放大级别
            this.map.centerAndZoom(point, zoom);
            // 清除覆盖物
            setTimeout(() => {
                this.map.clearOverlays()
            }, 0);
        })

        // 添加覆盖物到地图中
        this.map.addOverlay(label)

    }
    // 创建小区覆盖物
    createRect(point, name, count, id) {
        const opts = {
            position: point,
            offset: new BMapGL.Size(-50, -28)
        }
        const label = new BMapGL.Label('', opts)

        // 每个覆盖物添加唯一标识
        label.id = id

        // 设置房源覆盖物内容
        label.setContent(`
    <div class="${styles.rect}">
      <span class="${styles.housename}">${name}</span>
      <span class="${styles.housenum}">${count}套</span>
      <i class="${styles.arrow}"></i>
    </div>
  `)

        // 设置样式
        label.setStyle(labelStyle)

        // 添加单击事件
        label.addEventListener('click', () => {
            /* 
              1 创建 Label 、设置样式、设置 HTML 内容，绑定单击事件。
              
              2 在单击事件中，获取该小区的房源数据。
              3 展示房源列表。
              4 渲染获取到的房源数据。
        
              5 调用地图 panBy() 方法，移动地图到中间位置。
              6 监听地图 movestart 事件，在地图移动时隐藏房源列表。
            */

            this.getHousesList(id)

            // console.log('小区被点击了')
        })
        // 添加覆盖物到地图中
        this.map.addOverlay(label)
    }
    // 获取小区房源数据
    async getHousesList(id) {
        const res = await axios.get(`http://localhost:8080/houses?cityId=${id}`)
        // console.log('小区的房源数据:', res)
        this.setState({
            housesList: res.data.body.list,
            // 展示房源列表
            isShowList: true
        })
    }

    // 渲染房屋列表的item方法
    /**
     * 渲染房源列表
     */
    renderHousesList() {
        return this.state.housesList.map(item => (
            <div className={styles.house} key={item.houseCode}>
                <div className={styles.imgWrap}>
                    <img
                        className={styles.img}
                        src={`http://localhost:8080${item.houseImg}`}
                        alt=""
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.desc}>{item.desc}</div>
                    <div>
                        {/* ['近地铁', '随时看房'] */}
                        {item.tags.map((tag, index) => {
                            const tagClass = 'tag' + (index + 1)
                            return (
                                <span
                                    className={[styles.tag, styles[tagClass]].join(' ')}
                                    key={tag}
                                >
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                    <div className={styles.price}>
                        <span className={styles.priceNum}>{item.price}</span> 元/月
                    </div>
                </div>
            </div>
        ))
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
                {/* 房源列表 */}
                {/* 添加 styles.show 展示房屋列表 */}
                <div
                    className={[
                        styles.houseList,
                        this.state.isShowList ? styles.show : ''
                    ].join(' ')}
                >
                    <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <Link className={styles.titleMore} to="/home/list">
                            更多房源</Link>
                    </div>
                    <div className={styles.houseItems}>
                        {/* 房屋结构 */}
                        {this.renderHousesList()}
                    </div>
                </div>
            </div>
        )
    }
}
