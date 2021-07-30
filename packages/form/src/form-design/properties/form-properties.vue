<!--
表单属性设置面板组件
-->
<template>
  <div class="properties-centent kk-checkbox"> 
    <div class="properties-body">
      <Form label-position="left" size="mini"  >
        <FormItem label="标签对齐方式">
          <RadioGroup type="button" v-model="config.labelPosition">
            <Radio label="left">左对齐</Radio>
            <Radio label="right">右对齐</Radio>
            <Radio label="top">顶部对齐</Radio>
          </RadioGroup>
        </FormItem>
        <Divider></Divider>

        <FormItem label="标签宽度">
          <InputNumber v-model="config.labelWidth" :min="0" :max="200" :step="10"/>
        </FormItem>
        <Divider></Divider>

        <FormItem label="组件尺寸">
          
          <RadioGroup type="button" v-model="config.size">
            <Radio label="large">large</Radio>
            <Radio label="default">default</Radio>
            <Radio label="small">small</Radio>
           
          </RadioGroup>
        </FormItem>
        <Divider></Divider>
        <FormItem label="校验字段提示"> 
            <i-switch    v-model="config.hideRequiredMark">
                <span slot="open">打开</span>
                <span slot="close">关闭</span>
            </i-switch> 
        </FormItem> 
          <FormItem label="输出隐藏组件值"> 
            <i-switch    v-model="config.outputHidden">
                <span slot="open">打开</span>
                <span slot="close">关闭</span>
            </i-switch> 
          
        </FormItem>
        <Divider></Divider>

        <FormItem label="表单CSS">
          <Input  type="textarea" v-model="config.customStyle" />
        </FormItem>
        <Divider></Divider>

        <slot name="form-extend-properties"></slot>
      
        <FormItem label="提示">
          实际预览效果请点击预览查看
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
 
export default {
  name: "formProperties", 
  props: {
    config: {
      type: Object,
      required: true
    },
    previewOptions: {
      type: Object,
      required: true
    }
  }
};
</script> 