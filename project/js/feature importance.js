new Ctor().$mount('#feature');
$.get("data/data.json", function(data){
    var dom = document.getElementById("feature importance");
    var myChart = echarts.init(dom);
    var app ={};
    var yname= ['6_hw','11_hw','12_hw','2_hw','1_hw', '5_hw', '9_hw', '10_hw', '3_hw', '7_hw', '4_hw', '8_hw', '6_lib', '12_lib', '11_lib', '9_lib', '5_lib', '7_lib', '8_lib','3_lib','10_lib','1_lib','2_lib','4_lib','linear_f','cal1_f','cal1_m','linear_m'];
    var ydata=[]
    for(i=0;i<yname.length;i++){
        ydata.push(data[yname[i]]);
    }
    option = null;
    option = {
        title: {
            text: 'Feature importances',
            x:'center',
            y:'10',
            textStyle: {
                color: '#fff',
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
        // grid: {//设置表格大小
        //     left: '3%',
        //     right: '4%',
        //     bottom: '30%',
        //     containLabel: true
        // },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine:{
                lineStyle:{
                    color:'#FFF',
                }
            }
        },
        yAxis: {
            type: 'category',
            data: yname,
            axisLine:{
                lineStyle:{
                    color:'#FFF',
                },
            },
            axisLabel:{
                interval:0//y轴全部数值显示
            }
        },
        series: [
            {
                name: 'feature importance',
                type: 'bar',
                color: ['#0082fc'],
                data:ydata
            }
        ]
    };
    ;
    myChart.setOption(option, true);
})

