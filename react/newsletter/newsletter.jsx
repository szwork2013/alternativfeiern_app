var React = require('react');
var PropTypes = React.PropTypes;
var $ = window.jQuery;

var Newsletter = React.createClass({

  getInitialState: function() {
    return {
      alreadySubscribed : false,
      subscribed : false,
    };
  },

  subscribe : function(event){
    event.preventDefault();
    var self = this;
    var name = React.findDOMNode(this.refs.name);
    var email = React.findDOMNode(this.refs.email);
    var btn = React.findDOMNode(this.refs.submitBtn);
    if(name.value.length > 1 && email.value.length > 2) {
      $.ajax({
        method : 'POST',
        url : '/newsletter/subscribe',
        data : {
          name : name.value,
          email : email.value
        },
        success : function(response) {
          if(response.code == 214) {
            $(btn).addClass('red accent-4');
            btn.innerHTML = 'Meh.';
            self.setState({
              alreadySubscribed : true
            });
          }
          if(response.subscribed){
            $(btn).addClass('disabled');
            btn.innerHTML = 'Danke.'
            self.setState({
              subscribed : true
            });
          }
        }
      });
    }
  },


  render: function() {
    return (
            <div className="card singlePage__card">
              <div className="card-content singlePage__content" style={{minHeight : '413'}}>
                <h5 style={{marginBottom : 40}}>Wöchentliche Event-Empfehlung</h5>
                <div className="row">
                  <div className="col s12">
                    <p>
                      Hier kannst du dich für unseren <b>Newsletter</b> eintragen.<br /><br />
                      Was hast du davon?
                      <ul className="collection">
                        <li className="collection-item">Aktuelle Events</li>
                        <li className="collection-item">Infos zu vergangen Events</li>
                        <li className="collection-item">Updates was sich auf der Seite tut</li>
                      </ul>
                      Selbstverständlich schreiben wir unseren Newsletter selbst. Du bekommst keine automatisch generierte E-Mail.<br /><br />
                    </p>
                  </div>
                </div>

                  <div className="row form__row">
                    <div className="col s12" style={{backgroundColor : '#272F38', marginTop : 12, borderRadius : 2}}>
                      <form>
                        <div className="row">
                          <div className="input-field col s12">
                            <input type="email" id="email" ref="email" className="validate" style={{color : '#fff'}}></input>
                            <label htmlFor="email">E-Mail</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <input type="text" id="name" ref="name" className="validate" style={{color : '#fff'}}></input>
                            <label htmlFor="name">Vorname</label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                <div className="row" style={{textAlign : 'center'}}>
                  <div className="s12">
                    <i>Wir gehen verwantwortlich mit deinen Daten um und geben diese nicht an Dritte weiter.</i>
                  </div>
                </div>
            </div>
            <div className="card-action">
              <div className="row" style={{textAlign : 'center'}}>
                <button className="btn" style={{display : 'inline-block', backgroundColor : '#55c954'}} onClick={this.subscribe} ref="submitBtn">Abonnieren</button>
                {this.state.subscribed ? <p>In Kürze erhälst du eine Bestätigungs-Mail.</p> : null}
                {this.state.alreadySubscribed ? <p>Du erhälst unseren Newsletter schon. Check doch mal deinen Spam-Ordner.</p> : null}
              </div>
            </div>
          </div>
    );
  }

});

module.exports = Newsletter;
