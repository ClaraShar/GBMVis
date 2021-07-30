import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import TsneGraph from '../TsneGraph/TsneGraphComponent'
import './style.css'

export default class RedarGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            sid: "",
            math: [],
            lib: [],
            hw: []
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.value)
        fetch('/api/getOneFeature?sid=' + newProps.value, {
            method: 'get',
            headers: {
                    'Accept': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    console.log(res.data.data)
                    var newLib = [],
                        newHw = [],
                        newMath = [];
                    for(let i = 1; i <= 12; i++){
                    newHw.push(res.data.data[i + '_hw'])
                    newLib.push(res.data.data[i + '_lib'])
                }
                newHw.reverse()
                newLib.reverse()
                newMath.push(res.data.data['cal1_f'])
                newMath.push(res.data.data['cal1_m'])
                newMath.push(res.data.data['linear_f'])
                newMath.push(res.data.data['linear_m'])
                this.setState({
                    sid: newProps.value,
                    math: newMath,
                    lib: newLib,
                    hw: newHw
                })
          });
    }

    getOption(){
        var month=[' ','12_th','11_th','10_th','9_th','8_th','7_th','6_th','5_th','4_th','3_rd','2_nd','1_st'];
        return {
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
                            res.push({text: month[i], max: 20});
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
                            value: this.state.math,
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
                            value: this.state.lib
                        },
                        {
                            name: '热水(hw)',
                            value: this.state.hw
                        }
                    ]
                }]
        }
    }

    render(){
        return(
            <div className="redar">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        )
    }
}