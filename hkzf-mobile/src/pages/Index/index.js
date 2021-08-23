import React, { Component } from 'react'
import { Carousel, Flex } from 'antd-mobile';
import axios from 'axios'
// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 导入样式
import './index.css'

export default class index extends Component {
    state = {
        // 轮播图数据
        swipers: [],
        // 导航菜单数据
        navList: [
            {
                id:1,
                img: Nav1,
                name: '整租',
                path:'/home/list'
            },
            {
                id:2,
                img: Nav2,
                name: '合租',
                path:'/home/list'

            },
            {
                id:3,
                img: Nav3,
                name: '地图找房',
                path:'/map'
            },
            {
                id:4,
                img: Nav4,
                name: '出租',
                path:'/rent'
            }
        ]
    }
    // 获取轮播图
    async getSwiper() {
        const { data: { body } } = await axios.get('http://localhost:8080/home/swiper')
        console.log(body);
        this.setState({
            swipers: body
        })

    }
    // 渲染轮播图
    renderSwiper() {
        return this.state.swipers.map(item => (
            <a
                key={item.id}
                href='http://itcast.cn'
                style={{ display: 'inline-block', width: '100%', height: 180 }}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                />
            </a>)
        )
    }
    // 渲染导航菜单
    renderNav() {
        return  this.state.navList.map(item => (
           <Flex.Item key={item.id} 
           onClick={()=>this.props.history.push(item.path)}>
            <img src={item.img} alt='nav'></img>
            <h2>{item.name}</h2>
        </Flex.Item>
        ))

    }
    componentDidMount() {
        // simulate img loading
        this.getSwiper()
    }
    render() {
        return (
            <div className='index'>
                {/* 轮播图 */}
                <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={2000}
                >
                    {this.renderSwiper()}
                </Carousel>
                {/* 导航菜单 */}
                <Flex className='nav'>
                    {this.renderNav()}
                </Flex>
            </div>
        );
    }
}
