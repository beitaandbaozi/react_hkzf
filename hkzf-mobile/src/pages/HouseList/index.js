import React, { Component } from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'

// 获取当前定位城市信息
const { label } = JSON.parse(localStorage.getItem('localCity'))

export default class HouseList extends Component {
    render() {
        return (
            <div>
                <Flex className={styles.header}>
                    <i className='iconfont icon-back'></i>
                    <SearchHeader cityName={label} className={styles.searchHeader}/>
                </Flex> 
            </div>
        )
    }
}
