import React from 'react';
import { connect } from 'react-redux';
import { fetchPages } from '../actions/actions.js';

//import PageManager from './tabs/Pages/PageManager.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPages());
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs dashboard">
            <li className="tab col s3">
              <a href="#page__container">Seiten</a>
            </li>
            <li className="tab col s3">
              <a href="#event__container-bl">Events - Blacklist</a>
            </li>
            <li className="tab col s3">
              <a href="#event__container-wl">Events - Whitelist</a>
            </li>
            <li className="tab col s3">
              <a href="#location__container">Locations</a>
            </li>
            <li className="tab col s3">
              <a href="#festival__container">Festivals</a>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="col s12" id="page__container">
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="event__container-bl">
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="event__container-wl">
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="location__container">
          </div>
        </div>
        <div className="container">
          <div className="col s12" id="festival__container">
          </div>
        </div>
      </div>
    );
  }
};

function select (state) {
  console.log(state);
  const { isFetching, pages } = state;
  return {
    isFetching,
    pages
  };
}

export default connect(select)(Dashboard);
