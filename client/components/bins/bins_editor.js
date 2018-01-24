import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
// import and execute this particular file, and not assigning it to anything

class BinsEditor extends Component {
  onEditorChange(content) {
    // content - whatever is entered in the input
    // console.log(content);

    // 'bins.update' is looking for two argument, the corresponding bin and the new content
    Meteor.call('bins.update', this.props.bin, content);
  }

  render() {
    return (
      <div className="col-xs-8">
        <h5>Input</h5>
        <CodeMirror
          value={this.props.bin.content}
          onChange={this.onEditorChange.bind(this)}
          options={{ mode: 'markdown', lineNumbers: true }}
        />
      </div>
    );
  }
}

export default BinsEditor;
