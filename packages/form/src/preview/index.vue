<template>
  <Modal
    title="预览"
    id="ng-preview"
    v-model="visible" 
    style="top:20px;"
    :append-to-body="true"
    class="design-preview"
    :destroy-on-close="true"
    :width="`${previewWidth}px`"
  > 

    <div class="item-main">
      <FormBuild  :custom-components="customComponents"   :config="ngConfig"  :formTemplate="jsonData" :models="models" ref="formBuild" />
     
    </div> 
    <span slot="footer" class="dialog-footer">
      <Button @click="visible = false">取 消</Button>
      <Button @click="handleGetData">获取数据</Button> 
      <Button @click="handleRender">渲染</Button>
       <Button @click="handleValidator">验证</Button>
      <Button  type="primary" @click="visible = false">确 定</Button>
    </span>
    <PreviewCode ref="previewCode" />
    <renderPreview ref="renderPreview" v-if="renderVisisble"/> 
  </Modal>
</template>
<script> 
import FormBuild from '../form-build/index'
import PreviewCode from "./preview-code";

import renderPreview from "./render";
export default {
  name: "FormPreview",
  data() {
    return {
      visible: false,
      renderVisisble: false,
      previewWidth: 850,
      models:{},
      jsonData: {}
    };
  },
  components: {
    PreviewCode,FormBuild,renderPreview
  },
  inject: {
    customComponents: {
      from: 'customC',
      default: ()=>[]
    },
    ngConfig: {
      from: 'ngConfigC',
      default: ()=>({})
    } 
  },
  methods: {
    init(data) {
      this.visible = true
      this.jsonData = data

      // 重置表单
      this.$nextTick(()=>{
        this.$refs.formBuild.reset()
      }) 
     
    },
    handleGetData() {
      this.$refs.formBuild.getData()
        .then(res => { 
          this.$refs.previewCode.init(res) 
        })
        .catch(err => {
          console.log(err, "获取数据失败");
        });
    },
    handleValidator(){
   
       this.$refs.formBuild.getData()
        .then(res => { 
  
        })
        .catch(err => {
          console.log(err, "获取数据失败");
        });
    },
    handleRender(){
     
      this.renderVisisble = true ;
      this.$refs.formBuild.getData()
        .then(res => { 
          this.$nextTick(() => {
            this.$refs.renderPreview.init(this.jsonData , res)
          })  
      })
      .catch(err => {
          console.log(err, "获取数据失败");
      });
     
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
