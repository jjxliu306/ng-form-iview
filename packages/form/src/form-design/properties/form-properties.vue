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
          <el-input-number v-model="config.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
        </FormItem>
        <Divider></Divider>

        <FormItem label="组件尺寸">
          <RadioGroup type="button" v-model="config.size">
            <Radio label="medium">medium</Radio>
            <Radio label="small">small</Radio>
            <Radio label="mini">mini</Radio>
          </RadioGroup>
        </FormItem>
        <Divider></Divider>
        <FormItem label="校验字段提示"> 
          <Switch
            v-model="config.hideRequiredMark"
            active-text="打开"
            :inactive-value="true"
            :active-value="false"
            inactive-text="关闭">
          </Switch> 
        </FormItem> 
          <FormItem label="输出隐藏组件值"> 
          <Switch
            v-model="config.outputHidden"
            active-text="打开" 
            inactive-text="关闭">
          </Switch> 
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