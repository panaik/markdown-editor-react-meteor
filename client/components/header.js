import React, { Component } from 'react';
import Accounts from './accounts';
import { Link, withRouter } from 'react-router-dom';

// for navigating to a new bin on clicking on 'Create Bin', we need to use Programmatic navigation
// and not use Link tag
// Because to Create bin we first need to generate a binId and on successful creation of binId,
// navigate to the Create bin page/component

class Header extends Component {
  onBinClick(event) {
    // preventDefault -> because we don't want the anchor tag to do its default behavior and navigate to another page
    // also setting anchor tag's href to '#' gives it a clickable button appearance in bootstrap
    event.preventDefault();

    // in the callback function bin is the return value from Meteor method which is the result of Bins.insert()
    // the result returned is actually the id of the mongo model/record
    Meteor.call('bins.insert', (error, binId) => {
      // console.log(binId);

      // now we will navigte to /bin/:bindId
      this.props.history.push(`/bins/${binId}`);
    });
  }

  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Markbin
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
        </ul>
        <ul className="nav navbar-nav">
          <li>
            <a href="#" onClick={this.onBinClick.bind(this)}>
              Create Bin
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Header);
