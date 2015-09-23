const React = require('react');
const PropTypes = React.PropTypes;
const FE_Layout = require('../layouts/frontend.jsx');
const BackButton = require('../layouts/partials/backbutton.jsx');
const fs = require('fs');
const path = require('path');

var FestivalPage = React.createClass({

  render: function() {
    var imgUrl = '/images/festivals/' + this.props.festival.alias + '.jpg';
    if(!fs.existsSync(path.resolve(__dirname, '../../assets' + imgUrl))){
      imgUrl = '/images/festivals/' + this.props.festival.alias + '.png';
    }
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={[]}>
        <BackButton></BackButton>
        <meta name="description" content={this.props.festival.description.slice(0, 150)}></meta>
        <main>
          <div className="card singlePage__card">
            <div className="card-image singlePage__img">
              <img src={imgUrl}></img>
            </div>
            <div className="card-content singlePage__content">
              <h5>{this.props.festival.name}</h5>
              <ul className="collection">
                <li className="collection-item">Ort: <b>{this.props.festival.city}</b></li>
                <li className="collection-item">Preis: <b>{this.props.festival.price}€</b></li>
              </ul>
              <p>
                {this.props.festival.description}
              </p>
            </div>
            <div className="card-action">
              <a href={this.props.festival.website} target="_blank">Website</a>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = FestivalPage;
