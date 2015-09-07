var React = require('react');
var PropTypes = React.PropTypes;
var FestivalItem = require('./festivalItem.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var FestivalOverview = React.createClass({
  getInitialState: function() {
    return {
      col1 : [],
      col2 : [],
      col3 : []
    };
  },

  componentWillMount: function() {
    var self = this;
    $.ajax({
      method : 'GET',
      url : '/api/festivals',
      success : function(festivals) {
        var col1 = [];
        var col2 = [];
        var col3 = [];
        for(var i = 0; i < festivals.length; i++) {
          if(i%3 == 0){
            col1.push(festivals[i]);
          }
          if(i%3 == 1){
            col2.push(festivals[i]);
          }
          if(i%3 == 2){
            col3.push(festivals[i]);
          }
        }
        self.setState({
          col1 : col1,
          col2 : col2,
          col3 : col3
        });
      }
    })
  },

  render: function() {
    return (
      <div className="container">
      <p className="cityDescription">
        Hier findest du ein paar lokale, kleinere und alternative Festivals aus dem Großraum Nürnberg. Natürlich werden die Festivals auch in unseren Eventkalender eingetragen.
      </p>
      <ReactCSSTransitionGroup transitionName="easeIn" transitionAppear={true}>
        <div className="row">
          <div className="col s12 m6 l4">
            {this.state.col1.map(function(festival, index){
              return <FestivalItem festival={festival} key={index}></FestivalItem>
            })}
          </div>
          <div className="col s12 m6 l4">
            {this.state.col2.map(function(festival, index){
              return <FestivalItem festival={festival} key={index}></FestivalItem>
            })}
          </div>
          <div className="col s12 m6 l4">
            {this.state.col3.map(function(festival, index){
              return <FestivalItem festival={festival} key={index}></FestivalItem>
            })}
          </div>
        </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

module.exports = FestivalOverview;
