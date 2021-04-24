var Main = {
    data() {
        return {
          input: '',
        }
      }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#inputplaceholder')
