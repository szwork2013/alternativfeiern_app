const React = require('react');
const TodayEvents = require('./todayevents.jsx');
const FutureEvents = require('./futureevents.jsx');
const $ = window.jQuery;

$(document).ready(function(){
    React.render(
      <TodayEvents></TodayEvents>,
      document.getElementById('todayevents')
    );

    React.render(
      <FutureEvents></FutureEvents>,
      document.getElementById('futureevents')
    );
});
