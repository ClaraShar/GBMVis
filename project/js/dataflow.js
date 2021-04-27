var id=0;
var node=[]
var edge=[]
var g;
var dir=['LR','TB'];
var btnswitch=0;
var cellheight=[70,100];
var cellwidth=[450,150];
var tip=["cal1_f","cal1_m","linear_f","linear_m","1_hw","1_lib","2_lib","2_hw"
,"3_lib","3_hw","4_lib","4_hw","5_lib","5_hw","6_lib","6_hw","7_lib","7_hw","8_lib","8_hw",
"9_lib","9_hw","10_lib","10_hw","11_lib","11_hw","12_lib","12_hw"]
var color=["#FFB6C1","#C71585","#FF00FF","#9400D3","#4B0082","#6A5ACD","#0000FF"
,"#87CEFA","#48D1CC","#00FA9A","#00FF00","#ADFF2F","#FFFF00","#F0E68C",
"#DAA520","#FFA500","#FF4500","#E9967A","#FA8072","#B22222","#FFEFD5",
"#F0E68C","#006400","#008000","#40E0D0","#008080","#2F4F4F","#1E90FF"];
function traverse(obj,flag){
    tipcolor="#87CEFA";
    if(obj.label.includes("leaf")){
        
        NODE={
            id: id,
            label: obj.label,
            shape: "ellipse",
            name:obj.id,
            color:tipcolor
        }
    }
    else{
        for(i=0;i<tip.length;i++){
            console.log(tip[i])
            console.log(obj.label)
            if(obj.label.includes(tip[i])){
                tipcolor=color[i];
                console.log(tipcolor)
            }
        }
        NODE={
            id: id,
            label: obj.label,
            shape: "rect",
            name:obj.id,
            color:tipcolor
        }
    }
    
    node.push(NODE);
    if(!obj.children){
        return 
    }
    for(var i in obj.children){ 
        id=id+1;
        EDGE={
               start: flag, end: id, option: {}
        }
        edge.push(EDGE);
        traverse(obj.children[i],id)
    }
};
$.get("data/TreeData.json", function(data){
    traverse(data,id);
    switchController();
    render();
})

function switchController(){
    var Main = {
        methods:{
          onSwitch() {
            btnswitch=(btnswitch+1)%2;
            render();
        },
      }
    }
    
    var Ctor = Vue.extend(Main)
    new Ctor().$mount('#switch');
    new Ctor().$mount('#dataflowbtn');

}


function render(){
    g = new dagreD3.graphlib.Graph()
    .setGraph({
        rankdir:dir[btnswitch]
    })
    .setDefaultEdgeLabel(function () { return {}; });
    for (let i in node) { //画点
        
    let el = node[i]
    g.setNode(i, {
        width:cellwidth[btnswitch], //节点长度
        height:cellheight[btnswitch],//结点宽度
        id: el.id,
        shape:el.shape,
        label: el.label,
        style: "fill:"+el.color+";stroke:#333;stroke-width:1.5px"//节点样式
    });
    }
    
    for (let i in edge) { // 画连线
    let el = edge[i]
    g.setEdge(el.start, el.end, {
        style: "stroke: #fff; fill: none;",
        arrowheadStyle: "fill: #fff;stroke: #fff;",
        arrowhead: 'vee'
    });
    }
    console.log(g)
    var render = new dagreD3.render();
    var svg = d3.select("#dataflow"); //声明节点
    svg.select("g").remove(); //删除以前的节点，清空画面
    var svgGroup = svg.append("g");
    var inner = svg.select("g");
    var zoom = d3.zoom().on("zoom", function () { //添加鼠标滚轮放大缩小事件
      inner.attr("transform", d3.event.transform);
    });
    svg.call(zoom);
    render(d3.select("svg g"), g); //渲染节点
    let max = svg._groups[0][0].clientWidth>svg._groups[0][0].clientHeight?svg._groups[0][0].clientWidth:svg._groups[0][0].clientHeight;
    var initialScale = max/779; //initialScale元素放大倍数，随着父元素宽高发生变化时改变初始渲染大小
    var tWidth = (svg._groups[0][0].clientWidth  - g.graph().width * initialScale) / 2; //水平居中
    var tHeight = (svg._groups[0][0].clientHeight  - g.graph().height * initialScale) / 2; //垂直居中
    svg.call(zoom.transform, d3.zoomIdentity.translate(tWidth, tHeight).scale(initialScale)); //元素水平垂直居中

}
