<!--
生成json Modal
-->
<template>
  <Modal
    title="JSON数据" 
    v-model="visible"
    :append-to-body="true"
    style="top:20px;"
    width="850px"
  >
     <div class="json-box"> 
      <Input style="min-height:300px;height: 300px;max-height: 290px;overflow: auto;" autosize  readonly ref="myEditor" type="textarea" :value="editorJson"> 
      </Input> 
    </div>
    <div class="copy-btn-box"> 
      <Button size="mini" @click="handleExportJson" type="primary">
        导出代码
      </Button>
    </div>
    <span slot="footer" class="dialog-footer">
      <Button size="mini" @click="visible = false">取 消</Button>
      <Button size="mini" type="primary" @click="visible = false">确 定</Button>
    </span>
  </Modal>
</template>
<script> 
 
export default {
  name: "JsonModal",
  data() {
    return {
      visible: false,
      editorJson: "",
      jsonData: {}
    };
  },
  watch: {
    visible(val) {
      if (val) { 
        this.editorJson = JSON.stringify(this.jsonData, null, "\t");
      }
    }
  },
  components: {
     
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    exportData(data, fileName = `demo.${this.fileFormat}`) {
      let content = "data:text/csv;charset=utf-8,";
      content += data;
      var encodedUri = encodeURI(content);
      var actions = document.createElement("a");
      actions.setAttribute("href", encodedUri);
      actions.setAttribute("download", fileName);
      actions.click();
    },
    handleExportJson() {
      // 导出JSON
      this.exportData(this.editorJson);
    },
  }
};
</script>
