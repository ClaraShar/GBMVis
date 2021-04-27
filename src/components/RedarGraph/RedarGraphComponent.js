import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import style from './style.css'

export default class RedarGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            sid: "2906007032"
        }
    }

    getOption(){
        var month=[' ','12_th','11_th','10_th','9_th','8_th','7_th','6_th','5_th','4_th','3_rd','2_nd','1_st'],
            data = [
                {"_id":{"$oid":"600ebaeb553e218005daccdc"},"10_hw":1.0,"10_lib":3.0,"11_hw":0.0,"11_lib":0.0,"12_hw":0.0,"12_lib":0.0,"1_hw":0.0,"1_lib":1.0,"2_hw":0.0,"2_lib":2.0,"3_hw":1.0,"3_lib":0.0,"4_hw":0.0,"4_lib":2.0,"5_hw":0.0,"5_lib":16.0,"6_hw":0.0,"6_lib":1.0,"7_hw":5.0,"7_lib":1.0,"8_hw":1.0,"8_lib":3.0,"9_hw":0.0,"9_lib":1.0,"cal1_f":95.0,"cal1_m":90.0,"linear_f":92.0,"linear_m":81.0,"sid":"2911102001"},{"_id":{"$oid":"600ebaeb553e218005daccdb"},"10_hw":0.0,"10_lib":18.0,"11_hw":0.0,"11_lib":6.0,"12_hw":0.0,"12_lib":5.0,"1_hw":0.0,"1_lib":13.0,"2_hw":0.0,"2_lib":8.0,"3_hw":0.0,"3_lib":9.0,"4_hw":5.0,"4_lib":7.0,"5_hw":0.0,"5_lib":4.0,"6_hw":1.0,"6_lib":1.0,"7_hw":0.0,"7_lib":10.0,"8_hw":0.0,"8_lib":19.0,"9_hw":1.0,"9_lib":11.0,"cal1_f":76.0,"cal1_m":84.0,"linear_f":88.0,"linear_m":75.0,"sid":"2010032020022"},{"_id":{"$oid":"600ebaeb553e218005daccde"},"10_hw":0.0,"10_lib":0.0,"11_hw":0.0,"11_lib":0.0,"12_hw":0.0,"12_lib":8.0,"1_hw":0.0,"1_lib":0.0,"2_hw":0.0,"2_lib":0.0,"3_hw":0.0,"3_lib":0.0,"4_hw":0.0,"4_lib":0.0,"5_hw":0.0,"5_lib":0.0,"6_hw":0.0,"6_lib":0.0,"7_hw":0.0,"7_lib":0.0,"8_hw":0.0,"8_lib":0.0,"9_hw":0.0,"9_lib":0.0,"cal1_f":93.0,"cal1_m":86.0,"linear_f":88.0,"linear_m":68.0,"sid":"2906007032"}],
            index = data.map(x => x.sid).indexOf(this.state.sid)
        console.log(index);
        return{
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'center',
                data: ['数学成绩', '图书馆(lib)', '热水(hw)'],
                textStyle: {
                    color: '#000',
                }
            },
            textStyle: {
                color:'#000',
                fontSize:10,
            },
            radar:[
                {
                    name: {
                        textStyle: {
                            color: '#000',
                            // backgroundColor: '#999',
                            // borderRadius: 3,
                            // padding: [3, 5]
                        }
                    },
                    indicator: [
                        {text: 'cal1_m', max: 100},
                        {text: 'cal1_f', max: 100},
                        {text: 'linear_m', max: 100},
                        {text: 'linear_f', max: 100}
                    ],
                    center: ['25%', '50%'],
                    radius: 100
                },{
                    indicator: (function (){
                        var res = [];
                        for (var i = 1; i <= 12; i++) {
                            res.push({text: month[i], max: 100});
                        }
                        return res;
                    })(),
                    center: ['75%', '50%'],
                    radius: 100
            }],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                        color: '#f47a75',
                        borderColor: '#f47a75',
                    },
                    areaStyle: {
                        color: '#f47a75',
                    },
                    data: [
                        {
                            value: [data[index].cal1_m, data[index].cal1_f, data[index].linear_m, data[index].linear_f],
                            name: '数学成绩'
                        }
                    ]
                },{
                    type: 'radar',
                    areaStyle: {},
                    radarIndex: 1,
                    color: ['#0082fc', '#f9e264'],
                    data: [
                        {
                            name: '图书馆(lib)',
                            value: [data[index]['1_lib'], 115.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0,2.3].reverse(),
    
                        },
                        {
                            name: '热水(hw)',
                            value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4,3.3].reverse(),
                        }
                    ]
                }]
        }
    }

    handleRedarChange = (sid) => {
        this.setState({
            sid: sid
        })
        console.log("this.state.sid",this.state.sid)
    }

    render(){
        return(
            <div className="redar">
                <TsneGraph handleEvent={this.handleRedarChange} />
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        )
    }
}