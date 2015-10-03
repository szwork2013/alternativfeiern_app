const React = require('react');
const Newsletter = require('./newsletter.jsx');
const $ = window.jQuery;

$(document).ready(function(){
    React.render(
      <Newsletter></Newsletter>,
      document.getElementById('newsletterContainer')
    );

});
