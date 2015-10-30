import React from 'react';
import Reflux from 'reflux';

import PageStore from '../../../stores/PageStore.jsx';
import PageActions from '../../../actions/PageActions.jsx';

import PageItem from './_pageItem.jsx';

class PageManager extends React.Component {

  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
    this.state = {
      pages: []
    }
  }

  componentDidMount() {
    PageStore.listen(this.onStoreChange);
    PageActions.fetchPages();
  }

  compnentWillUnmount() {
    this.unsubscribe();
  }

  onStoreChange(pages){
    this.setState({
      pages : pages
    });
  }

  addPage(event) {
    event.preventDefault();
    console.log(this.input_value.value);
  }

  render() {
    return (
      <div>
        <h3>Seiten</h3>
        <form onSubmit={this.addPage.bind(this)}>
          <div className="row">
            <div className="input-field col s6">
              <input id="page_name" type="text" className="validate" ref={(ref) => this.input_value = ref}></input>
              <label htmlFor="page_name">Hinzufügen (FB-Seitenname, z.b. alternativ.feiern)</label>
            </div>
          </div>
        </form>
        <ul className="collection">
          {this.state.pages.map(function(page, index){
            return <PageItem page={page} key={index} />
          })}
        </ul>
      </div>
    )
  }
}

export default PageManager;
