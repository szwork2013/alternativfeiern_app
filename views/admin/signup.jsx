var React = require('react');
var DefaultLayout = require('../layouts/loggedOut')

var Signup = React.createClass({

  render: function() {
    return (
      <DefaultLayout>
        <form action="/signup" method="post">
          <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" name="email" />
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" name="password" />
          </div>

          <button type="submit" class="btn btn-warning btn-lg">Signup</button>
        </form>
      </DefaultLayout>
    );
  }

});

module.exports = Signup;
