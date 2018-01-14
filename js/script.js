var c = $('#circle');
c.circleProgress({
  startAngle: -Math.PI / 4 * 2,
  value: 1,
  size: 160,
  fill: {color: "#E74C3C"},
  animation: { duration: 1500, easing: "circleProgressEasing"}
});

$(document).ready(function(){
  // declare variables
  var sessionLength = 25, breakLength = 5;
  var currentTime = 0;
  var pomoTimer = new Timer();

  //animate circle when page loads

  // start timer when play button is clicked
    $(".play-pause").click(function() {
      $("#play, #pause").toggleClass("hide");
      c.circleProgress({
        animationStartValue: 1,
        value: 0,
        animation: {duration: 1000}
      });
      var selectedTime = sessionLength * 60;
      pomoTimer.on("ontick", function() {
        $(".timeDigital").text(pomoTimer.getDuration());
        currentTime += 1 / selectedTime;
        c.circleProgress({
          animationStartValue: currentTime - (1 / selectedTime),
          value: currentTime,
          animation: { duration: 1000, easing: "linear"}
        });
      });
      pomoTimer.start(selectedTime).on('end', function () {
        c.circleProgress({
          animationStartValue: currentTime,
          value: 1,
        });
      });
    });

    $(".reset").click(function() {
      pomoTimer.stop();
        c.circleProgress({
          value: 1,
          animationStartValue: currentTime,
        });
        $(".timeDigital").text(sessionLength + ":00");
        currentTime = 0;
    });

// make sure session and break values stay between 0 and 60
function checkVal(value) {
  if(value >= 0 && value <= 60) {
    return true;
  }
}

  // adjust session and break length
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
      }
      break;
    case "num break+":
      if (checkVal(breakLength + 1)) {
        breakLength += 1;
        $(".break").text(breakLength);
      }
     break;
  }
});

  // change color theme
  function changeTheme(colorClass, hex) {
    $("body").removeClass().addClass(colorClass);
    c.circleProgress({
      fill: {color: hex},
      animation: false
    });
  }

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
  if ( $(this).closest(".container").hasClass("landing") ){
    $('.settingspage').removeClass('hide');
  } else {
    $('.settingspage').addClass('hide');
  }
});
});
