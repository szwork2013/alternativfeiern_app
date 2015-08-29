const React = require('react');
const FestivalOverview = require('./festivals_overview.jsx');
var $ = window.jQuery;

$(document).ready(function(){
  React.render(
    <FestivalOverview></FestivalOverview>,
    document.getElementById('festivalOverview')
  );
});
