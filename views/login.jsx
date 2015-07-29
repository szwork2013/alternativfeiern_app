var React = require('react');
var DefaultLayout = require('./layouts/loggedOut');

var Login = React.createClass({

  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
          <div className="row">
            <div className="col s12 m5">
              <div className="card-panel hoverable whitetext teal lighten-5">
                <form action="/login" method="post">
                  <div className="form-group">
                      <label>Email</label>
                      <input type="text" class="form-control" name="email" />
                  </div>
                  <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" name="password" />
                  </div>

                  <button type="submit" className="waves-effect waves-light btn green">Login</button>
                </form>
              </div>
            </div>
          </div>
      </DefaultLayout>
    );
  }

});

module.exports = Login;
