/* eslint-disable */
import directive from './directives'

const importDirective = Vue => {
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */
  Vue.directive('draggable', directive.draggable)
  /**
   * clipboard指令 v-draggable="options"
   * options = {
   *  value:    /在输入框中使用v-model绑定的值/,
   *  success:  /复制成功后的回调/,
   *  error:    /复制失败后的回调/
   * }
   */
  Vue.directive('clipboard', directive.clipboard)



  Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    }
  });

  Vue.directive('clickoutside',{
      bind:function(el,binding,vnode){
        function documentHandler(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        el.__toggleType__ = binding.arg || 'click';
        document.addEventListener(el.__toggleType__,documentHandler);
      },
      unbind:function(el){
          document.removeEventListener(el.__toggleType__,el.__vueClickOutside__);
          delete el.__vueClickOutside__;
      }
  })

  Vue.directive('resize',{
      bind:function(el,binding,vnode){
          function documentHandler(e){
              if(binding.expression){
                  binding.value(e,el);
              }
          }
          el.__resize__ = documentHandler;
          window.addEventListener('resize',documentHandler);
      },
      unbind:function(el,binding,vnode){
          window.removeEventListener('resize',el.__resize__);
          delete el.__resize__;
      }
  });

  Vue.directive('oncontextmenu',{
      bind:function(el,binding,vnode){
          function documentHandler(e){
              var event = event || window.event;
              event.preventDefault?(event.preventDefault()):(event.returnValue = false);
              if(binding.expression){
                  binding.value(e);
              }
          }
          el.__handEvent__ = documentHandler;
          el.addEventListener('contextmenu',documentHandler);
      },
      unbind:function(el,binding,vnode){
          el.removeEventListener('contextmenu',el.__handEvent__);
          delete el.__handEvent__;
      }
  });

  Vue.directive('enterNumber', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }                            
        }
      });
    }
  });


  Vue.directive('enterNumberMe', {
    inserted: function (el) {
      el.addEventListener("input",function(e){
        e = e || window.event;
        let value  = e.target.value;
        value = value.replace(/\D/,'')
        e.target.value = value
      });
    }
  });
}

export default importDirective
