<template>
  <Modal
    v-model="openModal"
    width="auto"
    :closable="true"
    :mask-closable="true"
    class-name="view-img-modal"
    @on-visible-change="closeView"
    >
      <img :src="imgSrc" alt="">
    <div slot="footer"></div>
  </Modal>
</template>
<script>
export default {
  props:{
    open:{
      type:Boolean,
      default:false
    },
    imgSrc:{
      type:String,
      required:true
    }
  },
  data(){
    return {
      openModal:false
    }
  },
  watch:{
    open:{
      handler(newValue, oldValue) {
        this.openModal = newValue;
      },
      immediate:true
    }
  },
  methods:{
    closeView(flag){
      if(!flag){
        this.$emit('closeImgView',flag)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  img{
    display:inline-block;
    height:auto;
    width:auto;
    margin-left:auto;
    margin-right:auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>