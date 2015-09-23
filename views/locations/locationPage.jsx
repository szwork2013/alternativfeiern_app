const React = require('react');
const PropTypes = React.PropTypes;
const FE_Layout = require('../layouts/frontend.jsx');
const BackButton = require('../layouts/partials/backbutton.jsx');
const fs = require('fs');
const path = require('path');

var LocationPage = React.createClass({

  render: function() {
    var imgUrl = '/images/locations/' + this.props.location.alias + '.jpg';
    if(!fs.existsSync(path.resolve(__dirname, '../../assets' + imgUrl))){
      imgUrl = '/images/locations/' + this.props.location.alias + '.png';
    }
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={[]}>
        <BackButton></BackButton>
        <meta name="description" content={this.props.location.description.slice(150)}></meta>
        <main>
          <div className="card singlePage__card">
            <div className="card-image singlePage__img">
              <img src={imgUrl}></img>
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
