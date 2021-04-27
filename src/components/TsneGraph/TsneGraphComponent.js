import React, { Component } from 'react'
import * as echarts from 'echarts'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import Hi from '../Hi/Hi'
import style from './style.css'

export default class TsneGraph extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         sid : '2906007032',
    //         // '0' : '',
    //         // '1' : '',
    //         // prob : ''
    //     }
    // }
    getOption() {
        var json = [{"sid":"2906007032","0":14.1933422089,"1":-40.0431556702,"prob":0.9179556841},{"sid":"2010032020022","0":-9.8068284988,"1":-29.9540367126,"prob":0.8802195651},{"sid":"2911102001","0":-15.7183656693,"1":-52.1439857483,"prob":0.9431284733}],
            data = [],
            groupColors = [];
        for(var i=0,l=json.length;i<l;i++){
            var e=[];
            e.push(json[i]['0']);
            e.push(json[i]['1']);
            e.push(json[i].sid);
            e.push(json[i].prob);
            data.push(e);
            groupColors.push(d3.interpolateRdYlBu(json[i].prob));
        }
        return {
            title:{
                show:true,
                text:'T-SNE',
                x:'center',
                y:'top',
                textStyle: {
                    color: '#fff',
                },
                subtextStyle: {
                    color: 'rgb(230,230,230)',
                }
            },
            tooltip: {
                //trigger: 'item',
                // axisPointer: {
                //     type: 'cross'
                // }
            },
            formatter: function (params) {
                // do some thing
                return  "sid：" +params.value[2];
            },//好像这里是悬浮显示sid的
            xAxis: {
                axisLabel: {
                    show: false
                },
                axisLine: {
                    onZero: false,    //坐标轴固定在最左方
                    lineStyle:{
                    color:'#FFF',
                 }
                },
                splitLine: {
                    show: false     //取消网格线
                },
                axisTick: {
                    show: false     //取消刻度线
                }  
            },
            yAxis: {
                axisLabel: {
                    show: false
                },
                axisLine: {
                    onZero: false,    //坐标轴固定在最下方
                    lineStyle:{
                        color:'#FFF',
                    }
                },
                    splitLine: {
                        show: false 
                    },
                    axisTick: {
                        show: false     //取消刻度线
                    }
                },
                series: [{
                    symbolSize: 5,
                    data: data,
                    type: 'scatter',
                    itemStyle:{
                        normal:{
                            color: function(params) {
                                // build a color map as your need.
                                return groupColors[params.dataIndex]
                            }
                        }
                        
                    },
                }   
            ]
        }
    }

    onClickItem = (params) => {
        console.log("params.data.sid",params)
        this.props.handleEvent(params.data[2])
    }

    render(){
        const onEvents = {
            "click": this.onClickItem
        }
        return(
            <div className="tsne">
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    onEvents={onEvents}
                />
                <Hi />
            </div>
        )
    }
}