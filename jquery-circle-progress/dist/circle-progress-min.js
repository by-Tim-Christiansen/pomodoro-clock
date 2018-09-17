/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * The MIT License (MIT)

 * Copyright (c) 2014 Rostyslav Bryzgunov

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * @preserve
 */
!function(i){if("function"==typeof define&&define.amd)define(["jquery"],i);else if("object"==typeof module&&module.exports){var $=require("jquery");i($),module.exports=$}else i(jQuery)}(function($){function i(i){this.init(i)}i.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",insertMode:"prepend",constructor:i,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(i){$.extend(this,i),this.radius=this.size/2,this.initWidget(),this.initFill(),this.draw(),this.el.trigger("circle-inited")},initWidget:function(){this.canvas||(this.canvas=$("<canvas>")["prepend"==this.insertMode?"prependTo":"appendTo"](this.el)[0]);var i=this.canvas;if(i.width=this.size,i.height=this.size,this.ctx=i.getContext("2d"),window.devicePixelRatio>1){var t=window.devicePixelRatio;i.style.width=i.style.height=this.size+"px",i.width=i.height=this.size*t,this.ctx.scale(t,t)}},initFill:function(){function i(){var i=$("<canvas>")[0];i.width=t.size,i.height=t.size,i.getContext("2d").drawImage(u,0,0,n,n),t.arcFill=t.ctx.createPattern(i,"no-repeat"),t.drawFrame(t.lastFrameValue)}var t=this,e=this.fill,a=this.ctx,n=this.size;if(!e)throw Error("The fill is not specified!");if("string"==typeof e&&(e={color:e}),e.color&&(this.arcFill=e.color),e.gradient){var r=e.gradient;if(1==r.length)this.arcFill=r[0];else if(r.length>1){for(var s=e.gradientAngle||0,l=e.gradientDirection||[n/2*(1-Math.cos(s)),n/2*(1+Math.sin(s)),n/2*(1+Math.cos(s)),n/2*(1-Math.sin(s))],o=a.createLinearGradient.apply(a,l),h=0;h<r.length;h++){var c=r[h],d=h/(r.length-1);$.isArray(c)&&(d=c[1],c=c[0]),o.addColorStop(d,c)}this.arcFill=o}}if(e.image){var u;e.image instanceof Image?u=e.image:(u=new Image,u.src=e.image),u.complete?i():u.onload=i}},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(i){this.lastFrameValue=i,this.ctx.clearRect(0,0,this.size,this.size),this.drawEmptyArc(i),this.drawArc(i)},drawArc:function(i){if(0!==i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;t.save(),t.beginPath(),this.reverse?t.arc(e,e,e-a/2,n-2*Math.PI*i,n):t.arc(e,e,e-a/2,n,n+2*Math.PI*i),t.lineWidth=a,t.lineCap=this.lineCap,t.strokeStyle=this.arcFill,t.stroke(),t.restore()}},drawEmptyArc:function(i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;i<1&&(t.save(),t.beginPath(),i<=0?t.arc(e,e,e-a/2,0,2*Math.PI):this.reverse?t.arc(e,e,e-a/2,n,n-2*Math.PI*i):t.arc(e,e,e-a/2,n+2*Math.PI*i,n),t.lineWidth=a,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(i){var t=this,e=this.el,a=$(this.canvas);a.stop(!0,!1),e.trigger("circle-animation-start"),a.css({animationProgress:0}).animate({animationProgress:1},$.extend({},this.animation,{step:function(a){var n=t.animationStartValue*(1-a)+i*a;t.drawFrame(n),e.trigger("circle-animation-progress",[a,n])}})).promise().always(function(){e.trigger("circle-animation-end")})},getThickness:function(){return $.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(i){this.animation&&(this.animationStartValue=this.lastFrameValue),this.value=i,this.draw()}},$.circleProgress={defaults:i.prototype},$.easing.circleProgressEasing=function(i){return i<.5?.5*(i*=2)*i*i:1-.5*(i=2-2*i)*i*i},$.fn.circleProgress=function(t,e){var a="circle-progress",n=this.data(a);if("widget"==t){if(!n)throw Error('Calling "widget" method on not initialized instance is forbidden');return n.canvas}if("value"==t){if(!n)throw Error('Calling "value" method on not initialized instance is forbidden');if(void 0===e)return n.getValue();var r=arguments[1];return this.each(function(){$(this).data(a).setValue(r)})}return this.each(function(){var e=$(this),n=e.data(a),r=$.isPlainObject(t)?t:{};if(n)n.init(r);else{var s=$.extend({},e.data());"string"==typeof s.fill&&(s.fill=JSON.parse(s.fill)),"string"==typeof s.animation&&(s.animation=JSON.parse(s.animation)),r=$.extend(s,r),r.el=e,n=new i(r),e.data(a,n)}})}});
