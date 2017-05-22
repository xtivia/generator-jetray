$(function() {

  $('[data-skin]').on('click', function(e) {
    e.preventDefault();
    var skin = $(this).data('skin');
    $('#style-skin').attr('href', 'assets/css/skin-'+ skin +'.css');
  });

  // Sidebar-boxed: Try it section
  $('#sb-left-side').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-right');
  });

  $('#sb-right-side').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-right');
  });

  $('#sb-skin-light').on('click', function() {
    $('.sidebar-boxed').removeClass('sidebar-dark');
  });

  $('#sb-skin-dark').on('click', function() {
    $('.sidebar-boxed').addClass('sidebar-dark');
  });
  
  $('.sidenav li').on('click', function(){
    $('.sidenav li').removeClass('active');
    $(this).addClass('active');
  });
  
  var current_page_URL = location.href;

  $( ".sidenav2 li a" ).each(function() {

      if ($(this).attr("href") !== "#") {

          var target_URL = $(this).prop("href");

          if (target_URL == current_page_URL) {
              $('.sidenav2 li a').parents('li, ul').removeClass('active');
              $(this).parent('li').addClass('active');
              return false;
          }
      }
  });


});