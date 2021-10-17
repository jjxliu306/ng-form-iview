
import Vue from 'vue'
import App from './App'   
// iview通过外部cdn导入


 // 导入组件库
import FormDesign from '../packages/index'
import '../packages/form/src/form-design.css';
// 注册组件库
Vue.use(FormDesign)
 


//Vue.config.productionTip = false

new Vue({ 
  render: h => h(App),
}).$mount('#app')
