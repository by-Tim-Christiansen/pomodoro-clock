/*
 * =================================
 * =================================
 * Copyright (c) 2018 Hauke Grothues
 * =================================
 * =================================
 */

//animate timer circle when page loads
var c = $('#circle'); // declare variable to skim on typing
c.circleProgress({
  startAngle: -Math.PI / 4 * 2,
  value: 1,
  size: 160,
  fill: {color: "#E74C3C"},
  animation: { duration: 1000, easing: "circleProgressEasing" }
});
// main function
$(document).ready(function(){

  // declare variables for timer
  var sessionLength = 25, breakLength = 5, longBreakLength = 15;
  var pomoTimer = new Timer();
  var totalSessions = 0;
  var currentColor = "#E74C3C";
  var isSession = true;
  var timeInSeconds;
  var notifTitle = "";
  var notifBody = "";

  // ask for permission to send notifications
  if (Push.Permission.has() !== true) {
    Push.Permission.request();
  }

  // setup star-rating in feedback-form
  var options = {
    symbols: {
            utf8_star: {
                base: '&#9734;',
                hover: '&#9733;',
                selected: '&#9733;',
            }
          },
    max_value: 5,
    step_size: 1,
  };
  $(".rating").rate(options);
  $(".rating").on("change", function(){
    $("#rating-field").attr("value", ($(".rating").rate("getValue")));
  });

  // function to play notification sound
  function play() {
    var audio=document.getElementById('audio1');
    audio.play();
  }

  // open/close feedback-form
  $(".feedback-btt").click(function(){
    $(".feedback-div").toggleClass("hide");
  });

  // interacting with timer
  $(".play-pause").click(function() {
    if (pomoTimer.getStatus() == 'initialized' || pomoTimer.getStatus() == 'stopped') {
      $(".play-pause").css("pointer-events", "none");
      setTimeout(function() {
        $(".play-pause").css("pointer-events", "auto");
      }, 1000);
    }
    runTimer(sessionLength);
  });

  function runTimer(time) {

    // START TIMER FROM SCRATCH
    if(pomoTimer.getStatus() == 'initialized' || pomoTimer.getStatus() == 'stopped') {
      c.circleProgress({
        animationStartValue: 1,
        value: 0,
        animation: {duration: 1000, easing: "circleProgressEasing"}
      });
      timeInSeconds = time * 60;

      // do this every second:
      pomoTimer.on("ontick", function() {

        // convert current time progress to MM:SS format
        var ms = pomoTimer.getDuration();
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);

        // display current time progress and show minutes-1:00 instead of minutes:60
        if (((seconds < 10 ? '0' : '') + seconds) == '60') {
          $(".timeDigital").text(minutes + 1 + ":00");
        }
        else {
          $(".timeDigital").text(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
        }

      });

      // animate timer when it gets started
      pomoTimer.on("onstart", function() {

        c.circleProgress({
          animationStartValue: 0,
          value: 1,
          animation: {duration: pomoTimer.getDuration(), easing: 'linear'}
        });

      });

      // start timer and define what to do when it has expired
      setTimeout(function() {pomoTimer.start(timeInSeconds).on('end', function () {

        // switch from pause icon to play icon and play sound effect
        $("#play").removeClass("hide");
        $("#pause").addClass("hide");
        // DOES NOT WORK ANYMORE: playAlert('glass');

        // add a small circle and change the pop-up if the expired session was a work session
        if (isSession) {
          notifTitle = "Work Session is over";
          notifBody = "You've worked enough, time for a break!";
          totalSessions += 1;
          $(".start").text("Start Break");
            if(totalSessions % 4 == 0) {
              $(".start").text("Start Long Break");
            }
          $(".pop-up-header").text("Work session done!");
          $(".eight_circles div:nth-of-type(" + totalSessions + ")").addClass("active");
          $(".alt-opt").css("display", "inline");
          $("#break-popup").removeClass("hide");
        }
        // otherwise it was a break and just the pop-up is changed accordingly
        else {
          notifTitle = "Your break is over";
          notifBody = "Time to get back to work!";
          $(".start").text("Go!");
          $(".pop-up-header").text("Break is over, let's get back to work!");
          $(".alt-opt").css("display", "none");
          $("#break-popup").removeClass("hide");
        }
        Push.create(notifTitle, {
            body: notifBody,
            icon: 'timer.png',
            timeout: 20000,
            tag: "notification",
            onClick: function () {
                window.focus();
                this.close();
            }
        });
        play();
      }); }, 1000);
    }

    // PAUSE TIMER
    else if (pomoTimer.getStatus() == 'started') {
      pomoTimer.pause();
      $(c.circleProgress('widget')).stop();
    }

    // CONTINUE AFTER TIMER WAS PAUSED
    else {
      pomoTimer.start();
      c.circleProgress({
        animationStartValue: 1- (pomoTimer.getDuration() / (timeInSeconds * 1000)),
        value: 1,
        animation: {duration: pomoTimer.getDuration(), easing: "linear"}
      });
    }
  }

  // RESET TIMER
  $(".reset").click(function() {

    if (pomoTimer.getStatus() !== 'initialized') {
    c.circleProgress({
      animationStartValue: 1- (pomoTimer.getDuration() / (timeInSeconds * 1000)),
      value: 1,
      animation: {duration: 1000, easing: "circleProgressEasing"}
    });
    pomoTimer.stop();
    // set play icon:
    $("#play").removeClass("hide");
    $("#pause").addClass("hide");
    // display break or session length:
    if (isSession) {
      $(".timeDigital").text(sessionLength + ":00");
    }
    else {
      $(".timeDigital").text(breakLength + ":00");
    }
  }
  });

  // switch between play and pause button on click
  $(".play-pause").click(function() {
    $("#play, #pause").toggleClass("hide");
  });

  // start break/work session and close pop-up when button clicked
  $(".start").click(function() {

    // start break:
    if ($(".start").html() == "Start Break") {
      $(".timeDigital").text(breakLength + ":00");
      runTimer(breakLength);
      isSession = false;
    }
    // start work session:
    else {
      $(".timeDigital").text(sessionLength + ":00");
      runTimer(sessionLength);
      isSession =  true;
    }
    // hide pop-up and set pause icon:
    $("#break-popup").addClass("hide");
    $("#pause").removeClass("hide");
    $("#play").addClass("hide");

  });

  // start another work session without having a break in between
  $(".next").click(function() {

    $(".timeDigital").text(sessionLength + ":00");
    runTimer(sessionLength);
    isSession = true;
    // hide pop-up and set pause icon:
    $("#break-popup").addClass("hide");
    $("#pause").removeClass("hide");
    $("#play").addClass("hide");

  });

  // make sure session and break values stay between 1 and 60
  function checkVal(value) {
    if(value >= 1 && value <= 60) {
      return true;
    }
  }

  // adjust session and break length on click
  $(".num").click(function() {

    var classOfEl = $(this).attr("class");
    switch(classOfEl){
      case "num session-":
        if (checkVal(sessionLength - 1)) {
          sessionLength -= 1;
          $(".session").text(sessionLength);
          $(".timeDigital").text(sessionLength + ":00");
        }
        break;
      case "num session+":
        if (checkVal(sessionLength + 1)) {
          sessionLength += 1;
          $(".session").text(sessionLength);
          $(".timeDigital").text(sessionLength + ":00");
        }
        break;
      case "num break-":
        if (checkVal(breakLength - 1)) {
          breakLength -= 1;
          $(".break").text(breakLength);
          if (isSession == false) {
            $(".timeDigital").text(breakLength + ":00");
          }
        }
        break;
      case "num break+":
        if (checkVal(breakLength + 1)) {
          breakLength += 1;
          $(".break").text(breakLength);
          if (isSession == false) {
            $(".timeDigital").text(breakLength + ":00");
          }
        }
        break;
      case "num longbreak-":
        if (checkVal(longBreakLength - 1)) {
          longBreakLength -= 1;
          $(".longbreak").text(longBreakLength);
          if (totalSession > 0 && totalSessions % 4 == 0) {
            $(".timeDigital").text(longBreakLength + ":00");
          }
        }
        break;
      case "num longbreak+":
        if (checkVal(longBreakLength + 1)) {
          longBreakLength += 1;
          $(".longbreak").text(longBreakLength);
          if (totalSession > 0 && totalSessions % 4 == 0) {
            $(".timeDigital").text(longBreakLength + ":00");
          }
        }
        break;
    }
  });

  // change color of every colored element
  function changeTheme(colorClass, hex) {

    $("body").removeClass().addClass(colorClass);
    $(".active").css("background-color", hex);
    c.circleProgress({
      fill: {color: hex},
      animation: false
    });

  }

  // change color theme on click
  $(".cpicker").click(function() {

    var className = $(this).attr('class');
    switch(className){
      case 'total g cpicker':
        changeTheme("g", "#2ECC71");
        break;
      case 'total o cpicker':
        changeTheme("o", "#E67E22");
        break;
      case 'total b cpicker':
        changeTheme("b", "#3498DB");
        break;
      case 'total r cpicker':
        changeTheme("r", "#E74C3C");
        break;
    }
  });

  // toggle between timer and settings page
  $('.options').click(function() {
      $(".settingspage").toggleClass("hide");
  });

  // show hints on button click
  $(".info-btt").click(function() {
    $(".info-btt").toggleClass("active");
    $(".info").toggleClass("hide");
  });

  // show thank you when form submitted

      $('#feedback-form').ajaxForm( function() {
          $(".feedback").fadeOut(100);
          //$(".rating").fadeOut("slow");
          //$(".user-input").fadeOut("slow");
          $(".form-thankyou").delay(5000).removeClass("hide");
      });



});
