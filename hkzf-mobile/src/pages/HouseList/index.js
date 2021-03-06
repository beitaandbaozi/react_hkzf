import React, { Component } from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
// 引入筛选组件
import Filter from './components/Filter'

// 获取当前定位城市信息
const { label } = JSON.parse(localStorage.getItem('localCity'))

export default class HouseList extends Component {
    render() {
        return (
            <div>
                <Flex className={styles.header}>
                    <i className='iconfont icon-back' onClick={()=> this.props.history.go(-1)}></i>
                    <SearchHeader cityName={label} className={styles.searchHeader}/>
                </Flex> 

                <Filter />
            </div>
        )
    }
}
