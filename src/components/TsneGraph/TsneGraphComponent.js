import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactEcharts from 'echarts-for-react'
import './style.css'
import RedarGraph from '../RedarGraph/RedarGraphComponent'
import InfoTable from '../InfoTable/InfoTableComponent'

export default class TsneGraph extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            groupColors: [],
            sid: "2906007032"
        }
    }

    componentDidMount() {
        fetch('/api/tsne', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                var json = res.data.data, 
                    newdata = [],
                    newgroupColors = [];
                for(var i=0,l=json.length;i<l;i++){
                    var e=[];
                    e.push(json[i]['x']);
                    e.push(json[i]['y']);
                    e.push(json[i].sid);
                    e.push(json[i].prob);
                    newdata.push(e);
                    newgroupColors.push(d3.interpolateRdYlBu(json[i].prob));
                }
                this.setState({
                    data: newdata,
                    groupColors: newgroupColors,
                })
          });
    }

    getOption = (colors) => {
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
                data: this.state.data,
                type: 'scatter',
                itemStyle:{
                    normal:{
                        color: function(params) {
                            // build a color map as your need.
                            return colors[params.dataIndex];
                        }
                    }
                },
            }]
        }
    }

    onClickItem = (params) => {
        this.setState({
            sid: params.data[2]
        })
        //点击之后state修改，传给Redargraph显示详情
    }

    render(){
        const onEvents = {
            "click": this.onClickItem
        }
        return(
            <div className="tsne">
                <ReactEcharts
                    option={this.getOption(this.state.groupColors)}
                    notMerge={true}
                    lazyUpdate={true}
                    onEvents={onEvents}
                />
                <RedarGraph value={this.state.sid}/>
            </div>
        )
    }
}