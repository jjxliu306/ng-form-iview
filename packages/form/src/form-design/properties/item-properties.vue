<!--
表单控件属性设置组件,因为配置数据是引用关系，所以可以直接修改
-->
<template>
  <div class="properties-centent">
   
    <div class="properties-body"> 
      <p class="hint-box" v-show="!selectItem.key">未选择控件</p>
      <Form v-show="selectItem.key" :disabled="disabled">

       
        <!-- 公共部分 标签 字段key 数据key start -->
        <FormItem  label="标签" v-if="!hideModel">
          <Input v-model="selectItem.label" placeholder="请输入" />
        </FormItem>
       
        <FormItem  label="数据字段" v-if="!hideModel && !noModel.includes(selectItem.type)" >
          <Input v-model="selectItem.model" placeholder="请输入" :disabled="(selectItem.item != undefined && selectItem.item.id != undefined) "/>
        </FormItem>
         <Divider ></Divider>
        <!-- 公共部分 标签 字段key 数据key end -->

        <!-- input textarea start -->
        <template v-if="selectItem.type == 'input' || selectItem.type == 'textarea'">
          <FormItem  label="占位内容"  >
            <Input placeholder="请输入" v-model="options.placeholder" />
          </FormItem>
          
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
           
          <FormItem label="默认值" >
            <Input  v-model="options.defaultValue"
              :placeholder=" typeof options.format === 'undefined' ? '请输入' : options.format"
            />
          </FormItem>  
            
          <FormItem  label="最大长度"  >
            <InputNumber  style="width:100%"  v-model="options.maxLength" placeholder="最大长度,为0表示不限制"  :min="0"/>   
          </FormItem>
            <FormItem  v-if="selectItem.type === 'textarea'" label="输入框行数" >
            <InputNumber  style="width:100%" v-model="options.rows" placeholder="输入框行数"  /> 
          </FormItem>
          <FormItem  label="前后缀"  v-if="selectItem.type === 'input'">
            <Input placeholder="前缀标签" v-model="options.prepend">
              <template slot="prepend">前缀</template>
            </Input>
            <Input placeholder="后缀标签" v-model="options.append"  >
               <template slot="append">后缀</template>
            </Input> 
          </FormItem>
           <Divider ></Divider>
        
          
          <FormItem   label="操作属性" > 
            <Checkbox v-model="options.hidden"   >隐藏</Checkbox>
            <Checkbox v-model="options.disabled"  >禁用</Checkbox> 
            <Checkbox v-if="selectItem.type == 'input'" v-model="options.clearable" >可清除</Checkbox> 
          </FormItem>
        </template>
        <!-- input textarea end -->

        <!-- number start -->
        <template v-if="selectItem.type == 'number'">
          <FormItem  label="占位内容"  >
            <Input placeholder="请输入" v-model="options.placeholder" />
          </FormItem>
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>

          <FormItem  label="步长">
            <InputNumber v-model="options.step" placeholder="请输入" />
          </FormItem>
          <FormItem  label="最小值">
            <InputNumber v-model="options.min" placeholder="请输入" />
          </FormItem>
          <FormItem  label="最大值">
            <InputNumber v-model="options.max" placeholder="请输入"/>
          </FormItem>
          <FormItem  label="数值精度" >
            <InputNumber :min="0"  :max="5"  v-model="options.precision"  placeholder="请输入" />
          </FormItem> 
          <FormItem  label="默认值" >
            <InputNumber
              :step="options.step"
              :min="options.min || -Infinity"
              :max="options.max || Infinity"
              v-model="options.defaultValue" 
            />
          </FormItem>
          <Divider ></Divider>
          <FormItem  label="后缀">
          <!--   <Input placeholder="前缀标签" v-model="options.prepend">
              <template slot="prepend">前缀</template>
            </Input> -->
            <Input placeholder="后缀标签" v-model="options.append"  >
               <template slot="append">后缀</template>
            </Input>
          </FormItem>
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden"   >隐藏</Checkbox>
            <Checkbox v-model="options.disabled"  >禁用 </Checkbox>
          </FormItem>
        </template>
        <!-- number end -->

        <!-- select start -->
        <template v-if="selectItem.type == 'select'">
          <FormItem  label="占位内容"  >
            <Input placeholder="请输入" v-model="options.placeholder" />
          </FormItem>
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          <Divider ></Divider>
          <FormItem  label="选项配置" >
            <RadioGroup  type="button" v-model="options.dynamic">
              <Radio :label="0">静态数据</Radio>
              <Radio :label="1">动态数据</Radio> 
            </RadioGroup> 
          </FormItem>
          <FormItem label-width="0" >  
            <!-- 远程赋值配置 --> 
            <div v-if="options.dynamic == 1">
                <Input size="small" v-model="options.remoteFunc">
                  <template slot="prepend">远端方法</template>
                </Input>
                <Input size="small" v-model="options.dataPath"  title="假设当前接口返回的数据结构为:{code:200,data:[{id:1,name:'11'},{id:2,name:'22'}]} , 则当前的dataPath填写: data">
                  <template slot="prepend">列表数据dataPath</template>
                </Input>
                <Input size="small" v-model="options.remoteValue">
                  <template slot="prepend">值字段</template>
                </Input>
                <Input size="small" v-model="options.remoteLabel">
                  <template slot="prepend">标签字段</template>
                </Input> 
            </div>  
            <!-- 本地赋值 -->
            <ValOption v-show="options.dynamic == 0" :type="selectItem.type" v-model="options.options" />
          </FormItem>
          <Divider ></Divider>
          <!-- 联动配置 2021-03-12 lyf -->
          <FormItem label="联动关联">
            <i-switch v-model="options.linkage">
              <span slot="open">打开</span>
              <span slot="close">关闭</span>
            </i-switch> 
          </FormItem>
          <template v-if="options.linkage">
            <!-- 联动关联中如果事本地数据则只有脚本关联,如果是远程数据则包含远程搜索 -->
            <Linkage v-model="options.linkData" />
          </template>
          <Divider ></Divider>
          <!-- select 本地配置才有默认值 -->
          <FormItem v-if="options.dynamic == 0" :key="options.options" label="默认值"> 
 
            <Select  v-model="options.defaultValue"  >
              <Option
                v-for="(item,oidx) in options.options"
                :key="item.value + oidx" 
                :value="item.value">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden"    >隐藏 </Checkbox>
            <Checkbox v-model="options.disabled"   > 禁用 </Checkbox>
            <Checkbox v-model="options.clearable"   >可清除</Checkbox>
            <Checkbox v-model="options.multiple"   >多选</Checkbox>
            <Checkbox v-model="options.showSearch"   @change="(v)=>{
              if(!v){
                options.onlineSearch = false
              }
            }" > 可搜索</Checkbox>
            <Checkbox v-model="options.onlineSearch" v-if="options.showSearch" > 实时搜索</Checkbox>
          </FormItem> 
          <Divider ></Divider>
          <FormItem   label="实时搜索回调" v-if="options.showSearch && options.onlineSearch"> 
             <Input type="textarea" placeholder="搜索带参,eg: name=$, $表示当前输入关键字" v-model="options.onlineParams" />
          </FormItem> 
          <Divider ></Divider>
          <FormItem   label="选择后回调"  > 
             <Input type="textarea" placeholder="选择后回调方法,eg: $.A004=$select.name, $表示当前表单数据,$select标示当前选择元素实体" v-model="options.selectCb" />
          </FormItem> 
          <FormItem  v-if="selectItem.options.clearable" label="清除后回调"  > 
             <Input type="textarea" placeholder="清除后回调方法,eg: $.A004= '', $表示当前表单数据" v-model="selectItem.options.clearCb" />
          </FormItem> 
        </template>
         <!-- select end -->

        <!-- checkbox start -->
        <template v-if="selectItem.type == 'checkbox'">
          <FormItem  label="选项配置" >
            <RadioGroup type="button"  v-model="options.dynamic">
              <Radio :label="0">静态数据</Radio>
              <Radio :label="1">动态数据</Radio> 
            </RadioGroup> 
          </FormItem>
          <FormItem label-width="0" >  
            <!-- 远程赋值配置 --> 
            <div v-if="options.dynamic == 1">
                <Input  v-model="options.remoteFunc">
                  <template slot="prepend">远端方法</template>
                </Input>
                <Input  v-model="options.dataPath"  title="假设当前接口返回的数据结构为:{code:200,data:[{id:1,name:'11'},{id:2,name:'22'}]} , 则当前的dataPath填写: data">
                  <template slot="prepend">列表数据dataPath</template>
                </Input>
                <Input  v-model="options.remoteValue">
                  <template slot="prepend">值字段</template>
                </Input>
                <Input  v-model="options.remoteLabel">
                  <template slot="prepend">标签字段</template>
                </Input> 
            </div>  
            <!-- 本地赋值 -->
            <ValOption v-if="options.dynamic == 0" :type="selectItem.type" v-model="options.options" />
          </FormItem>
           <Divider ></Divider>
          <!-- 联动配置 2021-03-12 lyf -->
          <FormItem label="联动关联">
            <i-switch  v-model="options.linkage" >
            </i-switch> 
          </FormItem>
          <template v-if="options.linkage">
            <!-- 联动关联中如果事本地数据则只有脚本关联,如果是远程数据则包含远程搜索 -->
            <Linkage v-model="options.linkData" />
          </template>
          <Divider ></Divider>

          <!-- select 本地配置才有默认值 -->
          <FormItem v-if="options.dynamic == 0" label="默认值">
            <CheckboxGroup
              :options="options.options"
              v-model="options.defaultValue"
            >
              <Checkbox  v-for="(item,index) in  [].concat(options.options)" :label="checkitem.value" :key="checkitem.value + index"> 
                {{checkitem.label}}
              </Checkbox>
          </CheckboxGroup>
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden"  >隐藏 </Checkbox>
            <Checkbox v-model="options.disabled"  >禁用 </Checkbox>    
          </FormItem> 
        </template>
        <!-- checkbox end -->

         <!-- radio start -->
        <template v-if="selectItem.type == 'radio'">
          <FormItem  label="选项配置" >
            <RadioGroup type="button"  v-model="options.dynamic">
              <Radio :label="0">静态数据</Radio>
              <Radio :label="1">动态数据</Radio> 
            </RadioGroup> 
          </FormItem>
          <FormItem label-width="0" >  
             <!-- 远程赋值配置 --> 
            <div v-if="options.dynamic == 1">
                <Input  v-model="options.remoteFunc">
                  <template slot="prepend">远端方法</template>
                </Input>
                <Input  v-model="options.dataPath" title="假设当前接口返回的数据结构为:{code:200,data:[{id:1,name:'11'},{id:2,name:'22'}]} , 则当前的dataPath填写: data">
                  <template slot="prepend">列表数据dataPath</template>
                </Input>
                <Input  v-model="options.remoteValue">
                  <template slot="prepend">值字段</template>
                </Input>
                <Input  v-model="options.remoteLabel">
                  <template slot="prepend">标签字段</template>
                </Input> 
            </div>  
            <!-- 本地赋值 -->
            <ValOption v-show="options.dynamic == 0" :type="selectItem.type" v-model="options.options" />
          </FormItem>
           <Divider ></Divider>
          <!-- 联动配置 2021-03-12 lyf -->
          <FormItem label="联动关联">
            <i-switch  v-model="options.linkage" >
            </i-switch> 
          </FormItem>
          <template v-if="options.linkage">
            <!-- 联动关联中如果事本地数据则只有脚本关联,如果是远程数据则包含远程搜索 -->
            <Linkage v-model="options.linkData" />
          </template>
          <Divider ></Divider>

          <!-- select 本地配置才有默认值 -->
          <FormItem v-if="options.dynamic == 0" label="默认值">
            <RadioGroup
              :options="options.options"
              v-model="options.defaultValue"
            >
              <Radio  v-for="(item,index) in  [].concat(options.options)" :label="checkitem.value" :key="checkitem.value + index"> 
                {{checkitem.label}}
              </Radio>
          </RadioGroup>
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden"  >隐藏 </Checkbox>
            <Checkbox v-model="options.disabled"  >  禁用</Checkbox>  
          </FormItem> 
        </template>
        <!-- radio end -->

         <!-- date start -->
        <template v-if="selectItem.type == 'date' || selectItem.type == 'time' || selectItem.type == 'datePicker'">
          
          <FormItem  v-if=" (selectItem.type == 'date' || selectItem.type == 'datePicker' ) && options.range " label="占位内容" >
          <Input placeholder="请输入" v-model="options.rangeStartPlaceholder" />
          <Input placeholder="请输入" v-model="options.rangeEndPlaceholder" />
          </FormItem>
          <FormItem v-else label="占位内容"  >
            <Input placeholder="请输入" v-model="options.placeholder" />
          </FormItem>

          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem> 
           <Divider ></Divider>
          <FormItem label="默认值" >
            <Input
              v-if="selectItem.type == 'time' || !options.range"
              v-model="options.defaultValue"
              :placeholder="
                typeof options.format === 'undefined' ? '' : options.format
              "
            />
            <Input
              v-if="(selectItem.type == 'date' || selectItem.type == 'datePicker' ) && options.range"
              v-model="options.rangeDefaultValue[0]"
              :placeholder="
                '起始时间' + (typeof options.format === 'undefined' ? '' : options.format)
              "
            />
            <Input
              v-if="(selectItem.type == 'date' || selectItem.type == 'datePicker' ) && options.range"
              v-model="options.rangeDefaultValue[1]"
              :placeholder="
                '结束时间' + ( typeof options.format === 'undefined' ? '' : options.format)
              "
            /> 
            <!-- <Input  v-model="options.defaultValue"
              :placeholder=" typeof options.format === 'undefined' ? '请输入' : options.format"
            /> -->
          </FormItem> 
          <FormItem  label="时间格式" >
            <Input  v-model="options.format"  :placeholder="selectItem.type == 'date' ? 'YYYY-MM-DD' : (selectItem.type == 'datePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'HH:mm:ss' )" />
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden"  >隐藏</Checkbox>
            <Checkbox v-model="options.disabled"   > 禁用</Checkbox>
            <Checkbox v-model="options.clearable" > 可清除</Checkbox>
            <Checkbox v-if="selectItem.type == 'date' || selectItem.type == 'datePicker'" v-model="options.range" >范围选择 </Checkbox>
          </FormItem>
        </template>
        <!-- date end -->

        <!-- rate start -->
        <template v-if="selectItem.type == 'rate'">
          <FormItem v-if="typeof options.max !== 'undefined'" label="最大值">
          <InputNumber v-model="options.max" placeholder="请输入" @change="(v)=>{  
                if(options.defaultValue > v){
                  options.defaultValue = v
                } 
            }"/>
          </FormItem>
          <FormItem label="默认值">
            <Rate  v-model="options.defaultValue"  :allow-half="options.allowHalf" :count="options.max"  />
          </FormItem>
        
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox> 
            <Checkbox v-model="options.disabled">禁用</Checkbox>
            <Checkbox v-model="options.allowHalf">允许半选</Checkbox>
          </FormItem>
        </template>
        <!-- date end -->

        <!--  slider start -->
        <template v-if="selectItem.type == 'slider'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
           <FormItem  label="步长">
            <InputNumber v-model="options.step" placeholder="请输入" />
          </FormItem>
          <FormItem  label="最小值">
            <InputNumber v-model="options.min" placeholder="请输入" />
          </FormItem>
          <FormItem  label="最大值">
            <InputNumber v-model="options.max" placeholder="请输入"/>
          </FormItem>
          <FormItem label="默认值"  >
            <InputNumber
              :step="options.step"
              :min="options.min || -Infinity"
              :max="options.max || Infinity"
              v-model="options.defaultValue"  />
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="标记marks">
            <br>
            <ValOption style="width: 100%;" :keyNumber="true" type="keyvalue" v-model="options.marks" />
          </FormItem> 
            
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>
            <Checkbox v-model="options.showInput">显示输入框</Checkbox>
          </FormItem>
        </template>
        <!-- slider end -->

        <!-- 上传文件 start -->
        <template v-if="selectItem.type == 'uploadFile'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          <!-- 上传数量 -->
          <FormItem  label="最大上传数量" >
            <InputNumber :min="1" v-model="options.limit" />
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>
            <Checkbox v-model="options.multiple">多选</Checkbox>
          </FormItem> 
        </template> 
        <!-- 上传文件 end -->


        <!-- 上传图片 start -->
        <template v-if="selectItem.type == 'uploadImg'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          <!-- 上传数量 -->
          <FormItem  label="最大上传数量" >
            <InputNumber :min="1" v-model="options.limit" />
          </FormItem>
           <Divider ></Divider>
          <!-- 上传图片样式 -->
          <FormItem  label="样式">
            <RadioGroup type="button" v-model="options.listType">
              <Radio label="text">text</Radio>
              <Radio label="picture">picture</Radio>
              <Radio label="picture-card">card</Radio>
            </RadioGroup>
          </FormItem>
           <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>
            <Checkbox v-model="options.multiple">多选</Checkbox>
          </FormItem> 
        </template> 
        <!-- 上传图片 end -->

        <!-- 级联选择器 start -->
        <template v-if="selectItem.type == 'cascader'">
          <FormItem  label="选项配置" >
            <RadioGroup  type="button" v-model="options.dynamic">
              <Radio :label="0">静态数据</Radio>
              <Radio :label="1">动态数据</Radio> 
            </RadioGroup> 
          </FormItem>
          <FormItem label-width="0" >  
            <!-- 远程赋值配置 --> 
            <div v-if="options.dynamic == 1">
                <Input  v-model="options.remoteFunc">
                  <template slot="prepend">远端方法</template>
                </Input>
                <Input  v-model="options.dataPath">
                  <template slot="prepend">列表数据jsonPath</template>
                </Input>
                <Input  v-model="options.remoteValue">
                  <template slot="prepend">值字段</template>
                </Input>
                <Input  v-model="options.remoteLabel">
                  <template slot="prepend">标签字段</template>
                </Input> 
                <Input  v-model="options.remoteChildren" >
                  <template slot="prepend">下级字段</template>
                </Input>
            </div>   
            <!-- 本地赋值 -->
            <ValOption v-show="options.dynamic == 0" :type="selectItem.type" v-model="options.options" />
          </FormItem>
             <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>  
            <Checkbox v-model="options.clearable">可清除</Checkbox>
            <Checkbox v-model="options.multiple">多选</Checkbox>
            <Checkbox v-model="options.showSearch">可搜索</Checkbox> 
          </FormItem> 
        </template>
        <!-- 级联选择器 end -->


        <!-- 动态表格 start -->
        <template v-if="selectItem.type == 'batch'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          <FormItem  label="对话框标签宽度">
            <Input placeholder="请输入" v-model="options.labelWidth" />
          </FormItem>
           <Divider ></Divider>
          <FormItem label="标签对齐方式">
            <RadioGroup type="button" v-model="options.labelPosition">
              <Radio label="left">左对齐</Radio>
              <Radio label="right">右对齐</Radio>
              <Radio label="top">顶部对齐</Radio>
            </RadioGroup>
          </FormItem>

           <Divider ></Divider>
          <!-- 上传数量 -->
          <FormItem  label="滚动高度" >
            <InputNumber :min="0" v-model="options.scrollY" />
          </FormItem>
           <!-- 表格 -->
          <FormItem  label="表格样式Class名称">
            <Input v-model="selectItem.options.customClass" />
          </FormItem>
            
          <FormItem  label="表格样式CSS">
            <Input type="textarea" v-model="selectItem.options.customStyle" />
          </FormItem>
          <Divider ></Divider>
            <FormItem  label="新增行方式">
             <RadioGroup v-model="options.addType">
              <Radio  label="line">增加行</Radio>
              <Radio  label="dialog">弹出框</Radio> 
            </RadioGroup>
          </FormItem>
         
         
          <Divider class="divider-center" > {{options.addType == 'dialog' ? '外部展示字段' : '字段宽度'}} </Divider>
          <FormItem  >
              <CheckboxGroup v-model="selectItem.options.showItem" >
                <!-- 获取当前内部已经包含的要素 -->
                <Row  v-for="item in selectItem.list" :key="item.model">
                  <Col :span="12">
                     <Checkbox :label="item.model" v-if="options.addType == 'dialog'">{{item.label}}</Checkbox>
                     <span v-else> {{item.label}} </span>
                  </Col>
                   <Col :span="12">
                     <Input placeholder="宽度" v-model="selectItem.options.colWidth[item.model]" />
                  </Col> 
                </Row> 

              </CheckboxGroup>
          </FormItem> 
           
          <Divider ></Divider>

          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>
            <Checkbox v-model="options.showLabel">显示Label</Checkbox>
             <Checkbox v-model="options.showBorder">显示边框</Checkbox>
            <Checkbox v-model="options.hideSequence">隐藏序号</Checkbox>
            <Checkbox v-model="options.copyRow">行复制</Checkbox>
             
          </FormItem> 
        </template> 
        <!-- 动态表格 end -->


         <!-- 开关 switch start-->
        <template v-if="selectItem.type == 'switch'"> 
          <!-- 开关的label -->
          <FormItem   label="打开标签值">
            <Input placeholder="请输入" v-model="options.activeText" /> 
          </FormItem>
           <FormItem   label="关闭标签值" >
            <Input placeholder="请输入" v-model="options.inactiveText" /> 
          </FormItem>
          <FormItem  label="默认值">
            <i-switch v-model="options.defaultValue" />
          </FormItem>
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox> 
          </FormItem> 
        </template> 
        <!-- 开关 switch  end -->


         <!-- 按钮 start-->
        <template v-if="selectItem.type == 'button'"> 
          <!-- 按钮类型 -->
          <FormItem label="类型">
            <RadioGroup v-model="options.type">
              <Radio label="primary">Primary</Radio>
              <Radio label="default">Default</Radio>
              <Radio label="dashed">Dashed</Radio>
              <Radio label="danger">Danger</Radio>
            </RadioGroup>
          </FormItem>
            <Divider ></Divider>
          <FormItem  label="按钮对齐方式">
            <RadioGroup type="button" v-model="selectItem.options.textAlign">
              <Radio label="left">左</Radio>
              <Radio label="center">居中</Radio>
              <Radio label="right">右</Radio>
            </RadioGroup>
          </FormItem> 
          <Divider ></Divider>
          <FormItem  label="按钮操作"> 
            <Input type="textarea" v-model="options.dynamicFun" placeholder="动态JS,表单数据绑定值符号$" ></Input>
          </FormItem>
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox>  
          </FormItem> 
        </template> 
        <!-- 按钮  end -->

        <!-- 标签 start-->
        <template v-if="selectItem.type == 'text'"> 
          <!-- 按钮类型 -->
          <FormItem  label="文字对齐方式">
            <RadioGroup v-model="options.textAlign">
              <Radio label="left">左</Radio>
              <Radio label="center">居中</Radio>
              <Radio label="right">右</Radio>
            </RadioGroup>
          </FormItem> 
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox> 
            <Checkbox v-model="options.showRequiredMark">显示必选标记</Checkbox>
          </FormItem> 
          <Divider ></Divider>
          <FormItem   label="动态必选" >
           <Input type="textarea" v-model="options.showRequiredMarkScript" :rows="4" placeholder="请输入表达式或者动态函数,数据实体以$标识"/>
          </FormItem> 
        </template> 
        <!-- 标签  end -->

         <!-- 标签 start-->
        <template v-if="selectItem.type == 'alert'"> 
          <!-- 按钮类型 -->
          <FormItem  label="内容">
             <Input type="textarea" v-model="options.title" :rows="4" placeholder="提示内容"/>
          </FormItem> 
          <FormItem  label="辅助文字">
             <Input type="textarea" v-model="options.description" :rows="4" placeholder="辅助文字"/>
          </FormItem> 
          <FormItem  label="类型">
            <RadioGroup type="button" v-model="options.type">
              <Radio label="success">success</Radio>
              <Radio label="warning">warning</Radio> 
              <Radio label="info">info</Radio>
              <Radio label="error">error</Radio> 
            </RadioGroup>
          </FormItem> 
         <!--  <FormItem  label="主题">
            <RadioGroup type="button" v-model="options.effect">
              <Radio label="light">light</Radio>
              <Radio label="dark">dark</Radio> 
            </RadioGroup>
          </FormItem>  -->
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.closable">可关闭</Checkbox>
            <Checkbox v-model="options.center">居中</Checkbox>
             <Checkbox v-model="options.showIcon" >显示图标</Checkbox>
          </FormItem> 
           <FormItem v-if="options.closable" label="关闭按钮文本">
            <Input  v-model="options.closeText"  placeholder="不需要则不填"/>
          </FormItem> 
          <Divider ></Divider>
          <FormItem   label="动态必选" >
           <Input type="textarea" v-model="options.showRequiredMarkScript" :rows="4" placeholder="请输入表达式或者动态函数,数据实体以$标识"/>
          </FormItem> 
        </template> 
        <!-- 标签  end -->

        <!-- html start-->
        <template v-if="selectItem.type == 'html'">  
          <FormItem label="默认值">
            <Input type="textarea" v-model="options.defaultValue" :rows="4" />
          </FormItem>
          <Divider ></Divider>
          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>  
          </FormItem> 
        </template> 
        <!-- html  end -->


        <!-- ################### 布局  start ################################  -->
        <!-- 分割线 start-->
        <template v-if="selectItem.type == 'divider'">  
          

          <FormItem  label="方向" >
            <RadioGroup type="button" v-model="options.direction">
              <Radio label="horizontal">横向</Radio>
              <Radio label="vertical">竖向</Radio> 
            </RadioGroup>
          </FormItem>  
          <Divider ></Divider>
          <FormItem  label="标签位置" v-if="options.direction && options.direction == 'horizontal'">
            <RadioGroup type="button" v-model="options.orientation">
              <Radio label="left">左</Radio>
              <Radio label="center">居中</Radio>
              <Radio label="right">右</Radio>
            </RadioGroup>
          </FormItem> 
        </template> 
        <!-- 分割线  end -->

        <!-- 栅格布局 start-->
        <template v-if="selectItem.type == 'grid'">   
          <FormItem  label="栅格间距">
            <InputNumber  v-model="selectItem.options.gutter"  placeholder="请输入" />
          </FormItem>
          <FormItem label="列配置项">
            <ValOption v-model="selectItem.columns" type="colspan" />
          </FormItem>
        </template> 
        <!-- 栅格布局  end -->

        <!-- 表格布局 start-->
        <template v-if="selectItem.type == 'table'">   
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          <!-- 表格 -->
          <FormItem  label="表格样式Class名称">
            <Input v-model="selectItem.options.customClass" />
          </FormItem>
          <FormItem  label="表格样式CSS">
            <Input type="textarea" v-model="selectItem.options.customStyle" />
          </FormItem>
         <Divider ></Divider>
          <FormItem label="操作属性">
            <Checkbox v-model="options.bordered">显示边框</Checkbox> 
            <Checkbox v-model="options.bright" >鼠标经过点亮</Checkbox>
            <Checkbox v-model="options.small" >紧凑型</Checkbox>
          </FormItem>
        </template> 
        <!-- 表格布局  end -->
         <!-- 区划选择 start -->
        <template v-if="selectItem.type == 'state'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem> 
          <Divider ></Divider> 
          <FormItem  label="区划层级">
            <Select v-model="options.maxLevel"  placeholder="请选择区划层级" >
              <template  v-for="item in [{value:1 , label: '省'},{value:2 , label: '地市'},{value:3 , label: '区县'}]">
                <Option 
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  {{item.label}}
                </Option> 
              </template> 
            </Select>
          </FormItem>
           
          <Divider ></Divider>

          <FormItem  label="操作属性" >
            <Checkbox v-model="options.hidden"  label="隐藏" >隐藏</Checkbox>
            <Checkbox v-model="options.disabled"  label="禁用">  禁用</Checkbox>
            <Checkbox v-model="options.oneByOne" label="递进式显示" >递进式显示</Checkbox> 
            <Checkbox v-model="options.showAllPath" label="回显所有路径" >回显所有路径</Checkbox> 
          </FormItem> 
          <FormItem v-if="options.showAllPath" label="路径分隔符">
             <Input  v-model="options.separator" max-length="10"/> 
          </FormItem> 
        </template> 
        <!-- 区划选择 end --> 

         <!-- 容器 start -->
        <template v-if="selectItem.type == 'control'">
          <FormItem  label="宽度">
            <Input placeholder="请输入" v-model="options.width" />
          </FormItem>
          

           <Divider ></Divider> 
           <!-- 表格 -->
          <FormItem  label="样式Class名称">
            <Input v-model="selectItem.options.customClass" />
          </FormItem>
            
          <FormItem  label="样式CSS">
            <Input type="textarea" v-model="selectItem.options.customStyle" />
          </FormItem>
           
           
          <Divider ></Divider>

          <FormItem   label="操作属性" >
            <Checkbox v-model="options.hidden">隐藏</Checkbox>
            <Checkbox v-model="options.disabled">禁用</Checkbox> 
            <Checkbox v-model="options.bordered">显示边框</Checkbox> 
            <Checkbox v-model="options.noAdd" >无新增</Checkbox>
            <Checkbox v-model="options.noRemove">无删除</Checkbox>  
            <Checkbox v-model="options.noCopy">无复制</Checkbox>  
          </FormItem> 
        </template> 
        <!-- 容器 end -->
 
        <!-- ############# 为自定义组件预备的插槽 start ############### -->

        <slot name="custom-properties"></slot>


         <!-- ############# 为自定义组件预备的插槽 end ############### -->

        <!-- ################### 布局  end ################################  -->

         <!-- tooptip 提示 -->
        <FormItem  v-if="[
          'input',
          'textarea',
          'number',
          'select',
          'checkbox',
          'radio',
          'date',
          'time',
          'datePicker',
          'rate',
          'slider',
          'uploadFile',
          'uploadImg',
          'cascader',
          'switch',
          'button',
          'text',
          'html',
          'divider' 
        ].includes(selectItem.type)" label="tooptip提示" > 
          <Input type="textarea" v-model="options.tooptip"  placeholder="鼠标移动到组件上的提示信息" /> 
        </FormItem> 
        <Divider ></Divider>

        <!-- ################### 校验   start ############################## -->
        <FormItem  v-if="selectItem.rules  && selectItem.rules.length > 0 " label="校验" >
          <Checkbox v-model="selectItem.rules[0].required" > 必填</Checkbox>
          <Input v-model="selectItem.rules[0].message"  placeholder="必填校验提示信息" />
          <ValOption v-model="selectItem.rules" type="rules" :disabled="disabled" />

          <Divider ></Divider>
        </FormItem>
        <!-- ################### 校验   end ############################## -->

       

        <template v-if="!hideModel && selectItem && selectItem.options">
           <FormItem label="动态显示">
            <!-- 每个元素都有隐藏条件 根据渲染数据的值来改变 --> 
            <i-switch    v-model="selectItem.options.dynamicVisible">
                <span slot="open">打开</span>
                <span slot="close">关闭</span>
            </i-switch>
           
          </FormItem>
          <FormItem label="显示条件" v-if="selectItem.options.dynamicVisible">
            <!-- 每个元素都有隐藏条件 根据渲染数据的值来改变 -->
            <Input
              type="textarea"
              :rows="3"
              placeholder="请输入显示条件,$标识当前整个表单的绑定数据"
              v-model="selectItem.options.dynamicVisibleValue">
            </Input>
          </FormItem>
          <Divider ></Divider>
        </template>
        <!-- 条件禁用 lyf 2021-05-06-->
        <template v-if="!hideModel && selectItem && selectItem.options && selectItem.options.disabled">
           <FormItem label="动态禁用">
            <!-- 每个元素都有隐藏条件 根据渲染数据的值来改变 --> 
            <i-switch v-model="selectItem.options.dynamicDisabled">
            </i-switch>
          </FormItem>
          <FormItem label="禁用条件" v-if="selectItem.options.dynamicDisabled">
            <!-- 每个元素都有隐藏条件 根据渲染数据的值来改变 -->
            <Input
              type="textarea"
              :rows="3"
              placeholder="请输入禁用条件,$标识当前整个表单的绑定数据,data标识当前事项实体数据"
              v-model="selectItem.options.dynamicDisabledValue">
            </Input>
          </FormItem>

        </template>
       


        <FormItem v-if="selectItem.type === 'table'" label="提示">
          <p style="line-height: 26px;">
            请点击右键增加行列，或者合并单元格
          </p>
        </FormItem>

      </Form>
    </div> 
  </div>
</template>
<script> 
import ValOption from "./option";
import Linkage from './linkage'
import {noModelList} from '../config'
export default {
  name: "formItemProperties",
  data() {
    return {
      options: {},
      noModel : noModelList 
    };
  },
  watch: {
    selectItem(val) { 
      if(val.type == 'batch' && !val.options.colWidth) {
        this.$set(val.options , 'colWidth' , {})
      }
      this.options = val.options || {}; 
    }
  },
  props: {
    selectItem: {
      type: Object,
      required: true
    },

    hideModel: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ValOption , Linkage
  }
};
</script>
