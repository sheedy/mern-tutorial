import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import BugRow from './BugRow';

const BugTable = function bugTable(props) {
  const bugRows = props.bugs.map(
    bug => <BugRow key={bug._id} bug={bug} />);

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
};

BugTable.propTypes = {
  bugs: React.PropTypes.array,
};

export default BugTable;
