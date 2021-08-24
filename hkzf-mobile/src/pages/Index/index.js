import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import axios from 'axios'
// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 导入样式
import './index.scss'




export default class index extends Component {

    /**
     * 轮播图存在两个问题
     * 1.不会自动播放
     * 2.从其他路由返回的时候，高度不够
     * 
     * 原因： 轮播图是动态加载的，加载完成前后轮播图数量不一样
     * 解决方法：
     *       1.在state中添加轮播图加载完成的数据
     *      2.在轮播图数据加载完成时，修改该数据状态为true
     *      3.只有轮播图数据加载完成的情况下，才渲染轮播图组件
     *         
     */
    state = {
        swipers: [],
        isSwiper: false,
        // 导航菜单数据
        navList: [
            {
                id: 1,
                img: Nav1,
                name: '整租',
                path: '/home/list'
            },
            {
                id: 2,
                img: Nav2,
                name: '合租',
                path: '/home/list'

            },
            {
                id: 3,
                img: Nav3,
                name: '地图找房',
                path: '/map'
            },
            {
                id: 4,
                img: Nav4,
                name: '出租',
                path: '/rent'
            }
        ],
        // 租房小组数据
        housesGroups: [],
        // 最新资讯
        news: []

    }
    // 获取最新资讯
    async getNews() {
        const { data: { body } } = await axios.get('http://localhost:8080/home/news', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        this.setState({
            news: body
        })
    }
    renderNews() {
        return this.state.news.map(item => {
            return (
                <div className="news-item" key={item.id}>
                    <div className="imgwrap">
                        <img
                            className="img"
                            src={`http://localhost:8080${item.imgSrc}`}
                            alt=""
                        />
                    </div>
                    <Flex className="content" direction="column" justify="between">
                        <h3 className="title">{item.title}</h3>
                        <Flex className="info" justify="between">
                            <span>{item.from}</span>
                            <span>{item.date}</span>
                        </Flex>
                    </Flex>
                </div>
            )
        })
    }
    // 获取租房小组
    async getHouseGroup() {
        const { data: { body } } = await axios.get('http://localhost:8080/home/groups', {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0' //后期根据位置来传递这个参数
            }
        })
        this.setState({
            housesGroups: body
        })
    }
    // 渲染租房小组
    renderHouseGroup(item) {
        return (
            <Flex className="group-item" justify="around">
                <div className="desc">
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>

        )

    }


    // 获取轮播图
    async getSwiper() {
        const { data: { body } } = await axios.get('http://localhost:8080/home/swiper')
        console.log(body);
        this.setState({
            swipers: body,
            isSwiper: true
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
        return this.state.navList.map(item => (
            <Flex.Item key={item.id}
                onClick={() => this.props.history.push(item.path)}>
                <img src={item.img} alt='nav'></img>
                <h2>{item.name}</h2>
            </Flex.Item>
        ))

    }
    componentDidMount() {
        // simulate img loading
        this.getSwiper()
        this.getHouseGroup()
        this.getNews()
    }
    render() {
        return (
            <div className='index'>
                {/* 轮播图 */}
                <div className='swiper'>
                    {this.state.isSwiper ?
                        <Carousel
                            autoplay={true}
                            infinite
                            autoplayInterval={2000}
                        >
                            {this.renderSwiper()}
                        </Carousel> : ''
                    }
                    {/* 搜索框 */}
                    <Flex className='search-box'>
                        {/* 左侧白色区域 */}
                        <Flex className="search">
                            {/* 位置 */}
                            <div className="location" onClick={() => this.props.history.push('/citylist')}>
                                <span className="name">长沙</span>
                                <i className="iconfont icon-arrow" />
                            </div>

                            {/* 搜索表单 */}
                            <div className="form" onClick={() => this.props.history.push('/search')}>
                                <i className="iconfont icon-seach" />
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </Flex>
                        {/* 右侧地图图标 */}
                        <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')}/>
                    </Flex>
                </div>
                {/* 导航菜单 */}
                <Flex className='nav'>
                    {this.renderNav()}
                </Flex>

                {/* 租房小组 */}
                <div className="group">
                    <h3 className="group-title">
                        租房小组 <span className="more">更多</span>
                    </h3>
                    <Grid data={this.state.housesGroups} columnNum={2} square={false} hasLine={false} renderItem={item => this.renderHouseGroup(item)} />
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size={'md'}>{this.renderNews()}</WingBlank>
                </div>
            </div>
        );
    }
}
