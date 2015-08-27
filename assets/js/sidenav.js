//initialize slide-out side nav
$(document).ready(function(){
  console.log('ready');
  $('.sideNavBtn').sideNav();
  $('ul.tabs').tabs();
  $('.backButton').on('click', function(){
    history.go(-1);
  });
});
