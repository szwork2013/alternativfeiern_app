const React = require('react');
const PropTypes = React.PropTypes;

const PageItem = React.createClass({

  render: function() {
    return (
      <div>
        <a href="#!" className="collection-item">
          {this.props.page.pageName}
            {/*<button className="btn-floating waves-effect waves-light red">X</button>*/}
        </a>
      </div>
    );
  }

});

module.exports = PageItem;
