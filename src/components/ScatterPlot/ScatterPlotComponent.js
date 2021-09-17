import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import './style.css'
import * as echarts from 'echarts' 

export default class ScatterPlot extends Component{
    constructor(props){
        super(props)
        this.state = {
            feature: "cal1_f",
            TNData: [],
            FNData: [],
            FPData: [],
            TPData: []
        }
    }

    componentDidMount() {
        let myChart = this.echarts && this.echarts.getEchartsInstance(); 
        //拿到实例后 通过getEchartsInstance()，在EchartsReactCore里ECharts实例
        //注意EchartsReactCore实例和ECharts实例的区别 下面附上图片
        //监听窗口onresize变化  这里有两种写法 推荐使用addEventListener写法 第一种方法绑定多个resize事件 会被覆盖
        //这里只是简写 这里可以把函数提出来
        //window.onresize = ()=> {
        // myChart&&myChart.resize();
        // };
        window.addEventListener('resize',()=>{
          myChart && myChart.resize();
        })
      }

    componentWillReceiveProps(newProps) {
        console.log(newProps.value)
        fetch('/api/getAllConfusionFeature?feature=' + newProps.value, {
            method: 'get',
            headers: {
                    'Accept': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    var newTNData = res.data.data[0],
                        newFNData = res.data.data[1],
                        newFPData = res.data.data[2],
                        newTPData = res.data.data[3];
                    //翻转FN和TP
                    newFNData.map((item) => {
                        console.log(item)
                        item[1] = 1 - item[1];
                    })
                    newTPData.map((item) => {
                        console.log(item)
                        item[1] = 1 - item[1];
                    })
                    this.setState({
                        feature: newProps.value,
                        TNData: newTNData,
                        FNData: newFNData,
                        FPData: newFPData,
                        TPData: newTPData
                    })
          });
    }

    getOption = () => {
        return {
            // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            //     offset: 0,
            //     color: '#f7f8fa'
            // }, {
            //     offset: 1,
            //     color: '#cdd0d5'
            // }]),
            title: {
                text: 'Confusion Scatter Plot',
                x:'center',//居中
            },
            legend: {
                right: 10,
                data: ['TP','TN','FP','FN'],
                textStyle:{
                    color:'#000',
                },
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#000',
                    },
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#000',
                    },
                },
                scale: true
            },
            series: [{
                name: 'TP',
                data: this.state.TPData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#000',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'//鼠标悬浮在点上，sid显示在点的上方
                    }
                },
                //样式改成气泡那种，有点气泡，透明渐变的感觉
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    // 暴力解决，跳过类型检查，避免报错
                    // @ts-ignore
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(250,128,114)'
                    }, {
                        offset: 1,
                        color: 'rgb(255,69,0)'
                    }])
                }
            },{
                name: 'TN',
                data: this.state.TNData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#000',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    // @ts-ignore
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(191,239,255)'
                    }, {
                        offset: 1,
                        color: 'rgb(0,191,255)'
                    }])
                }
            },{
                name: 'FP',
                data: this.state.FPData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#000',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(174, 181, 36, 0.5)',
                    shadowOffsetY: 5,
                    // @ts-ignore
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(255,255,0)'
                    }, {
                        offset: 1,
                        color: 'rgb(255,215,0)'
                    }])
                }
            },
            {
                name: 'FN',
                data: this.state.FNData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#000',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(171, 43, 194, 0.5)',
                    shadowOffsetY: 5,
                    // @ts-ignore
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(118,238,0)'
                    }, {
                        offset: 1,
                        color: 'rgb(102,205,0)'
                    }])
                }
            }
        ]
        };
    }

    render(){
        return(
            // <div className="scatter">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    ref={(e) => { this.echarts = e;}} style={{width:'100%',height:'600px'}}
                />
            // </div>
        )
    }
}