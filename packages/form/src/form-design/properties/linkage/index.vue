<!--
  多组件联动的时候配置联动信息
-->

<template>
  <div class="option-change-container"> 
    
      <div   v-for="(val, index) in value"  :key="index"> 
          <Row  :gutter="8" class="option-change-box"  > 
            <Col span="17" > 
              <template>
                {{index+1}}、
                <radio-group v-model="val.vtype"> 
                    <Radio  label="1">本地</Radio>
                    <Radio   label="2">远程</Radio>
                </radio-group>  
              </template>
            </Col>
            <Col span="6" >   
               <div @click="handleDelete(index)" class="option-delete-box"> 
                 删除
              </div> 
            </Col>  
          </Row>
          <Row   >
            <Input size="mini" v-model="val.model" placeholder="关联字段">
              <template slot="prepend">关联字段</template>
            </Input>
          </Row>
          <Row :span="21">
            <template v-if="val.vtype == 1">
               表达式:
              <Input size="mini"   type="textarea" v-model="val.script" placeholder="表达式,eg: $item.value>$.age . 其中$item表示当前数据中具体一条数据,$表示当前整个表单数据" />

            </template>
           
            <Row v-else-if="val.vtype == 2">
              <Col :span="12">
                <Input size="mini" v-model="val.queryKey" placeholder="query key" />
              </Col>
               <Col :span="12">
                <Input size="mini" v-model="val.queryValue" placeholder="query value" />
              </Col>
            </Row> 
          </Row>
          
        
      </div>
      <div v-if="!disabled" :span="24">
        <Button type="primary" size="mini" @click="handleAdd">添加</Button>
      </div>
    
     
  </div>
</template>
<script>
 
export default {
  name: "ChangeOption",
  props: {
    value: {
      type: Array,
      default: ()=> [],
      required: true
    },
     
    disabled: {
      type: Boolean,
      default: false
    },
    
  },
  methods: {
     
    handleAdd() {
      if(!this.value) {
        this.value = []
      }
      let addData = [
        ...this.value,
        {
          vtype: 1,
          //validator: 'validatorFiled',
          model: "",
          script: "",
          queryKey: "",
          queryValue: ""
        }
      ]; 
      this.$emit("input", addData);
    },
    handleDelete(deleteIndex) {
      // 删除
      this.$emit(
        "input",
        this.value.filter((val, index) => index !== deleteIndex)
      );
    },
      
  }
};
</script> 