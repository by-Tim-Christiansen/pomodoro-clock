var c=$("#circle");c.circleProgress({startAngle:-Math.PI/4*2,value:1,size:160,fill:{color:"#E74C3C"},animation:{duration:1e3,easing:"circleProgressEasing"}}),$(document).ready(function(){function e(){document.getElementById("audio1").play()}function t(t){"initialized"==r.getStatus()||"stopped"==r.getStatus()?(c.circleProgress({animationStartValue:1,value:0,animation:{duration:1e3,easing:"circleProgressEasing"}}),d=60*t,r.on("ontick",function(){var e=r.getDuration(),t=Math.floor(e/6e4),a=(e%6e4/1e3).toFixed(0);(a<10?"0":"")+a=="60"?$(".timeDigital").text(t+1+":00"):$(".timeDigital").text(t+":"+(a<10?"0":"")+a)}),r.on("onstart",function(){c.circleProgress({animationStartValue:0,value:1,animation:{duration:r.getDuration(),easing:"linear"}})}),setTimeout(function(){r.start(d).on("end",function(){$("#play").removeClass("hide"),$("#pause").addClass("hide"),g?(p="Work Session is over",k="You've worked enough, time for a break!",l+=1,$(".start").text("Start Break"),l%4==0&&$(".start").text("Start Long Break"),$(".pop-up-header").text("Work session done!"),$(".eight_circles div:nth-of-type("+l+")").addClass("active"),$(".alt-opt").css("display","inline"),$("#break-popup").removeClass("hide")):(p="Your break is over",k="Time to get back to work!",$(".start").text("Go!"),$(".pop-up-header").text("Break is over, let's get back to work!"),$(".alt-opt").css("display","none"),$("#break-popup").removeClass("hide")),Push.create(p,{body:k,icon:"timer.png",timeout:2e4,tag:"notification",onClick:function(){window.focus(),this.close()}}),e()})},1e3)):"started"==r.getStatus()?(r.pause(),$(c.circleProgress("widget")).stop()):(r.start(),c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*d),value:1,animation:{duration:r.getDuration(),easing:"linear"}}))}function a(e){if(e>=1&&e<=60)return!0}function i(e,t){$("body").removeClass().addClass(e),$(".active").css("background-color",t),c.circleProgress({fill:{color:t},animation:!1})}var s=25,o=5,n=15,r=new Timer,l=0,u="#E74C3C",g=!0,d,p="",k="";!0!==Push.Permission.has()&&Push.Permission.request();var m={symbols:{utf8_star:{base:"&#9734;",hover:"&#9733;",selected:"&#9733;"}},max_value:5,step_size:1};$(".rating").rate(m),$(".rating").on("change",function(){$("#rating-field").attr("value",$(".rating").rate("getValue"))}),$(".feedback-btt").click(function(){$(".feedback-div").toggleClass("hide")}),$(".play-pause").click(function(){"initialized"!=r.getStatus()&&"stopped"!=r.getStatus()||($(".play-pause").css("pointer-events","none"),setTimeout(function(){$(".play-pause").css("pointer-events","auto")},1e3)),t(s)}),$(".reset").click(function(){"initialized"!==r.getStatus()&&(c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*d),value:1,animation:{duration:1e3,easing:"circleProgressEasing"}}),r.stop(),$("#play").removeClass("hide"),$("#pause").addClass("hide"),g?$(".timeDigital").text(s+":00"):$(".timeDigital").text(o+":00"))}),$(".play-pause").click(function(){$("#play, #pause").toggleClass("hide")}),$(".start").click(function(){"Start Break"==$(".start").html()?($(".timeDigital").text(o+":00"),t(o),g=!1):($(".timeDigital").text(s+":00"),t(s),g=!0),$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),$(".next").click(function(){$(".timeDigital").text(s+":00"),t(s),g=!0,$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),$(".num").click(function(){switch($(this).attr("class")){case"num session-":a(s-1)&&(s-=1,$(".session").text(s),$(".timeDigital").text(s+":00"));break;case"num session+":a(s+1)&&(s+=1,$(".session").text(s),$(".timeDigital").text(s+":00"));break;case"num break-":a(o-1)&&(o-=1,$(".break").text(o),0==g&&$(".timeDigital").text(o+":00"));break;case"num break+":a(o+1)&&(o+=1,$(".break").text(o),0==g&&$(".timeDigital").text(o+":00"));break;case"num longbreak-":a(n-1)&&(n-=1,$(".longbreak").text(n),totalSession>0&&l%4==0&&$(".timeDigital").text(n+":00"));break;case"num longbreak+":a(n+1)&&(n+=1,$(".longbreak").text(n),totalSession>0&&l%4==0&&$(".timeDigital").text(n+":00"));break}}),$(".cpicker").click(function(){switch($(this).attr("class")){case"total g cpicker":i("g","#2ECC71");break;case"total o cpicker":i("o","#E67E22");break;case"total b cpicker":i("b","#3498DB");break;case"total r cpicker":i("r","#E74C3C");break}}),$(".options").click(function(){$(".settingspage").toggleClass("hide")}),$(".info-btt").click(function(){$(".info-btt").toggleClass("active"),$(".info").toggleClass("hide")}),$("#feedback-form").ajaxForm(function(){$(".feedback").fadeOut(100),$(".form-thankyou").delay(5e3).removeClass("hide")})});