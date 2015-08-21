const React = require('react');
const PageManager = require('./pageManager.jsx');
const Blacklist = require('./blacklist.jsx');
const Whitelist = require('./whitelist.jsx');
const LocationManager = require('./locationManager.jsx');

React.render(
  <PageManager></PageManager>,
  document.getElementById('page__container')
);

React.render(
  <Blacklist></Blacklist>,
  document.getElementById('event__container-bl')
);

React.render(
  <Whitelist></Whitelist>,
  document.getElementById('event__container-wl')
);

React.render(
  <LocationManager></LocationManager>,
  document.getElementById('location__container')
);
