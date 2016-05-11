/*! author hardy */
;(function($){
        $.fn.countdown = function(options){
            var localNow = new Date().getTime();
            options = $.extend({
                startTime: localNow,
                endTime: localNow + 60*60*24*1000,
                speed:1000,
                text:{
                    day:"天",
                    hour:"小时",
                    minute:"分钟",
                    second:"秒"
                },
                totalTime:function(){
                    var total = this.endTime - this.startTime
                    return total < 0 ? 0 : total;
                },
                wrap:"span"
            }, options);

            var formatTime = function (totalSeconds, outerWrap){
                var opts = options, desc = opts.text;
                var dayWrap  = document.createElement(options.wrap),
                 hourWrap  = document.createElement(options.wrap),
                 minuWrap  = document.createElement(options.wrap),
                 secoWrap  = document.createElement(options.wrap);
                outerWrap.appendChild(dayWrap);
                outerWrap.appendChild(document.createTextNode(desc.day));
                outerWrap.appendChild(hourWrap);
                outerWrap.appendChild(document.createTextNode(desc.hour));
                outerWrap.appendChild(minuWrap);
                outerWrap.appendChild(document.createTextNode(desc.minute));
                outerWrap.appendChild(secoWrap);
                outerWrap.appendChild(document.createTextNode(desc.second));

                var updateTime = function(totalSeconds){
                    dayWrap.innerHTML = parseInt(totalSeconds/(60*60*24)) + "";
                    var restHours = totalSeconds % (60*60*24);
                    hourWrap.innerHTML= parseInt(restHours/(60*60)) + "";
                    var restMinus = restHours % (60*60);
                    minuWrap.innerHTML= parseInt(restMinus/60) + "";
                    secoWrap.innerHTML= restMinus%60 + "";
                    
                    setTimeout(function(){
                        updateTime(totalSeconds - opts.speed/1000);
                    }, opts.speed);
                };
                updateTime(totalSeconds);
            };

            return this.each(function(){
              formatTime(options.totalTime()/1000, this);
            });
        };

   
      })(jQuery);
