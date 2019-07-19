<template>
  <div class="add-file-card">
    <div class="file-card-body">
      <ul class="ivu-upload-list clearfix">
        <li v-for="(item, index) in fileList" :key="index" class="ivu-upload-list-file">
          <div class="added-files">
            <div class="uploaded-file-icon" :class="fileType(item.fileName)"></div>
            <div class="fileName" trigger="hover" :title="item.fileName">
              <span>{{item.fileName}}</span>
            </div>
            <div class="remove-file" @click="deleteFile(item,index)"></div>
          </div>
        </li>
        <li class="ivu-upload-list-file" v-show="fileList.length<maxFiles">
          <div class="the-add-icon" trigger="hover" title="添加文件">
            <input type="file" ref="fileInput" @change="addFile($event)" multiple="multiple" style="display:none;font-size:0;">
            <div style="cursor:pointer;" @click="triggerOtherFileInput">
              <div class="others-file-add-icon"></div>
              <div>图片上传</div>
            </div>
            <Spin fix v-if="fileIsLoading">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div style="width:80px;">上传中...</div>
            </Spin>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      url:{
        type:String,
        default:''
      },
      maxFiles:{
        type:Number,
        default:5
      }
    },
    data(){
      return {
        fileIsLoading:false,
        fileList:[],
        fileTypeImg: '',//src文件类型的展示图片
        selectedFileCount:0,
        uploadedFileCount:0
      }
    },
    methods:{
      triggerFileInput(){
        this.$refs.infoFileInput.click();
      },
      uploadFile(file,callBack){
        let param = new FormData();
        param.append('file',file,file.name);
        this.$thttp({
          method:'file',
          url:this.url,
          data:param
        })
        .then(data=>{
          callBack && callBack.call(this,data);
          if(data.code*1 == 0){
            this.fileList.push(data.data);
          }else{
            this.$DelayWarning(data.msg);
          };
        }).catch(error=>{
          callBack && callBack.call(this);
        });
      },
      triggerOtherFileInput(){
        this.$refs.fileInput.click();
      },
      addFile(el){
        let files = el.target.files;
        if(files.length){
          if(files.length > this.maxFiles){
            this.$DelayWarning("最多只能选择10个文件，您已超出文件个数！");
            el.target.value=null;
            return;
          }
          if((files.length + this.fileList.length) > this.maxFiles){
            this.$DelayWarning("最多只能上传10个文件，您还能上传"+(this.maxFiles - this.fileList.length)+"个！");
            el.target.value=null;
            return;
          }
          for(let i = 0;i<files.length;i++){
            let file = files[i];
            if(file.size == 0){
              this.$DelayWarning(`${file.name}为空文件，不能上传`);
              return;
            }
            if(file.size > 1024*1024*50){
              this.$DelayWarning(`${file.name}文件超过50M，不能上传`);
              return;
            }
            this.fileIsLoading = true;
            this.selectedFileCount += 1;
            this.uploadFile(file,function(){
              this.uploadedFileCount += 1;
              if(this.uploadedFileCount == this.selectedFileCount){
                this.fileIsLoading = false;
                this.uploadedFileCount = this.selectedFileCount = 0;
              }
            });
          }
          el.target.value=null;
        }
      },
      deleteFile(item,index){
        this.fileList.splice(index,1);
      },
      // 文件类型
      fileType (attr) {
        let _this = this        
        var file_type =''
        let fileName = attr.lastIndexOf(".");//取到文件名开始到最后一个点的长度
        let fileNameLength = attr.length;//取到文件名长度
        let SuffixName = (attr.substring(fileName + 1, fileNameLength)).toLowerCase(); //截取到后缀名,并且转换成小写
        const iconObj = {
          doc: 'doc-div-icon',
          docx: 'doc-div-icon',
          xls: 'excel-div-icon',
          xlsx: 'excel-div-icon',
          png: 'picture-div-icon',
          jpg: 'picture-div-icon',
          jpeg: 'picture-div-icon',
          gif: 'picture-div-icon'
        }
        return file_type = iconObj[SuffixName] || 'others-div-icon';
      },
      // 是否还在上传
      isUploading(){
        return this.fileIsLoading;
      },
      // 获取已上传的文件列表
      getUploadedFiles(){
        return this.fileList;
      }
    }
  }
</script>

<style scoped lang="scss">
  .add-file-card{
    border:1px solid #dcdcdc;
    overflow-y: auto;
    padding:5px;
    .file-icon{
      background: url(../assets/img/upload_file.png) no-repeat;
      background-size:100%;
      color:#333;
    }
  }
  .div-reuplod{
    position: relative;
    cursor: pointer;
    text-align: center;
    input{
      position: absolute;
      top: -4px;
      left: 73px;
      width: 100px;;
      height: 33px;
      opacity: 0;
      background: transparent;
      border:none;
      outline: none;
      cursor: pointer;
    }
    span{
      border-radius: 30px;
      color:rgba(69,172,255,1);
      border: 1px solid rgba(69,172,255,1);
      font-size: 16px;
      padding: 7px 17px 7px 17px;
      cursor: pointer;
    }
  }
  .ivu-upload-list{
    margin: 0px;
    text-align: left;
    li.ivu-upload-list-file:hover{
      background: none;
    }
    li{
      text-align: center;
      float: left;
      width: 130px;
      height:130px;
      margin: 10px;
      border: 1px solid #dcdcdc;
    }
    .the-add-icon{
      position: relative;
      font-size: 18px;
      width: 98px;
      margin: 0 auto;
      padding: 10px 15px;
      font-size: 14px;
      .others-file-add-icon{
        width: 68px;
        height: 66px;
        background: url(../assets/img/upload_file.png) no-repeat;
      }
      .add-files-tips{
        font-size: 13px;
        color: #999;
      }
      input{
        position:absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
        opacity: 0;
        background: transparent;
        border:none;
        outline: none;
        cursor: pointer;
      }
    }
  }

  .file-card-body{
    text-align: center;
    .added-files{
      font-size:0;
      position: relative;
    }
    .uploaded-file-icon{
      height: 60px;
      width: 60px;
      margin:0 auto;
    }
    .remove-file{
      display: none;
    }
    .fileName{
      color: #333;
      height: 60px;
      line-height: 60px;
      font-size:12px;
      span{
        display: inline-block;
        line-height: 20px;
        word-break: break-all;
        word-wrap: break-word;
        word-wrap: anywhere;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
    }

    .added-files:hover{
      .remove-file{
        display: inline-block;
        width: 23px;
        height: 23px;
        background: url(../assets/img/del_files.png) no-repeat;
        position: absolute;
        top: 0;
        right: 20px;
        cursor: pointer;
      }
    }
  }
  .doc-div-icon{
    background: url("../assets/img/word.png") no-repeat;
    background-position: 0 -6px;
  }
  .excel-div-icon{
    background: url("../assets/img/excel.png") no-repeat;
    background-position: 0 -6px;
  }
  .picture-div-icon{
    background: url("../assets/img/picture.png") no-repeat;
    background-position: 0 -6px;
  }
  .others-div-icon{
    background: url("../assets/img/others_files.png") no-repeat;
    background-position: 0 -6px;
  }
  .demo-spin-icon-load{
    animation: anidemospin 1s linear infinite;
  }
  @keyframes anidemospin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>