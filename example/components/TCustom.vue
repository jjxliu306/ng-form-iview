<template>
	<div>  
		<Input
		  v-if="!preview"
		  type="textarea"
		  autosize
		  placeholder="请输入图片地址"
		  v-model.trim="models[record.model]" :disabled="disabled"/>
 
		 <img :src="models[record.model]" /> 
	</div> 
</template>
<script>
  export default { 
    props: {    
	    record: {//组件数据
	      type: Object,
	      required: true
	    }, 
	    models: {// 表单数组 
	      type: Object,
	      required: true
	    }, 
	    disabled: { // 是否禁用
	      type: Boolean,
	      default: false
	    } , 
	    preview: {// 是否当前是预览
	      type: Boolean ,
	      default: false
	    } 
    },
    methods: { 
    }
  }
</script>