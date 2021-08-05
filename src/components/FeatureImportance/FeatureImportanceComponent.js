import React, { Component } from 'react'
import './style.css'
import ReactEcharts from 'echarts-for-react'
import ScatterPlot from '../ScatterPlot/ScatterPlotComponent'

export default class FeatureImportance extends Component{
    constructor(){
        super()
        this.state = {
            feature: ""
        }
    }

    getOption = () => {
        var contData = {"6_hw": 27, "11_hw": 32, "12_hw": 43, "2_hw": 44, "1_hw": 49, "5_hw": 62, "9_hw": 62, "10_hw": 67, "3_hw": 67, "7_hw": 86, "4_hw": 91, "8_hw": 94, "6_lib": 108, "12_lib": 152, "11_lib": 166, "9_lib": 203, "5_lib": 222, "7_lib": 223, "8_lib": 231, "3_lib": 266, "10_lib": 278, "1_lib": 287, "2_lib": 293, "4_lib": 330, "linear_f": 652, "cal1_f": 657, "cal1_m": 683, "linear_m": 725}
        var yname = ['6_hw','11_hw','12_hw','2_hw','1_hw', '5_hw', '9_hw', '10_hw', '3_hw', '7_hw', '4_hw', '8_hw', '6_lib', '12_lib', '11_lib', '9_lib', '5_lib', '7_lib', '8_lib','3_lib','10_lib','1_lib','2_lib','4_lib','linear_f','cal1_f','cal1_m','linear_m'];
        var ydata = []
        for(let i = 0; i < yname.length; i++){
            ydata.push(contData[yname[i]]);
        }
        return{
            title: {
                text: 'Feature Importance',
                x:'center',//居中
                y:'10',//title在y上的位置
                textStyle: {
                    // color: '#fff',
                },
                subtextStyle: {
                    color: 'rgb(230,230,230)',
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {//设置表格大小
                left: '3%',
                right: '4%',
                bottom: '30%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                // axisLine:{
                //     lineStyle:{
                //         color:'#FFF',
                //     }
                // }//注释后x轴显示数值
            },
            yAxis: {
                type: 'category',
                data: yname,
                // axisLine:{
                //     lineStyle:{
                //         color:'#000',
                //     },
                // },//改变y轴label颜色
                axisLabel:{
                    rotate: 6,//倾斜显示
                    interval: 0,//y轴全部数值显示
                    textStyle: {
                        fontSize: '10',//字体大小
                    },

                }
            },
            series: [
                {
                    name: 'feature importance',
                    type: 'bar',
                    // color: ['#0082fc'],
                    data: ydata,
                    barWidth : 10,//柱图宽度
                }
            ],
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                    start: 0, //数据窗口范围的起始百分比
                    end: 50
                },
                //滑块的属性
                {
                   type: 'inside',
                   show: true,
                   yAxisIndex: [0],
                   start: 1,//默认为1
                   end: 50,//默认为100
                },
            ]
        }
    }

    onClickItem = (params) => {
        console.log(params.name)
        this.setState({
            feature: params.name
        })
        //点击之后state修改，传给散点图
    }

    render(){
        const onEvents = {
            "click": this.onClickItem
        }

        return(
            <div className='bar'>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    onEvents={onEvents}//给条形图添加点击事件
                />
                <ScatterPlot value={this.state.feature}/>
            </div>
        )
    }
}