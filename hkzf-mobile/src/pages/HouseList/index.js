import React, { Component } from 'react'
import SearchHeader from '../../components/SearchHeader'


// 获取当前定位城市信息
const { label } = JSON.parse(localStorage.getItem('localCity'))

export default class HouseList extends Component {
    render() {
        return (
            <div>
                <SearchHeader cityName={label} />
            </div>
        )
    }
}
