const React = require('react');

const DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>{this.props.children}</body>
      </html>
    );
  }

});

module.exports = DefaultLayout;
