/**
 * 首页图片的滑动
 */
define(function(require, exports, module) {
    var Event = require("addEvent.js");
    var _timer, _move = function(ele, to, from) {
        from = from || parseFloat(ele.style.left) || 0;
        if (Math.abs(to - from) > 2) {
            ele.style.left = (to - (to - from) / 3) + "px";
            _timer = setTimeout(function() {
                _move(ele, to);
            }, 50);
        } else {
            ele.style.left = to + "px";
        }
        /*  _timer = setInterval(function() {
         var top = parseInt(ele.style.top);
         if (Math.abs(Math.abs(top)-Math.abs(to)) > 2) {
         ele.style.top = top + step +"%";
         } else {
         ele.style.top = (to) + "%";
         clearInterval(_timer);
         }
         }, 50);*/
    };
    return {
        index: 0,
        visible: 4,
        init: function(box) {
            var length, self = this;
            if (!box) return;
            length = box.getElementsByTagName("li").length;
            Event.addEvent(box.parentNode, "mousewheel", function(event) {
                if (event.delta > 0 && self.index > 0) {
                    self.index--;
                } else if (event.delta < 0 && self.index < length - self.visible) {
                    self.index++;
                } else {
                    return;
                }

                clearTimeout(_timer);
                _move(box, -1 * self.index * 140);

                event.preventDefault();
            });
        }
    };
});
