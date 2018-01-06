$(document).ready(function(){
  $('.options').click(function() {
    if ( $(this).closest(".container").hasClass("landing") ){
      $('.settingspage').removeClass('hide');
    } else {
      $('.settingspage').addClass('hide');
    }
  });

  var c = $('#circle');

  c.circleProgress({
    startAngle: -Math.PI / 4 * 2,
    value: 0,
    lineCap: 'round',
    size: 160,
    fill: {color: '#E74C3C'}
  });

  // Let's emulate dynamic value update
  setTimeout(function() { c.circleProgress('value', 0.7); }, 10);
});
