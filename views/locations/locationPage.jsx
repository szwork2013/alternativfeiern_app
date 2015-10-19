const React = require('react');
const FE_Layout = require('../layouts/frontend.jsx');
const BackButton = require('../layouts/partials/backbutton.jsx');


var LocationPage = React.createClass({

  render: function() {
    var img = '/images/locations/' + this.props.location.img_orig;
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={[]} description={this.props.location.description.slice(0, 150)}>
        <main>
          <div className="card singlePage__card">
            <div className="card-image singlePage__img">
              <img src={img}></img>
            </div>
            <div className="card-content singlePage__content">
              <h5>{this.props.location.name}</h5>
              <ul className="collection">
                <li className="collection-item">Adresse: <b>{this.props.location.address}, {this.props.location.city}</b></li>
              </ul>
              <p>
                {this.props.location.description}
              </p>
            </div>
            <div className="card-action">
              <a href={this.props.location.website} target="_blank">Website</a>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = LocationPage;
