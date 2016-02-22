var React = require('react');
var ReactRouter = require('react-router');

var BoardCard = React.createClass({
	getInitialState: function(){
		//The boardType will determine if the card is a board-card, a user-card, or a feed-card.
		//Background image will come form the api if it is a board-card,
		//or be set as the first location if it is a user-card.
		return {
			boardType: null,
			backgroundImage: null
		}
	},

	searchById: function(venueId) {
		//ajax get request by venue id

		$.get('https://api.foursquare.com/v2/venues/+'+venueId+'?client_id='+FOURSQUARE_CLIENT_ID+'&client_secret='+FOURSQUARE_CLIENT_SECRET)
      .done(function(data) {
        console.log("WORKS!");
        callback(data);
      }).fail(function(err) {
        console.log('there was an error');
        callback(err);
      });

	},

	handleClick: function(){
	},

	render: function(){
		return (
			<div>
				<div className="userCardInfo">
					<h4> {this.userTitle} </h4>
					<p>{this.props.description}</p>
				</div>

				<div className="fourSquareData">
					<h3> {this.venueTitle} </h3>
					<h4> {this.catagory} </h4>
					<h4> {this.address} </h4>
				</div>

				<button onClick={this.handleClick}>Remove Card</button>

			</div>
		)
	}
});

module.exports = BoardCard;
