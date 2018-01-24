import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './bins_editor';
import BinsViewer from './bins_viewer';
import BinsShare from './bins_share';

class BinsMain extends Component {
  render() {
    // access to value of binId
    // console.log(this.props.match.params.binId);
    // console.log(this.props.bin);

    if (!this.props.bin) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <BinsEditor bin={this.props.bin} />
        <BinsViewer bin={this.props.bin} />
        <BinsShare bin={this.props.bin} />
      </div>
    );
  }
}

// props passed to createContainer's first arguement arrow function,
// are the same props that show up in BinsMain this.props
export default createContainer(props => {
  const { binId } = props.match.params;

  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  return { bin: Bins.findOne(binId) };
}, BinsMain);
