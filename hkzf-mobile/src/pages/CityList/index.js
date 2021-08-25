import React, { Component } from 'react'
import { NavBar, } from 'antd-mobile';
import './index.scss'
import axios from 'axios'
import { getCurrentCity } from '../../utils/index'

// 处理获取的城市数据
function formatCityData(list) {
    // 键是首字母，值是一个数组：对应首字母的城市信息
    let cityList = {}
    list.forEach(item => {
        // 通过简写获取到第一个首字母
        let first = item.short.substr(0, 1)
        // 判断对象中是否有这个key 我们可以利用对象取值的第二种方式 中括号的方式
        if (cityList[first]) {
            // 如果进入if 代表有这个值，我们只需要直接push进去
            cityList[first].push(item)
        } else {
            // 如果进入else 代表没有这个值，我们初始化这个属性，并且把当前数据设置进去
            cityList[first] = [item]
        }
    })
    // 接下来我们需要把 cityList里面所有的key取出来，放在数组中，充当城市列表右侧的首字母导航条
    let cityIndex = Object.keys(cityList).sort()
    return {
        cityList,
        cityIndex
    }
}
export default class CityList extends Component {

    // 获取城市列表
    async getCityList() {
        const { data: { body } } = await axios.get('http://localhost:8080/area/city?level=1')
        let { cityList, cityIndex } = formatCityData(body)
        console.log(cityList, cityIndex);

        /**
         * 获取热门城市数据
         * 
         */
        const { data: { body: hotCitys } } = await axios.get('http://localhost:8080/area/hot')
        // console.log(hotCitys);
        cityList['host'] = hotCitys
        cityIndex.unshift('hot')

        // 获取当前定位的城市
        const currentCity = await getCurrentCity()
    
        console.log(cityList, cityIndex,currentCity);
    }
    componentDidMount() {
        this.getCityList()
    }
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
