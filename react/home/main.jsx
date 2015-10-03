var React = require('react');
var FrontPage = require('./Frontpage.jsx');
var $ = window.jQuery;

$(document).ready(function(){
    React.render(
      <FrontPage></FrontPage>,
      document.getElementById('frontpage')
    );
});
