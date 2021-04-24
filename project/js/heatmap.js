var dom = document.getElementById("heatmap");
var myChart = echarts.init(dom);
var app = {};
option = null;
var hours = ['0', '1'];
var days = ['0', '1'];

var data = [[0,0,17],[0,1,616],[1,0,475],[1,1,860]];
var data1 = [[0,0,79],[0,1,1001],[1,0,413],[1,1,475]];
var data2 = [[0,0,143],[0,1,1248],[1,0,349],[1,1,228]];
var data3 = [[0,0,224],[0,1,1385],[1,0,268],[1,1,91]];
var data4 = [[0,0,264],[0,1,1420],[1,0,228],[1,1,56]];
var data5 = [[0,0,319],[0,1,1450],[1,0,173],[1,1,26]];
var data6 = [[0,0,377],[0,1,1468],[1,0,115],[1,1,8]];
var data7 = [[0,0,422],[0,1,1473],[1,0,70],[1,1,3]];
var data8 = [[0,0,485],[0,1,1475],[1,0,7],[1,1,1]];

data = data.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data1 = data1.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data2 = data2.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data3 = data3.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data4 = data4.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data5 = data5.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data6 = data6.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data7 = data7.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
data8 = data8.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});

option = {
    title:[{
        text:'Threshold>=0.1',
        left:"25%",
        textAlign: 'center',
        x:'center',
    },
    {
        text:'Threshold>=0.2',
        left:"55%",
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.3',
        left:"85%",
        textAlign: 'center',
        textStyle:{
            color:'#2894FF'
        }
    },
    {
        text:'Threshold>=0.4',
        left:"25%",
        top:'33%',
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.5',
        left:"55%",
        top:'33%',
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.6',
        left:"85%",
        top:'33%',
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.6',
        left:"25%",
        top:'66%',
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.6',
        left:"55%",
        top:'66%',
        textAlign: 'center',
    },
    {
        text:'Threshold>=0.6',
        left:"85%",
        top:'66%',
        textAlign: 'center',
    },
],
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid:[ {
        height: '20%',
        width:'20%',
        left: '15%',
        top:'8%'
    },
    {
        height: '20%',
        width:'20%',
        left: '46%',
        top:'8%'
    },
    {
        height: '20%',
        width:'20%',
        left: '76%',
        top:'8%'
    },
    {
        height: '20%',
        width:'20%',
        left: '15%',
        top:'40%'
    },
    {
        height: '20%',
        width:'20%',
        left: '46%',
        top:'40%'
    },
    {
        height: '20%',
        width:'20%',
        left: '76%',
        top: '40%',
    },
    {
        height: '20%',
        width:'20%',
        left: '15%',
        top: '72%',
    },
    {
        height: '20%',
        width:'20%',
        left: '46%',
        top: '72%',
    },
    {
        height: '20%',
        width:'20%',
        left: '76%',
        top: '72%',
    },
],
    xAxis: [{
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:0,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:1,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:2,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:3,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:4,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:5,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:6,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:7,
    },
    {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        },
        gridIndex:8,
    },
],
    yAxis: [{
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:0,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:1,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:2,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:3,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:4,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:5,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:6,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:7,
    },
    {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        },
        gridIndex:8,
    },
],
    visualMap: [{
        show: false,
        min: 0,
        max: 1500,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        gridIndex:0,
        inRange:{
            color: ['#CECEFF','#000079']
        }
    },
    
],
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        xAxisIndex:0,
        yAxisIndex:0,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data1,
        xAxisIndex:1,
        yAxisIndex:1,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data2,
        xAxisIndex:2,
        yAxisIndex:2,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data3,
        xAxisIndex:3,
        yAxisIndex:3,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data4,
        xAxisIndex:4,
        yAxisIndex:4,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data5,
        xAxisIndex:5,
        yAxisIndex:5,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data6,
        xAxisIndex:6,
        yAxisIndex:6,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data7,
        xAxisIndex:7,
        yAxisIndex:7,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
    {
        name: 'Punch Card',
        type: 'heatmap',
        data: data8,
        xAxisIndex:8,
        yAxisIndex:8,
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    },
]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}