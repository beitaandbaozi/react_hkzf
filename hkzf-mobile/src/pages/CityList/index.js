import React, { Component } from 'react'
import { NavBar,  } from 'antd-mobile';
import './index.scss'

export default class CityList extends Component {
    render() {
        return (
            // 顶部导航
            <div className='cityselect'>
                <NavBar
                    className='nav'
                    mode="light"
                    icon={<i className='iconfont icon-back' />}
                    onLeftClick={() => console.log(this.props.history.go(-1))}

                >城市选择</NavBar>
            </div>
        )
    }
}
