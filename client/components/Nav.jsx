var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';
var FacebookLogin = require('react-facebook-login');

var apiInfo = require('../../config');
var FACEBOOK_APP_ID = apiInfo.facebook.app_ID

var Search = require('./Search.jsx');

var Nav = React.createClass({
  responseFacebook: function (response) {
    var username = response.name.replace(/\s+/g, '').toLowerCase();;
    console.log('UID: ', response.id, 'NAME: ', response.name, 'USERNAME: ', username);
    $.post('/api/users', { 
      uid: response.id, 
      name: response.name,
      username: username
    })
    .done(function (user) {
      
    })
    .fail(function (err) {
      console.log('There was an error!');
    });
  },

  logout: function () {
    FB.logout(function (response) {
      console.log("You\'ve been logged out!\n", response);
    });
  },

  render: function () {
    return (
      <nav>
        <div className="ui fixed inverted menu" style={{'height': '50px'}}>
          <Link to="/" activeClassName="active" onlyActiveOnIndex>Home</Link>
          <Link to="/user">User</Link>
          <Link to="/user/board">Board</Link>
          <Link to="/">Feed</Link>
          <div className="ui container">
            <a href="#" className="header item">
              <img className="logo" src="assets/images/logo.svg"></img>
            </a>
            <div className="item" style={{'width': '60%'}}>
              <Search
                searchMethod={this.props.searchPlace}
                locations={this.props.locations}
              />
            </div>
            <div id="userMenu" className="ui simple right dropdown item">
              Username<i className="dropdown icon"></i>
              <div className="menu">
                <a className="item" href="#"><i className="grid layout icon"></i>My Boards</a>
                <div className="divider"></div>
                <div className="item">
                  <i className="user icon"></i>
                    Account
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    <a className="item" href="#"><i className="wrench icon"></i>Settings</a>
                    <a className="item" href="#"><i className="phone icon"></i>Support</a>
                  </div>
                </div>
                <div className="divider"></div>
                <a className="item" onClick={this.logout}>Sign Out</a>
                <div className="divider"></div>
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    autoLoad={false}
                    callback={this.responseFacebook} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
