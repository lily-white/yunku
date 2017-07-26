$.config = {router: false};
/*
 zepto.numStep.js
 ld 2016.09.29
 */

(function ($) {

  /*
   参数：options
   min: 最小数量
   max: 最大数量
   priceCon: 显示总价的筛选id或class
   */
  var NumStep = function (element, options) {
    //合并参数设置
    this.options = $.extend({}, NumStep.defaults, options);

    this.$element = $(element);

    this.options = $.extend({},{
      min: this.$element.data('min'),
      max: this.$element.data('max')
    })

    this.init();
  };

  NumStep.pluginName = 'numStep';

  NumStep.dataName = 'numStepData';

  NumStep.version = '1.0.0';

  NumStep.defaults = {
    min: 1,
    max: 100000000
  };

  NumStep.prototype = {

    init: function () {
      this.$minus = this.$element.find('.minus-bar');
      this.$plus = this.$element.find('.plus-bar');
      this.$num = this.$element.find('.num-show');
      this.num = parseInt(this.$num.val()),
      this.barEvent();
    },

    barEvent: function () {
      var numstep = this;

      this.$minus.on('click',function (e) {
        if ($(this).hasClass('disabled')) {
          return false;
        } else {
          numstep.num--;
          if (numstep.num < numstep.options.max && numstep.$plus.hasClass('disabled')) {
            numstep.$plus.removeClass('disabled');
          }
          if (numstep.num == numstep.options.min) {
            $(this).addClass('disabled');
          }
          numstep.showResult();
        }
      });

      this.$plus.on('click',function (e) {
        if ($(this).hasClass('disabled')) {
          return false;
        } else {
          numstep.num++;
          if (numstep.num > numstep.options.min && numstep.$minus.hasClass('disabled')) {
            numstep.$minus.removeClass('disabled');
          }
          if (numstep.num == numstep.options.max) {
            $(this).addClass('disabled');
          }
          numstep.showResult();
        }
      });

      this.$num.on('input', function (e) {
        numstep.num = this.value;
        if (numstep.num > numstep.options.min && numstep.$minus.hasClass('disabled')) {
            numstep.$minus.removeClass('disabled');
          }
        if (numstep.num == numstep.options.max) {
         numstep.$plus.addClass('disabled');
        }
        if (numstep.num < numstep.options.max && numstep.$plus.hasClass('disabled')) {
          numstep.$plus.removeClass('disabled');
        }
        if (numstep.num == numstep.options.min) {
          numstep.$minus.addClass('disabled');
        }
        numstep.showResult();
      });
    },

    showResult: function () {
      this.$num.attr({
        'data-num': this.num
      }).val(this.num);
    }
  };


  /**
   * 定义插件，扩展$.fn，为Zepto对象提供新的插件方法
   * 调用方式：$.fn.numStep()
   * @param option {string/object}
   */
  $.fn[NumStep.pluginName] = function (option) {
    return this.each(function () {
      var $this = $(this);

      var data = $.fn[NumStep.pluginName].pluginData[$this.data(NumStep.dataName)];
      var options = typeof option == 'object' && option;

      //只实例化一次，后续如果再次调用了该插件时，则直接获取缓存的对象
      if (!data) {
        //zepto的data方法只能保存字符串，所以用此方法解决一下
        $.fn[NumStep.pluginName].pluginData[++$.fn[NumStep.pluginName].pluginData.index] = new NumStep(this, options);
        $this.data(NumStep.dataName, $.fn[NumStep.pluginName].pluginData.index);
        data = $.fn[NumStep.pluginName].pluginData[$this.data(NumStep.dataName)];
      }

      //如果插件的参数是一个字符串，则直接调用插件的名称为此字符串方法
      if (typeof option == 'string') data[option]();
    });
  };

  /**
   * zepto的data方法只能保存字符串，所以用一个对象来存储data
   * @type {{index: number}}
   */
  $.fn[NumStep.pluginName].pluginData = {index: 0};

  $.fn[NumStep.pluginName].Constructor = Plugin;

  /**
   * 可选：
   * 通过在 dom 上定义 data-role='pluginName' 的方式，自动实例化插件，省去页面编写代码
   * 在这里还可以扩展更多配置，仅仅通过 data 属性 API 就能使用插件
   */
  $(document).ready(function () {
    $('[data-role="' + NumStep.pluginName + '"]').each(function () {
      var $this = $(this);
      var data = $.fn[NumStep.pluginName].pluginData[$this.data(NumStep.dataName)];

      // ...

      $.fn[NumStep.pluginName].call($this, data);
    });
  });

})(Zepto);
function isRepeat(elem) {
  if(elem.prop("repeat")) {
    return true;
  }else{
    elem.prop("repeat", true);
    return false;
  }
}