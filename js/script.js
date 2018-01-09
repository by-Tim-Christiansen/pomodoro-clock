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

  // adjust session and break length
  $(".num").click(function() {
    if ($(this).hasClass("session-adj") && $(this).html("-")) {
      sessionLength -= 1;
    }
    else if($(this).hasClass("session-adj") && $(this).html("+")) {
      sessionLength += 1;
    }
    else if($(this).hasClass("break-adj") && $(this).html("-")) {
      breakLength -= 1;
    }
    else if($(this).hasClass("break-adj") && $(this).html("+")) {
      breakLength += 1;
    }
    $(".session").text(sessionLength);
    $(".break").text(breakLength);
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
