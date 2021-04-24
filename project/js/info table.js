// $.get("data/table.json", function(tabledata){
//     Data=[]
//     for(j = 0; j <10; j++){
//         Data.push(tabledata[j])
//     }
//     render(Data)
    
//     $("#searchbutton").click(function(d){
      
//     })
// })
// function render(Data){
  
//     var Main = {
     
//       data() {
//         return {
//           tableData:Data
//         }
        
//       },
//       methods:{
//         onSubmit() {
//           console.log("111")
//           var sid=document.getElementById('inputvalue').value;
      
//           for(j = 0,i=0; j <Data.length; j++){
//             if(sid===Data[j].sid){
//               this.$set(Data[j],i++,i++) 
//             }
//           }
//         },
//       },
//     }
    
    
//     var Ctor = Vue.extend(Main)
//     new Ctor().$mount('#tableinfo')
//     new Vue().$mount('#searchbutton')
// }



$.get("data/table.json", function(tabledata){
  Data=[]
  for(j = 0; j <10; j++){
      Data.push(tabledata[j])
  }
  var Main = {
      data() {
        return {
          tableData:Data
        }
        
      },
      methods:{
        onSubmit() {
          var sid=document.getElementById('inputvalue').value;
          var flag=0;
          for(i=0;i<Data.length;i++)
          {
            if(sid===Data[i].sid){
              
              flag=1;
              this.$set(this.tableData,i,Data[i]) ;
          }
          if(flag==1){
            this.tableData=undefined
            this.tableData = new Array();
            for(i=0;i<Data.length;i++)
            {
              if(sid===Data[i].sid){
                this.$set(this.tableData,i,Data[i]) ;
              }
            }
          }
        }
      },
    }
  }
  
  
  var Ctor = Vue.extend(Main)
  new Ctor().$mount('#tableinfo')



})