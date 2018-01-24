import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Link } from 'react-router-dom';

class BinsList extends Component {
  onBinRemove(bin) {
    Meteor.call('bins.remove', bin);
  }

  renderList() {
    return this.props.bins.map(bin => {
      const url = `/bins/${bin._id}`;

      return (
        <li className="list-group-item" key={bin._id}>
          <Link to={url}>Bin {bin._id}</Link>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onBinRemove(bin)}
              // using fat arrow function to pass in the correct 'bin' on onClick for the particualr button
              // cannot use direct this.onBinRemove(bin), must use fat arrow
              // we only want the function to be called when the user clicks on the button
            >
              Remove
            </button>
          </span>
        </li>
      );
    });
  }

  render() {
    // console.log(this.props.bins);
    return <ul className="list-group">{this.renderList()}</ul>;
  }
}

export default createContainer(() => {
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  // bins shows up as this.props.bins
  // here we will get all bins that are provided by Bins publish/subscribe system
  return { bins: Bins.find({}).fetch() };
}, BinsList);
