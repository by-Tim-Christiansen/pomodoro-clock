var c=$("#circle");c.circleProgress({startAngle:-Math.PI/4*2,value:1,size:160,fill:{color:"#E74C3C"},animation:{duration:1e3,easing:"circleProgressEasing"}}),$(document).ready(function(){function e(e){"initialized"==r.getStatus()||"stopped"==r.getStatus()?(c.circleProgress({animationStartValue:1,value:0,animation:{duration:1e3,easing:"circleProgressEasing"}}),g=60*e,r.on("ontick",function(){var e=r.getDuration(),t=Math.floor(e/6e4),a=(e%6e4/1e3).toFixed(0);(a<10?"0":"")+a=="60"?$(".timeDigital").text(t+1+":00"):$(".timeDigital").text(t+":"+(a<10?"0":"")+a)}),r.on("onstart",function(){c.circleProgress({animationStartValue:0,value:1,animation:{duration:r.getDuration(),easing:"linear"}})}),setTimeout(function(){r.start(g).on("end",function(){$("#play").removeClass("hide"),$("#pause").addClass("hide"),u?(d="Work Session is over",k="You've worked enough, time for a break!",n+=1,$(".start").text("Start Break"),n%4==0&&$(".start").text("Start Long Break"),$(".pop-up-header").text("Work session done!"),$(".eight_circles div:nth-of-type("+n+")").addClass("active"),$(".alt-opt").css("display","inline"),$("#break-popup").removeClass("hide")):(d="Your break is over",k="Time to get back to work!",$(".start").text("Go!"),$(".pop-up-header").text("Break is over, let's get back to work!"),$(".alt-opt").css("display","none"),$("#break-popup").removeClass("hide")),Push.create(d,{body:k,icon:"timer.png",timeout:2e4,tag:"notification",onClick:function(){window.focus(),this.close()}})})},1e3)):"started"==r.getStatus()?(r.pause(),$(c.circleProgress("widget")).stop()):(r.start(),c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*g),value:1,animation:{duration:r.getDuration(),easing:"linear"}}))}function t(e){if(e>=1&&e<=60)return!0}function a(e,t){$("body").removeClass().addClass(e),$(".active").css("background-color",t),c.circleProgress({fill:{color:t},animation:!1})}!0!==Push.Permission.has()&&Push.Permission.request();var i=25,s=5,o=15,r=new Timer,n=0,l="#E74C3C",u=!0,g,d="",k="";$(".play-pause").click(function(){e(i)}),$(".reset").click(function(){c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*g),value:1,animation:{duration:1e3,easing:"circleProgressEasing"}}),r.stop(),$("#play").removeClass("hide"),$("#pause").addClass("hide"),u?$(".timeDigital").text(i+":00"):$(".timeDigital").text(s+":00")}),$(".play-pause").click(function(){$("#play, #pause").toggleClass("hide")}),$(".start").click(function(){"Start Break"==$(".start").html()?($(".timeDigital").text(s+":00"),e(s),u=!1):($(".timeDigital").text(i+":00"),e(i),u=!0),$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),$(".next").click(function(){$(".timeDigital").text(i+":00"),e(i),u=!0,$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),$(".num").click(function(){switch($(this).attr("class")){case"num session-":t(i-1)&&(i-=1,$(".session").text(i),$(".timeDigital").text(i+":00"));break;case"num session+":t(i+1)&&(i+=1,$(".session").text(i),$(".timeDigital").text(i+":00"));break;case"num break-":t(s-1)&&(s-=1,$(".break").text(s),0==u&&$(".timeDigital").text(s+":00"));break;case"num break+":t(s+1)&&(s+=1,$(".break").text(s),0==u&&$(".timeDigital").text(s+":00"));break;case"num longbreak-":t(o-1)&&(o-=1,$(".longbreak").text(o),totalSession>0&&n%4==0&&$(".timeDigital").text(o+":00"));break;case"num longbreak+":t(o+1)&&(o+=1,$(".longbreak").text(o),totalSession>0&&n%4==0&&$(".timeDigital").text(o+":00"));break}}),$(".cpicker").click(function(){switch($(this).attr("class")){case"total g cpicker":a("g","#2ECC71");break;case"total o cpicker":a("o","#E67E22");break;case"total b cpicker":a("b","#3498DB");break;case"total r cpicker":a("r","#E74C3C");break}}),$(".options").click(function(){$(this).closest(".container").hasClass("landing")?$(".settingspage").removeClass("hide"):$(".settingspage").addClass("hide")})});