import React, { Component } from 'react'
import './style.css'
import ReactEcharts from 'echarts-for-react'
import 'echarts/lib/component/parallel'
import HeatMap from '../HeatMap/HeatMapComponent'

export default class FeatureImportance extends Component{
    constructor(){
        super()
        this.state = {
            dataSource: [],
            selected: []
        }
    }

    componentDidMount() {
        let myChart = this.echarts && this.echarts.getEchartsInstance(); 
        this.echarts_instance = this.echarts_react.getEchartsInstance()
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
        fetch('/api/featuresNormalized', {
          method: 'get',
          headers: {
                  'Accept': 'application/json',
              },
          }).then(res => res.json())
              .then(res => {
                var newData = []
                res.data.data.map(((item) => {
                //   要再加一个prob，表示颜色
                  let tmp = [item['1_lib'],item['2_lib'],item['3_lib'],item['4_lib'],item['5_lib'],item['6_lib'],item['7_lib'],item['8_lib'],item['9_lib'],item['10_lib'],item['11_lib'],item['12_lib'],item['1_hw'],item['2_hw'],item['3_hw'],item['4_hw'],item['5_hw'],item['6_hw'],item['7_hw'],item['8_hw'],item['9_hw'],item['10_hw'],item['11_hw'],item['12_hw'],item['cal1_m'],item['cal1_f'],item['linear_m'],item['linear_f'],item.sid]
                  newData.push(tmp)
              }))
              this.setState({
                  dataSource: newData
              })
        });
      }

    getOption = () => {
        var schema = []//刻度
        var i = 0;
        for(let j = 0; j < 12; j++, i++){
            schema.push({name: j + 1 + '_lib', index: i, text: j + 1 + '_lib'})
        }
        for(let j = 0; j < 12; j++, i++){
            schema.push({name: j + 1 + '_hw', index: i, text: j + 1 + '_hw'})
        }
        schema.push({name: 'cal1_m', index: i++, text: 'cal1_m'})
        schema.push({name: 'cal1_f', index: i++, text: 'cal1_f'})
        schema.push({name: 'linear_m', index: i++, text: 'linear_m'})
        schema.push({name: 'linear_f', index: i++, text: 'linear_f'})
        
        var lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };

        var parallelAxis = []
        for(let i = 0; i < 24; i++){
            parallelAxis.push({dim: i, name: schema[i].text, max:1})//注意数组越界问题
        }
        for(let i = 24; i < 28; i++){
            parallelAxis.push({dim: i, name: schema[i].text, max:100})//注意数组越界问题
        }

        return{
            backgroundColor: '#333',
            legend: {
                bottom: 30,
                itemGap: 20,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            },
            tooltip: {
                padding: 10,
                // backgroundColor: '#222',
                backgroundColor: "rgba(255,255,255,0.6)", //设置背景图片 rgba格式
                borderColor: '#777',
                borderWidth: 1,
                formatter(params) {
                    return "sid:" + params.value[28]//鼠标悬浮显示sid
                },
                textStyle: {
                    color: "black" //设置文字颜色
                },
            },
            // dataZoom: {
            //     show: true,
            //     orient: 'vertical',
            //     parallelAxisIndex: [0]
            // },
            parallelAxis: parallelAxis,
            //等筛选了数据之后看如何加颜色
            // visualMap: {
            //     show: true,
            //     min: 0,
            //     max: 1,
            //     dimension: 2,
            //     inRange: {
            //         color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
            //         // colorAlpha: [0, 1]
            //     }
            // },
            parallel: {
                left: '5%',
                right: '8%',
                // bottom: 100,
                parallelAxisDefault: {//默认的刻度
                    type: 'value',
                    name: 'feature distribution',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aaa'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#777'
                        }
                    },//刻度变暗
                    nameRotate: 30,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff'
                    }//label数值颜色
                }
            },
            series: [
                {
                    // name: '北京',
                    type: 'parallel',
                    lineStyle: lineStyle,
                    // smooth: true,
                    // blendMode: 'lighter',
                    data: this.state.dataSource
                }
            ]
        }
    }

    onAxisAreaSelected = () => {
        var series0 = this.echarts_instance.getModel().getSeries()[0];
        var indices0 = series0.getRawIndicesByActiveState('active');//刷选出来的dataSource中的序号列表，从0开始计数
        var selectedData = []
        for(let i = 0; i < indices0.length; i++){
            selectedData.push(this.state.dataSource[indices0[i]])
        }
        // 选中的所有数据都传过来
        // this.setState({
        //     selected: selectedData
        // })//这里有问题，会报错
    }

    render(){
        const onEvents = {
            "axisareaselected": this.onAxisAreaSelected
        }

        return(
            <div className='parallel'>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    ref={(e) => { this.echarts_react = e;}} style={{width:1500,height:500}}
                    onEvents={onEvents}
                />
                {/* <HeatMap value={this.state.selected}/> */}
            </div>
        )
    }
}