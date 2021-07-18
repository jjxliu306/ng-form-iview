<!--
 修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
-->

<template>
  <div class="option-change-container">
   
    <Row  
      v-if="[ 
        'radio',
        'checkbox',
        'select',
        'keyvalue'
        ].includes(type)" :gutter="8">
      <div class="option-change-box" v-for="(val, index) in value" :key="index">
        <Col :span="9">
          <Input v-if="keyNumber" v-model="val.value"  type="number" placeholder="值"/>
          <Input v-else v-model="val.label" type="text" placeholder="名称"/>
        </Col>
        <Col :span="9"> 
          <Input v-if="keyNumber" v-model="val.label" placeholder="名称"/>
          <Input v-else v-model="val.value" placeholder="值"/>
        </Col>
        <Col :span="6"
          ><div @click="handleDelete(index)" class="option-delete-box">
            <i class="el-icon-delete" /></div
        ></Col>
      </div>
      <Col v-if="!disabled" :span="24"><Button type="primary" @click="handleAdd">添加</Button></Col>
    </Row>
    <!-- 级联 树状数据 lyf 2020-07-06 -->
    <Row v-if="type === 'cascader'" :gutter="8">
      <div  >
        <Tree 
          :data="value ? value : []"
          show-checkbox
          node-key="value"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span> 
              <Row :gutter="4">
                <Col :span="9">
                  <Input v-model="data.label"  :type="keyNumber ? 'number' : 'text'" placeholder="名称" />
                </Col>
                <Col :span="9">
                  <Input v-model="data.value" placeholder="值"/>
                </Col>
                <Col :span="6">
                  <Button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    <i class="el-icon-circle-plus-outline"></i>
                  </Button>
                  <Button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    <i class="el-icon-delete"></i>
                  </Button>
                </Col>
              </Row>
            </span>
            
          </span>
        </Tree>
      </div>
      <Col v-if="!disabled" :span="24"><Button type="primary" @click="handleAdd">添加</Button></Col>
    </Row>

    <Row v-if="type === 'rules'" :gutter="8">
      <span v-for="(val, index) in value" :key="index">
        <div class="option-change-box" v-if="index !== 0">
          <Col :span="18" >
            <template>
              <Radio v-model="val.vtype" :label="1">正则</Radio>
              <Radio v-model="val.vtype" :label="2">表达式</Radio>
            </template>
          </Col>
          <Col :span="18" >
            <Input v-model="val.message" placeholder="提示信息"/>
          </Col>
          <Col :span="18">
            <Input  v-if="val.vtype == 1" v-model="val.pattern" placeholder="正则表达式pattern" />
            <Input  v-else-if="val.vtype == 2" type="textarea" v-model="val.script" placeholder="条件表达式" />
          </Col>
          <Col :span="6" >
            <div @click="handleDelete(index)" class="option-delete-box">
              <i class="el-icon-delete" />
            </div>
          </Col>
        </div>
      </span>
      <Col v-if="!disabled" :span="24"><Button type="primary" @click="handleAddRules">增加校验</Button></Col>
    </Row>
    <Row v-else-if="type === 'colspan'" :gutter="8">
      <div class="option-change-box" v-for="(val, index) in value" :key="index">
        <Col :span="18"
          ><InputNumber
            style="width:100%"
            :max="24"
            v-model="val.span"
            placeholder="名称"
        /></Col>
        <Col :span="6"
          ><div @click="handleDelete(index)" class="option-delete-box">
             <i class="el-icon-delete" /></div
        ></Col>
      </div>
      <Col v-if="!disabled" :span="24"><Button type="primary" @click="handleAddCol">添加</Button></Col>
    </Row> 
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
    type: {
      type: String,
      default: "option"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // key必须为数字 2021-02-17 lyf
    keyNumber: {
      type: Boolean ,
      default: false
    },
  },
  methods: {
    handleAdd() {
      // 添加
      let addData = [
        ...this.value,
        {
          value: "",
          label: ""
        }
      ];
      this.$emit("input", addData);
    },
    handleAddCol() {
      // 添加栅格Col
      let addData = [
        ...this.value,
        {
          span: 12,
          list: []
        }
      ];
      this.$emit("input", addData);
    },
    handleAddRules() {
      let addData = [
        ...this.value,
        {
          vtype: 1,
          //validator: 'validatorFiled',
          pattern: "",
          script: "",
          message: ""
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
    append(data) {
        const newChild = { value: '', label: '', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
    },

    remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.value === data.value);
        children.splice(index, 1);
    },

  }
};
</script> 