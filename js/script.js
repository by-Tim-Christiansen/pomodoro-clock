$(document).ready(function(){

  var c = $('#circle');
  c.circleProgress({
    startAngle: -Math.PI / 4 * 2,
    value: 0.7,
    size: 160,
    fill: {color: "#E74C3C"}
  });

  // animate timer-circle when page loads

  // change color theme
    $(".cpicker").click(function() {
      var className = $(this).attr('class');
      switch(className){
      case 'total g cpicker':
        $("body").removeClass().addClass("g");
        c.circleProgress({
          fill: {color: "#2ECC71"}
        });
        break;
      case 'total o cpicker':
        $("body").removeClass().addClass("o");
        c.circleProgress({
          fill: {color: "#E67E22"}
        });
        break;
      case 'total b cpicker':
        $("body").removeClass().addClass("b");
        c.circleProgress({
          fill: {color: "#3498DB"}
        });
        break;
      case 'total r cpicker':
        $("body").removeClass().addClass("r");
        c.circleProgress({
          fill: {color: "#E74C3C"}
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
