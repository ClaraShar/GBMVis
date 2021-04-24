$.get("data/data.json", function(data){
    var dom = document.getElementById("three_charts");
    var myChart = echarts.init(dom);
    var app = {};
    var xdataAxis = data.bins;
    var ydataAxis = data.hist;
    var areax=data.areax;
    for(i=0;i<areax.length;i++){
        areax[i]=areax[i].toFixed(2)
    }
    var areay=data.areay;
    var pdpx=data.pdpx;
    var pdpy=data.pdpy;
    var dataAxis = [];
    var minData=Math.floor(Math.min(xdataAxis));
    var maxData=Math.ceil(Math.max(xdataAxis));
    var intervalNum=2;
    // var yMax =100;
    // var dataShadow = [];
    for (var i = 0; i <= (maxData-minData)/intervalNum+1; i++) {
        dataAxis.push(minData+i*intervalNum);
    }
    option = null;
    option={
        title:{
            text: 'linear_m', //主标题文本，'\n'指定换行
            x:'center',
            textStyle:{
                color:'#FFF'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            label: {
                show: true
            }
        },
        grid:[ {
            height: '5%',
            width:'84%',
            top:'10%'
        },
        {
            height: '38%',
            width:'84%',
            top:'15%'
        },
        {
            height: '38%',
            width:'84%',
            top:'58%'
        },
        ],
        xAxis: [{
                type: 'category',
                data: pdpx,
                axisLabel: {
                    show:false,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false     //取消网格线
                },
                boundaryGap: false,
                gridIndex:0,
            },
            {
                type: 'category',
                data: areax,
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        fontSize:9,
                        lineHeight: 1, //行高
                    },
                },
                axisTick:{
                    show:false,     //刻度线
                },
                axisLine:{
                    lineStyle:{
                        color:'#FFF',
                    },
                },
                gridIndex:1,
            },
            {
                type: 'category',
                position: 'top',
                data: xdataAxis,
                axisLabel: {
                    //interval:0,
                    show:false,
                    // inside: false,
                    // textStyle: {
                    //     color: '#999'
                    // },
                    // fontSize:20
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color:'#FFF',
                    },
                },
                splitLine: {
                    show: false     //取消网格线
                },
                z: 10,
                gridIndex:2,
            },
        ],
        yAxis: [{
            type: 'value',
            splitLine: {
                show: false     //取消网格线
            },
            axisLabel: {
                show:false,
            },
            axisTick: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#FFF',
                },
            },
            gridIndex:0,
        },
        {
            type: 'value',
            splitLine: {
                show: false     //取消网格线
            },
            axisLine:{
                lineStyle:{
                    color:'#FFF',
                },
            },
            axisTick: {
                show: false
            },
            gridIndex:1,
        },
        {
            type:'value',
            axisLine:{
                lineStyle:{
                    color:'#FFF',
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show:true,
                // textStyle: {
                //     color: '#0',
                //     fontSize:20
                // }
            },
            splitLine: {
                show: false     //取消网格线
            },
            z: 10,
            inverse: true,
            gridIndex:2,
        },
    ],
    series: [{
            name: 'Pdp',
            data: pdpy,
            type: 'line',
            color:'#f9e264',
            smooth: true,
            xAxisIndex:0,
            yAxisIndex:0,
        },
        {
            name: 'Area',
            data: areay,
            type: 'line',
            color:'#f47a75',
            areaStyle: {},
            xAxisIndex:1,
            yAxisIndex:1,
        },
        {
            name: 'Histogram',
            type: 'bar',
                name:'bins',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                data: ydataAxis,
                xAxisIndex:2,
                yAxisIndex:2,
        },
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
})