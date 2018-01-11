$(document).ready(function(){

  // declare variables
  var c = $('#circle');
  var sessionLength = 25, breakLength = 5;

  c.circleProgress({
    startAngle: -Math.PI / 4 * 2,
    value: 0.7,
    size: 160,
    fill: {color: "#E74C3C"},
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
    }
      break;
    case "num session+":
      if (checkVal(sessionLength + 1)) {
        sessionLength += 1;
        $(".session").text(sessionLength);
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
    $(".cpicker").click(function() {
      var className = $(this).attr('class');
      switch(className){
      case 'total g cpicker':
        $("body").removeClass().addClass("g");
        c.circleProgress({
          fill: {color: "#2ECC71"},
          animation: false
        });
        break;
      case 'total o cpicker':
        $("body").removeClass().addClass("o");
        c.circleProgress({
          fill: {color: "#E67E22"},
          animation: false
        });
        break;
      case 'total b cpicker':
        $("body").removeClass().addClass("b");
        c.circleProgress({
          fill: {color: "#3498DB"},
          animation: false
        });
        break;
      case 'total r cpicker':
        $("body").removeClass().addClass("r");
        c.circleProgress({
          fill: {color: "#E74C3C"},
          animation: false
        });
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
