<!--
 修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
-->

<template>
  <div class="option-change-container">
   
    <div  
      v-if="[ 
        'radio',
        'checkbox',
        'select',
        'keyvalue'
        ].includes(type)"  >
      <Row class="option-change-box" v-for="(val, index) in value" :key="index" :gutter="8">
        <Col span="9">
          <Input v-if="keyNumber" v-model="val.value"  type="number" placeholder="值"/>
          <Input v-else v-model="val.label" type="text" placeholder="名称"/>
        </Col>
        <Col span="9"> 
          <Input v-if="keyNumber" v-model="val.label" placeholder="名称"/>
          <Input v-else v-model="val.value" placeholder="值"/>
        </Col>
        <Col span="6">
          <div @click="handleDelete(index)" class="option-delete-box">
            删除
          </div>
        </Col>
      </Row>
      <div v-if="!disabled" :span="24">
        <Button type="primary" @click="handleAdd">添加</Button>
      </div>
    </div>
    <!-- 级联 树状数据 lyf 2020-07-06 -->
    <div v-if="type === 'cascader'"  >
      <div  >
        <Tree 
          :data="value ? value : []" 
          node-key="value" 
          :render="treeRenderContent">
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
      <Col v-if="!disabled" :span="24">
        <Button type="primary" @click="handleAdd">添加</Button>
      </Col>
    </div>

    <div v-if="type === 'rules'" > 
      <span v-for="(val, index) in value" :key="index" >
        <template v-if="index !== 0">
           <Row :gutter="8" class="option-change-box" > 
            <Col span="17" >
              <radio-group v-model="val.vtype">
                  <Radio label="1"  >正则</Radio>
                  <Radio label="2">表达式</Radio> 
              </radio-group> 
            </Col>
            <Col span="6" >   
               <div @click="handleDelete(index)" class="option-delete-box"> 
                 删除
              </div> 
            </Col> 
          </Row>
          <Row>  
            <Input v-model="val.message" placeholder="提示信息"/>
          </Row>
          <Row>    
              <Input  v-if="val.vtype == 1" v-model="val.pattern" placeholder="正则表达式pattern" />
              <Input  v-else-if="val.vtype == 2" type="textarea" v-model="val.script" placeholder="条件表达式" />
          </Row>
        </template> 
      </span>
      <Row v-if="!disabled" > 
        <Button type="primary"  @click="handleAddRules">增加校验</Button>
      </Row>
    </div>
    <div v-else-if="type === 'colspan'" >
      <Row class="option-change-box" v-for="(val, index) in value" :key="index" :gutter="8">
        <Col :span="18">
          <InputNumber
            style="width:100%"
            :max="24"
            v-model="val.span"
            placeholder="名称"/>
        </Col>
        <Col :span="6">
          <div @click="handleDelete(index)" class="option-delete-box">
             删除
          </div>
        </Col>
      </Row>
      <div v-if="!disabled" :span="24">
        <Button type="primary" @click="handleAddCol">添加</Button>
      </div>
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

    treeRenderContent (h, { root, node, data }) {
      return h('div', {
          style: {
            display: 'inline-block',
            width: '100%'
          },
        },
        [
          h('Row',{
            props: Object.assign({},  {
                gutter: 4
            }) 
          },
          [
            h('Col', {
                props:    {
                  span: 9
                }  
            },
            [ 
               h('Input',{
                    props:  {
                      value: data.label,
                      type: this.keyNumber ? 'number' : 'text',
                      placeholder: '名称'
                    }  
                  
              })
            ]

            ),
          ]
          )
        ]

      )  
    },


  }
};
</script> 