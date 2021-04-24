var dom = document.getElementById("sun");
var myChart = echarts.init(dom);
var app = {};
var color=d3.scaleOrdinal(d3.schemeCategory10);
var option;

var data = [{
    "name": "TP",
    "children": [{
        "name": "2009",
        "value": 209,
        "rate":289/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f8cb7f',
        }
        
    }, {
        "name": "2010",
        "value": 107,
        "rate":107/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f8cb7f',
        }
        
    }
    ],
        "rate":316.0/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f8cb7f',
        }
}, {
    "name": "FN",
    "children": [{
        "name": "2009",
        "value": 34,
        "rate":34/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f47a75',
        }
    }, {
        "name": "2010",
        "value": 63,
        "rate":63/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f47a75',
        }
    }
    ],
        "rate":97.0/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#f47a75',
        }
}, {
    "name": "TN",

    "children": [{
        "name": "2009",
        "value": 608,
        "rate":688/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#09b0d3',
        }
    }, {
        "name": "2010",
        "value": 771,
        "rate":771/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#09b0d3',
        }
    }
    ],
        "rate":(608.0+771.0)/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#09b0d3',
        }
}, {
    "name": "FP",

    "children": [{
        "name": "2009",
        "value": 51,
        "rate":51.0/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#0082fc',
        }
 
    }, {
        "name": "2010",
        "value": 38,
        "rate":38.0/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#0082fc',
        }
    }
    ],
        "rate":89.0/(209+107+34+63+608+771+51+38),
        itemStyle:{
            color:'#0082fc',
        }
}];
option = {
    tooltip:{
        trigger:'item',
    },
    series: {
        type: 'sunburst',
        data: data,
        radius: [0, '90%'],
        label: {
            rotate: 'radial'
        }
    },
    formatter: function (params) {
            console.log(params)
            // do some thing
            //return  "value：" +params.value[2]+'<br>'+"比例：+";
            let listItem='<i style="display: inline-block;width: 10px;height: 10px;background:'+params.color+';margin-right: 5px;border-radius: 50%;}"></i>';
            console.log(params.treePathInfo.length);
            if(params.treePathInfo.length!=3){
                listItem=listItem+params.name+'<br>value：' +params.value+'<br>'+"比例："+params.data.rate.toFixed(2)*100+"%";
            }
            else{
                listItem=listItem+params.treePathInfo[1].name+'-'+params.treePathInfo[2].name+'<br>value：' +params.value+'<br>'+"比例："+params.data.rate.toFixed(2)*100+"%";
            }
            return listItem;
        },
};


if (option && typeof option === 'object') {
    myChart.setOption(option);
}