import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import axios from 'axios'

export default class index extends Component {
    state = {
        // 轮播图数据
        swipers: [],
    }
    // 获取轮播图
    async getSwiper() {
        const {data:{body}} = await axios.get('http://localhost:8080/home/swiper')
        console.log(body);
        this.setState({
            swipers: body
        })

    }
    // 渲染轮播图
    renderSwiper() {
        return this.state.swipers.map (item => (
            <a
                key={item.id}
                href='http://itcast.cn'
                style={{ display: 'inline-block', width: '100%', height: 212 }}
            >
                <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                />
            </a>)
        )
    }
    componentDidMount() {
        // simulate img loading
        this.getSwiper()
    }
    render() {
        return (
            <div className='index'>
                <Carousel
                    autoplay={true}
                    infinite
                    autoplayInterval={2000}
                >
                 {this.renderSwiper()}
                </Carousel>
            </div>
        );
    }
}
