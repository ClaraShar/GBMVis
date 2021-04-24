var dom = document.getElementById("radar");
var radarChart = echarts.init(dom);
var app = {};
var month=[' ','12_th','11_th','10_th','9_th','8_th','7_th','6_th','5_th','4_th','3_rd','2_nd','1_st']

$.get("data/table.json", function(data){
    option = null;
    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left: 'center',
            data: ['数学成绩', '图书馆(lib)', '热水(hw)'],
            textStyle: {
                color: '#fff',
            }
        },
        textStyle: {
            color:'#fff',
            fontSize:10,
        },
        radar:[
            {
                name: {
                    textStyle: {
                        color: '#fff',
                        // backgroundColor: '#999',
                        // borderRadius: 3,
                        // padding: [3, 5]
                    }
                },
                indicator: [
                    {text: 'cal1_m', max: 100},
                    {text: 'cal1_f', max: 100},
                    {text: 'linear_m', max: 100},
                    {text: 'linear_f', max: 100}
                ],
                center: ['25%', '50%'],
                radius: 100
            },{
                indicator: (function (){
                    var res = [];
                    for (var i = 1; i <= 12; i++) {
                        res.push({text: month[i], max: 100});
                    }
                    return res;
                })(),
                center: ['75%', '50%'],
                radius: 100
        }],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#f47a75',
                    borderColor: '#f47a75',
                },
                areaStyle: {
                    color: '#f47a75',
                },
                data: [
                    {
                        value: [60, 73, 85, 40],
                        name: '数学成绩'
                    }
                ]
            },{
                type: 'radar',
                areaStyle: {},
                radarIndex: 1,
                color: ['#0082fc', '#f9e264'],
                data: [
                    {
                        name: '图书馆(lib)',
                        value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0,2.3].reverse(),

                    },
                    {
                        name: '热水(hw)',
                        value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4,3.3].reverse(),
                    }
                ]
            }]
    };

    radarChart.setOption(option, true);
});


function radarChange(data){
    
    var sid=document.getElementById('inputvalue').value;
    var mark=-1;
    for(i=0;i<data.length;i++){
        if(sid===data[i].sid){
            mark=i;
            break;
        }
    }
    if(mark==-1){
        return;
    }
    radarChart.clear();
    libdata=[];
    hwdata=[];
    mdata=[];
    for(i=1;i<=12;i++){
        libdata.push(data[mark][i+"_lib"]);
        hwdata.push(data[mark][i+"_hw"]);
    }
    mdata.push(data[mark]['cal1_m'])
    mdata.push(data[mark]['cal1_f'])
    mdata.push(data[mark]['linear_m'])
    mdata.push(data[mark]['linear_f'])
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            left: 'center',
            data: ['数学成绩', '图书馆(lib)', '热水(hw)'],
            textStyle: {
                color: '#fff',
            }
        },
        textStyle: {
            color:'#fff',
            fontSize:10,
        },
        radar:[
            {
                name: {
                    textStyle: {
                        color: '#fff',
                        // backgroundColor: '#999',
                        // borderRadius: 3,
                        // padding: [3, 5]
                    }
                },
                indicator: [
                    {text: 'cal1_m', max: 100},
                    {text: 'cal1_f', max: 100},
                    {text: 'linear_m', max: 100},
                    {text: 'linear_f', max: 100}
                ],
                center: ['25%', '50%'],
                radius: 100
            },{
                indicator: (function (){
                    var res = [];
                    for (var i = 1; i <= 12; i++) {
                        res.push({text: month[i], max: 100});
                    }
                    return res;
                })(),
                center: ['75%', '50%'],
                radius: 100
        }],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#f47a75',
                    borderColor: '#f47a75',
                },
                areaStyle: {
                    color: '#f47a75',
                },
                data: [
                    {
                        value: mdata,
                        name: '数学成绩'
                    }
                ]
            },{
                type: 'radar',
                areaStyle: {},
                radarIndex: 1,
                color: ['#0082fc', '#f9e264'],
                data: [
                    {
                        name: '图书馆(lib)',
                        value: libdata.reverse(),

                    },
                    {
                        name: '热水(hw)',
                        value: hwdata.reverse(),
                    }
                ]
            }]
    };
    radarChart.setOption(option, true);
}