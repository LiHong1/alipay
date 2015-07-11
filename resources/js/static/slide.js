/**
 * 首页图片的滑动
 */

define(function(require, exports, module) {
    var Event = require("./addEvent.js");
    var _timer,_initTimer, _move;
    _initTimer = function(){
        _timer = null;
    };
    _move = function(ele,from,to,step) {
        _timer = setInterval(function() {
            var top = parseInt(ele.style.top)||0;
            if (Math.abs(top - to) > 2) {
                ele.style.top = top + step +"%";
            } else {
                ele.style.top = (to) + "%";
                clearInterval(_timer);
                setTimeout(_initTimer,500);
            }
        }, 25);
    };

    return{
            index: 0,
            init:function(box) {
                var length,to,self = this;
                if (!box) return;
                length = box.children.length;
                Event.addEvent(document, "mousewheel", function(event) {
                    if(!_timer){
                    if (event.delta > 0 && self.index > 0) {
                        self.index--;
                    } else if (event.delta < 0 && self.index < length ) {
                        self.index++;
                    } else {
                        return;
                    }
                    var from = parseInt(box.style.top);
                    if(!from){
                        from = 0;
                    }
                    to = -1 * self.index * 100;
                    _move(box,from,to,(to-from)/20);
                    }
                    event.preventDefault();
                });
            }
    };
});
