var React = require('react');

var Preloader = React.createClass({

  render: function() {
    return (
      <div className="row" style={{textAlign : 'center'}}>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Preloader;
