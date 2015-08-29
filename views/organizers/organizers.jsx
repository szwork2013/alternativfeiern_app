var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');
var OrganizerItem = require('./organizerItem.jsx');

var Organizers = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={['/css/locations.css', '/css/organizers.css']} withTopNav>
        <main id="organizers__overview">
          <div className="container">
            <p className="cityDescription">
              Hier findest du ein paar der häufig vertretenen Veranstalter und Kollektive in Nürnberg. Sie sorgen immer wieder für alternative Events deren Besuch sich lohnen wird.
            </p>
            <div className="row">
              <div className="col s12 m6 l4">
                <OrganizerItem title="StudioEins" website="http://studio-eins.net/"/>
                <OrganizerItem title="Tanzpflicht" website="https://www.facebook.com/TANZPFLICHT"/>
                <OrganizerItem title="Panne e.V" website="http://www.panne-ev.de/"/>
                <OrganizerItem title="Armed with a Mind Shows" website="https://www.facebook.com/ArmedWithAMindShows"/>
                <OrganizerItem title="Klangraum Online" website="https://www.facebook.com/k.raum"/>
              </div>
              <div className="col s12 m6 l4">
                <OrganizerItem title="5. Schaltkreis" website="http://www.5terschaltkreis.de/"/>
                <OrganizerItem title="Rockberg e.V" website="http://rockberg-verein.de/"/>
                <OrganizerItem title="Doom Over Nbg" website="http://low-frequency-assaults.blogspot.de/"/>
                <OrganizerItem title="Homies &amp; Spasten" website="https://www.facebook.com/homiesundspasten"/>
                <OrganizerItem title="Radio-Z" website="http://www.radio-z.net/de/"/>
              </div>
              <div className="col s12 m6 l4">
                <OrganizerItem title="BPM e.V" website="https://www.facebook.com/Bpm.Technition"/>
                <OrganizerItem title="Monsters of Jungle" website="http://monstersofjungle.de/"/>
                <OrganizerItem title="Dubworxx" website="https://www.facebook.com/dubworxx"/>
                <OrganizerItem title="Eat-the-Beat" website="http://www.eat-the-beat-records.de/"/>
                <OrganizerItem title="Sound of Erlangen" website="http://soundoferlangen.com/"/>
              </div>
            </div>
          </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = Organizers;
