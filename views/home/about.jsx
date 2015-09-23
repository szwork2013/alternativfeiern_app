var React = require('react');
var PropTypes = React.PropTypes;
var FE_Layout = require('../layouts/frontend.jsx');

var AboutPage = React.createClass({

  render: function() {
    return (
      <FE_Layout title={this.props.title} scripts={[]} stylesheets={[]} withTopNav>
        <meta name="description" content="Informationen zur Seite und den Gestaltern von Alternativ-Feiern."></meta>
        <main>
            <div className="card singlePage__card">
              <div className="card-content singlePage__content" style={{minHeight : '413'}}>
                <h5>Wir.</h5>
                <p>
                  Unsere Webseite bietet euch ein Eventverzeichnis für alternative Partys, Konzerte und andere Veranstaltungen abseits
                  vom Kommerz im Raum Nürnberg und Umgebung. Falls ihr ein wichtiges Event vermisst, euer Kollektiv hier aufgeführt werden
                  soll oder ein Link defekt ist, schreibt uns einfach eine Mail.
                </p>
                <h5>Disclaimer.</h5>
                <p>
                  Manchmal schaffen es auch kommerzielle Events oder Events weit weg von Nürnberg in den Kalender, wir kriegen die große
                   Mengen an Veranstaltungen nicht immer perfekt gemanaged.
                </p>
              </div>
              <div className="card-action">
                <a href="mailto:info@alternativ-feiern.de" target="_blank">Kontakt</a>
                <a href="https://facebook.com/alternativ.feiern" target="_blank">Facebook-Page</a>
              </div>
            </div>
        </main>
      </FE_Layout>
    );
  }

});

module.exports = AboutPage;
