const React = require('react');
const FrontPage = require('./frontpage.jsx');
const $ = window.jQuery;

$(document).ready(function(){
    React.render(
      <FrontPage></FrontPage>,
      document.getElementById('frontpage')
    );
});
