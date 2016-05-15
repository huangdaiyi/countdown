/*! author hardy */
;(function($){
        $.fn.countdown = function(options){
            var localNow = new Date().getTime();
            options = $.extend({
                startTime: localNow,
                endTime: localNow + 60*60*24*1000*1,
                speed:1000,
                text:{
                    day:"天",
                    hour:"时",
                    minute:"分",
                    second:"秒"
                },
                totalTime:function(){
                    var total = this.endTime - this.startTime
                    return total < 0 ? 0 : total;
                },
                wrap:"span",
                descWrap:"span"
            }, options);

            var formatTime = function (totalSeconds, outerWrap){
                var opts = options, desc = opts.text;
                var dayWrap  = document.createElement(options.wrap),
                 hourWrap  = document.createElement(options.wrap),
                 minuWrap  = document.createElement(options.wrap),
                 secoWrap  = document.createElement(options.wrap);
                outerWrap.appendChild(dayWrap);
                outerWrap.appendChild(createDescWrap(desc.day));
                outerWrap.appendChild(hourWrap);
                outerWrap.appendChild(createDescWrap(desc.hour));
                outerWrap.appendChild(minuWrap);
                outerWrap.appendChild(createDescWrap(desc.minute));
                outerWrap.appendChild(secoWrap);
                outerWrap.appendChild(createDescWrap(desc.second));

                var updateTime = function(totalSeconds){
                    updateWrapValue(dayWrap, parseInt(totalSeconds/(60*60*24)));
                    var restHours = totalSeconds % (60*60*24);
                    updateWrapValue(hourWrap, parseInt(restHours/(60*60)));
                    var restMinus = restHours % (60*60);
                    minuWrap.innerHTML= zeroFill(parseInt(restMinus/60));
                    secoWrap.innerHTML =  zeroFill(restMinus%60);
                    setTimeout(function(){
                        var restSeconds = totalSeconds - opts.speed/1000;
                        if(restSeconds > 0){
                            updateTime(restSeconds);
                        }else {
                            //TODO:clear
                        }

                    }, opts.speed);
                };
                updateTime(totalSeconds);
            };

            return this.each(function(){
              formatTime(parseInt(options.totalTime()/1000), this);
            });

            function updateWrapValue(wrap, value) {
                var prev = wrap.previousElementSibling;
                if(value < 1 && (!prev || prev.style.display !== "none")){
                    wrap.style.display = "none";
                    wrap.nextElementSibling.style.display = "none";
                }else {
                    wrap.innerHTML= zeroFill(value);
                }
            };

            function createDescWrap(desc) {
                var temp = document.createElement(options.descWrap);
                temp.innerHTML = desc;
                return temp;
            };

            function zeroFill(intValue){
            	return intValue < 10 ? "0"+ intValue: intValue + ""
            }
        };
      })(jQuery);
