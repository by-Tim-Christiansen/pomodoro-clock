$(document).ready(function(){

  var c = $('#circle');
  var pickedColor = "#E67E22";
  c.circleProgress({
    startAngle: -Math.PI / 4 * 2,
    value: 0.7,
    lineCap: 'round',
    size: 160,
    fill: {color: "#E67E22"}
  });

  // animate timer-circle when page loads

  // change color theme
    $(".cpicker").click(function() {
      var className = $(this).attr('class');
      switch(className){
      case 'total g cpicker':
        $("body").removeClass().addClass("g");
        c.circleProgress({
          startAngle: -Math.PI / 4 * 2,
          value: 0.7,
          lineCap: 'round',
          size: 160,
          fill: {color: "#2ECC71"}
        });
        break;
      case 'total o cpicker':
        $("body").removeClass().addClass("o");
        c.circleProgress({
          startAngle: -Math.PI / 4 * 2,
          value: 0.7,
          lineCap: 'round',
          size: 160,
          fill: {color: "#E67E22"}
        });
        break;
      case 'total b cpicker':
        $("body").removeClass().addClass("b");
        c.circleProgress({
          startAngle: -Math.PI / 4 * 2,
          value: 0.7,
          lineCap: 'round',
          size: 160,
          fill: {color: "#3498DB"}
        });
        break;
      case 'total r cpicker':
        $("body").removeClass().addClass("r");
        c.circleProgress({
          startAngle: -Math.PI / 4 * 2,
          value: 0.7,
          lineCap: 'round',
          size: 160,
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
