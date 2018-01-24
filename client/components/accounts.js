import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// The goal behind React is that React is 100% incharge of the DOM
// and we should never manually dive into the DOM and fiddle with it
// By taking this process as mentioned in the comments for componentDidMount and componentWillUnmount
// we are circumventing this rule
// This general approach is how we work with third party library with React,
// that is we let React render its components as usual, then after its rendered to the DOM
// we are going to reach into the DOM and fiddle with it
// Then when the component is about to unmount, we go back in and clean up ourselves
// This general approach/idea can be used for any other popular libraries such as D3 or JQuery
class Accounts extends Component {
  componentDidMount() {
    // Render the Blaz accounts form then find the div
    // we just rendered in the 'render' method and place
    // the Blaze accounts form in that div

    // Blaze.render returns a reference to the element that was rendered
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }

  componentWillUnmount() {
    // Go finf the forms we created and destroy them
    // We need to clean up those forms ourselves
    // garbage collection
    Blaze.remove(this.view);
  }

  render() {
    return <div ref="container" />;
  }
}

export default Accounts;
