<template>
  <div id="app"> 
    <Tabs v-model="activeName"  name="app" style="padding: 20px;" @on-click="changeTab">
        <TabPane label="表单绘制" name="first" tab="app">
            <ng-form-design ref="formDesign" :custom-components="customComponents" :config="formConfig">
                <template slot="controlButton" >
                    <Button   type="text" size="medium"  @click="initDemo(1)">示例1</Button>
                    <Button   type="text" size="medium"  @click="initDemo(2)">示例2</Button>
                    <Button   type="text" size="medium"  @click="initDemo(3)">示例3</Button>
                </template>
                <!-- 自定义属性配置 -->
                <template slot="custom-properties" slot-scope="{selectItem}"> 
                     <Properties :selectItem="selectItem"/>
                </template> 
                <template  slot="formName">
                    <span> ng-form-iview 示例 </span>
                </template> 
            </ng-form-design> 
        </TabPane>
        <TabPane label="表单查看" name="second" tab="app" >
          <Alert  type="warning">
            测试表单预览
          </Alert>
          <ng-form-build class="form-app-preview" ref="formbuild" :formTemplate="formTemplate" :models="models" :custom-components="customComponents" :config="formConfig"/>

          <Button  class="preview-button" type="primary" size="mini"  @click="validator()">验证</Button>
          <Button  class="preview-button" type="primary" size="mini"  @click="getData()">获取数据</Button>
        </TabPane> 
      </Tabs>

  
  </div>
</template>

<script>
import CustomT from './components/TCustom'
import Properties from './components/properties'
export default {
  name: 'App',
  components: {CustomT , Properties},
  data(){
    return {
     
      activeName: 'first',
      models: {} ,
      formTemplate: {} ,
      formConfig: {
        httpConfig: (config)=>{
          config.headers['aaaa'] = 'bbbb'
          return config 
        }
      },
      customComponents: [
        { 
          type: 'customT' ,
          label: "自定义图片展示", // 标题文字 
          component: CustomT ,
          options: {
            style: 'width:100px;height:100px'
          },
          model: "DDD",
          key: "DDD",
          rules: [
            {
              required: false,
              message: "必填项"
            }
          ]
        },
      ]
    }
  } ,

  created() {
   // this.formTemplate = require('./data/basic.json')
  },
  methods: {
    initDemo(index){
        let json = null 
        if(index == 1) {
            json = require('./data/basic.json')
        } else if(index == 2) {
            json = require('./data/tablebatch.json')
        } if(index == 3) {
            json = require('./data/validator1.json')
        } 

        if(json) {
            this.$refs.formDesign.initModel(json)

            this.formTemplate = json
        }

    },
    validator() {
      this.$refs.formbuild.validator().then((valid)=>{
        if(valid){
          this.$message.info('验证通过')
        } else {
          this.$message.error('验证不通过')
        }
      })
    },
    changeTab(v) {
      console.log('v' , v)
      if(v && v == 'second') {
       
        this.formTemplate =  this.$refs.formDesign.getModel()

        console.log('formTemplate' , this.formTemplate)
        const list = this.formTemplate.list 
        if(list) {
          const templateModels = list.map(t=>t.model)
          for(let i in this.models) {
            if(!templateModels.includes(i)) {
              delete this.models[i]
            }
          }
         // 2021-04-06 顺带重置models 将
        }
        //this.models = {}
      } 
    },
    getData() {
      this.$refs.formbuild.getData().then((data)=>{
        console.log('data' , data)
      })
    }
  }
}
</script>

<style>
#app {
    height: 100%;
    width: 100%;
    position: absolute;
}



body{
    height: 100%;
    width: 100%;
    overflow: auto;
    /* position: relative; */
    position: absolute;
    margin: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-variant: tabular-nums;
    line-height: 1.5;
    background-color: #fff;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
 
}

.form-app-preview {
  height: auto!important;
}

.preview-button {
  margin: 10px;
}

</style>
