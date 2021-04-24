var dom = document.getElementById("tsne");
var tsneChart = echarts.init(dom);
var app = {};
$.get("data/All.json", function(json){
    
    option = null;
    var data=[];
    var groupColors=[];
    for(var i=0,l=json.length;i<l;i++){
        e=[];
        e.push(json[i]['0']);
        e.push(json[i]['1']);
        e.push(json[i].sid);
        e.push(json[i].prob);
        data.push(e);
        groupColors.push(d3.interpolateRdYlBu(json[i].prob));
    }

    option = {
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
         },
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
    };
    tsneChart.setOption(option, true);
});
function tsneChange(data){
    option = null;
    var data=[];
    var groupColors=[];
    var sid=document.getElementById('inputvalue').value;
    var mark=-1;
    for(var i=0,l=json.length;i<l;i++){
        if(sid===json[i].sid){
            mark=i;
        }

    }
    
    option = {
        title:{
            show:true,
            text:'All',
            subtext:'T-SNE',
            x:'center',
            y:'top'
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
         },
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
            },
            
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
    };
}
