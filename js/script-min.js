/*
 * =================================
 * =================================
 * Copyright (c) 2018 Hauke Grothues
 * =================================
 * =================================
 */
//animate timer circle when page loads
var c=$("#circle");// declare variable to skim on typing
c.circleProgress({startAngle:-Math.PI/4*2,value:1,size:160,fill:{color:"#E74C3C"},animation:{duration:1e3,easing:"circleProgressEasing"}}),
// main function
$(document).ready(function(){
// function to play notification sound
function t(){var e;document.getElementById("audio1").play()}
// open/close feedback-form
function e(e){
// START TIMER FROM SCRATCH
"initialized"==r.getStatus()||"stopped"==r.getStatus()?(c.circleProgress({animationStartValue:1,value:0,animation:{duration:1e3,easing:"circleProgressEasing"}}),d=60*e,
// do this every second:
r.on("ontick",function(){
// convert current time progress to MM:SS format
var e=r.getDuration(),t=Math.floor(e/6e4),a=(e%6e4/1e3).toFixed(0);
// display current time progress and show minutes-1:00 instead of minutes:60
(a<10?"0":"")+a=="60"?$(".timeDigital").text(t+1+":00"):$(".timeDigital").text(t+":"+(a<10?"0":"")+a)}),
// animate timer when it gets started
r.on("onstart",function(){c.circleProgress({animationStartValue:0,value:1,animation:{duration:r.getDuration(),easing:"linear"}})}),
// start timer and define what to do when it has expired
setTimeout(function(){r.start(d).on("end",function(){
// switch from pause icon to play icon and play sound effect
$("#play").removeClass("hide"),$("#pause").addClass("hide"),
// DOES NOT WORK ANYMORE: playAlert('glass');
// add a small circle and change the pop-up if the expired session was a work session
g?(k="Work Session is over",p="You've worked enough, time for a break!",l+=1,$(".start").text("Start Break"),l%4==0&&$(".start").text("Start Long Break"),$(".pop-up-header").text("Work session done!"),$(".eight_circles div:nth-of-type("+l+")").addClass("active"),$(".alt-opt").css("display","inline")):(k="Your break is over",p="Time to get back to work!",$(".start").text("Go!"),$(".pop-up-header").text("Break is over, let's get back to work!"),$(".alt-opt").css("display","none")),$("#break-popup").removeClass("hide"),Push.create(k,{body:p,icon:"timer.png",timeout:2e4,tag:"notification",onClick:function(){window.focus(),this.close()}}),t()})},1e3)):"started"==r.getStatus()?(r.pause(),$(c.circleProgress("widget")).stop()):(r.start(),c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*d),value:1,animation:{duration:r.getDuration(),easing:"linear"}}))}
// RESET TIMER
// make sure session and break values stay between 1 and 60
function a(e){if(1<=e&&e<=60)return!0}
// adjust session and break length on click
// change color of every colored element
function i(e,t){$("body").removeClass().addClass(e),$(".active").css("background-color",t),c.circleProgress({fill:{color:t},animation:!1})}
// change color theme on click
// declare variables for timer
var s=25,o=5,n=15,r=new Timer,l=0,u="#E74C3C",g=!0,d,k="",p="";
// ask for permission to send notifications
!0!==Push.Permission.has()&&Push.Permission.request();
// setup star-rating in feedback-form
var m={symbols:{utf8_star:{base:"&#9734;",hover:"&#9733;",selected:"&#9733;"}},max_value:5,step_size:1};$(".rating").rate(m),$(".rating").on("change",function(){$("#rating-field").attr("value",$(".rating").rate("getValue"))}),$(".feedback-btt").click(function(){$(".feedback-div").toggleClass("hide")}),
// interacting with timer
$(".play-pause").click(function(){"initialized"!=r.getStatus()&&"stopped"!=r.getStatus()||($(".play-pause").css("pointer-events","none"),setTimeout(function(){$(".play-pause").css("pointer-events","auto")},1e3)),e(s)}),$(".reset").click(function(){"initialized"!==r.getStatus()&&(c.circleProgress({animationStartValue:1-r.getDuration()/(1e3*d),value:1,animation:{duration:1e3,easing:"circleProgressEasing"}}),r.stop(),
// set play icon:
$("#play").removeClass("hide"),$("#pause").addClass("hide"),
// display break or session length:
g?$(".timeDigital").text(s+":00"):$(".timeDigital").text(o+":00"))}),
// switch between play and pause button on click
$(".play-pause").click(function(){$("#play, #pause").toggleClass("hide")}),
// start break/work session and close pop-up when button clicked
$(".start").click(function(){
// start break:
g="Start Break"==$(".start").html()?($(".timeDigital").text(o+":00"),e(o),!1):($(".timeDigital").text(s+":00"),e(s),!0),
// hide pop-up and set pause icon:
$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),
// start another work session without having a break in between
$(".next").click(function(){$(".timeDigital").text(s+":00"),e(s),g=!0,
// hide pop-up and set pause icon:
$("#break-popup").addClass("hide"),$("#pause").removeClass("hide"),$("#play").addClass("hide")}),$(".num").click(function(){var e;switch($(this).attr("class")){case"num session-":a(s-1)&&(s-=1,$(".session").text(s),$(".timeDigital").text(s+":00"));break;case"num session+":a(s+1)&&(s+=1,$(".session").text(s),$(".timeDigital").text(s+":00"));break;case"num break-":a(o-1)&&(o-=1,$(".break").text(o),0==g&&$(".timeDigital").text(o+":00"));break;case"num break+":a(o+1)&&(o+=1,$(".break").text(o),0==g&&$(".timeDigital").text(o+":00"));break;case"num longbreak-":a(n-1)&&(n-=1,$(".longbreak").text(n),0<totalSession&&l%4==0&&$(".timeDigital").text(n+":00"));break;case"num longbreak+":a(n+1)&&(n+=1,$(".longbreak").text(n),0<totalSession&&l%4==0&&$(".timeDigital").text(n+":00"));break}}),$(".cpicker").click(function(){var e;switch($(this).attr("class")){case"total g cpicker":i("g","#2ECC71");break;case"total o cpicker":i("o","#E67E22");break;case"total b cpicker":i("b","#3498DB");break;case"total r cpicker":i("r","#E74C3C");break}}),
// toggle between timer and settings page
$(".options").click(function(){$(".settingspage").toggleClass("hide")}),
// show hints on button click
$(".info-btt").click(function(){$(".info-btt").toggleClass("active"),$(".info").toggleClass("hide")}),
// show thank you when form submitted
$("#feedback-form").ajaxForm(function(){$(".feedback").fadeOut(100),
//$(".rating").fadeOut("slow");
//$(".user-input").fadeOut("slow");
$(".form-thankyou").delay(5e3).removeClass("hide")})});