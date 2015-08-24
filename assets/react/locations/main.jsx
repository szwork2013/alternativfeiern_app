const React = require('react');
const LocationOverview = require('./location_overview.jsx');
var $ = window.jQuery;

$(document).ready(function(){
  React.render(
    <LocationOverview></LocationOverview>,
    document.getElementById('locationOverview')
  );
});
