<template>
	 
	<Tabs type="card" name="properties" v-model="active" >
	    <TabPane  label="控件属性" name="item" tab="properties">
	    	<ItemProperties :selectItem="selectItem" ref="itemProperties" >
	    		<template slot="custom-properties" :selectItem="selectItem">
                        <slot name="custom-properties" :selectItem="selectItem"></slot>
                </template>
	    	</ItemProperties>
	    </TabPane> 
	    <TabPane label="表单属性" name="form" tab="properties"> 
	    	<FormProperties ref="formProperties"  
	    	 	:config="data.config"
	            :previewOptions="previewOptions"
	    	 > 
	    		<template slot="form-extend-properties" :data="data">
                    <slot name="form-extend-properties" :data="data"></slot>
                </template> 
	    	</FormProperties>
	    </TabPane> 

	    <slot name="extend-tab" :data="data"  >
	     	<!-- 扩展插槽,扩展对应要素属性 -->
	    </slot>

	  </Tabs>
		
	 
</template>
<script>
import ItemProperties from './item-properties'
//import ItemProperties2 from './item-properties2'
import FormProperties from './form-properties'
//import { mapState } from "vuex";
export default {
	components: {
		ItemProperties,FormProperties/*,ItemProperties2*/
	},
	props: {
		data: {
			type: Object ,
			default : () => {}
		},
		selectItem: {
			type: Object,
			default: ()=>{}
		}
	},
	watch: {
	    selectItem(val) {
	      this.active = 'item'
	    }
	},
	data(){
		return{
			//selectItem: {}
			active: 'item',
			previewOptions: {
		        width: 850
		    },
		}
	}, 
	methods: {

	}
}
</script> 