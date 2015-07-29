const React = require('react');
const PageManager = require('./pageManager.jsx');
const EventManager = require('./eventManager.jsx');

React.render(
  <PageManager></PageManager>,
  document.getElementById('page__container')
);

React.render(
  <EventManager></EventManager>,
    document.getElementById('event__container')
);
