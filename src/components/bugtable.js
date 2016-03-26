import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';
import BugRow from './bugrow';

export default class BugTable extends React.Component {
  render() {

    var bugRows = this.props.bugs.map(function(bug) {
      return (<BugRow key={bug._id} bug={bug}/>);
    });

    return (
      <Table striped bordered condensed responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </Table>
    );
  }
}
