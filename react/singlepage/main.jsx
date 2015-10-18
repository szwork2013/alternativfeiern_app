import React from 'react';
import ReactDom from 'react-dom';
import HelloWorld from './components/helloworld';
var $ = window.jQuery;

$(document).ready(function(){
  ReactDom.render(<HelloWorld />, document.getElementById('singlepage'));
});
