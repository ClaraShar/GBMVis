import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'

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
                text: 'Confusion Scatter Plot'
            },
            legend: {
                right: 10,
                data: ['TP','TN','FP','FN'],
                textStyle:{
                    color:'#FFF',
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
                        color:'#FFF',
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
                        color:'#FFF',
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
                            color:'#FFF',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    //     offset: 0,
                    //     color: 'rgb(251, 118, 123)'
                    // }, {
                    //     offset: 1,
                    //     color: 'rgb(204, 46, 72)'
                    // }])
                }
            },{
                name: 'TN',
                data: this.state.TNData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#FFF',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                // itemStyle: {
                //     shadowBlur: 10,
                //     shadowColor: 'rgba(25, 100, 150, 0.5)',
                //     shadowOffsetY: 5,
                //     color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                //         offset: 0,
                //         color: 'rgb(129, 227, 238)'
                //     }, {
                //         offset: 1,
                //         color: 'rgb(25, 183, 207)'
                //     }])
                // }
            },{
                name: 'FP',
                data: this.state.FPData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#FFF',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                // itemStyle: {
                //     shadowBlur: 10,
                //     shadowColor: 'rgba(174, 181, 36, 0.5)',
                //     shadowOffsetY: 5,
                //     color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                //         offset: 0,
                //         color: 'rgb(193, 201, 38)'
                //     }, {
                //         offset: 1,
                //         color: 'rgb(510, 219, 44)'
                //     }])
                // }
            },
            {
                name: 'FN',
                data: this.state.FNData,
                type: 'scatter',
                emphasis: {
                    label: {
                        show: true,
                        textStyle:{
                            color:'#FFF',
                        },
                        formatter: function (param) {
                            return "sid： "+param.data[2];
                        },
                        position: 'top'
                    }
                },
                // itemStyle: {
                //     shadowBlur: 10,
                //     shadowColor: 'rgba(171, 43, 194, 0.5)',
                //     shadowOffsetY: 5,
                //     color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                //         offset: 0,
                //         color: 'rgb(189, 47, 214)'
                //     }, {
                //         offset: 1,
                //         color: 'rgb(205, 49, 232)'
                //     }])
                // }
            }
        ]
        };
    }

    render(){
        return(
            <div className="scatter">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        )
    }
}